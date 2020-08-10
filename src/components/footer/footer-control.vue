<template>
  <div class="footer">
    <!-- 上一首 暂停开始 下一首 -->
    <div class="control">
      <span class="iconfont icon-xiangzuoshouqi" @click="handlePrevious"></span>
      <span class="iconfont" :class="iconButton" @click="togglePlay"></span>
      <span class="iconfont icon-xiangyouzhankai" @click="handleNext"></span>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <span class="time">{{ currentTime }}</span>
      <el-slider v-model="percent" :debounce="300" :show-tooltip="false" @change="percentGo"></el-slider>
      <span class="time">{{ allTime }}</span>
    </div>

    <!-- 音量 -->
    <div class="volume">
      <span class="iconfont icon-shengyin"></span>
      <el-slider v-model="percent" :debounce="300" :show-tooltip="false"></el-slider>
    </div>

    <!-- 隐藏音乐 Audio -->
    <audio controls ref="player" :src="musicUrl" class="aduio"></audio>

    <!-- 工具项 -->
    <div class="tools">
      <div class="tool">
        <span class="iconfont" :class="currentOrderIcon" @click="handlePlayOrder"></span>
      </div>

      <div class="tool">
        <span class="iconfont icon-yinleliebiao-"></span>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/globalBus/eventBus.js';
import {
  informRotate,
  informMusicSecond,
  informGetMusic
} from '@/globalBus/events';
import {getDetailMusic, getInfoMusic} from '@/netWork/footerControl/requests';
import {formatTime, inError} from '@/tools/tools';
import {playOrder} from '@/localData'
import {mapState} from 'vuex'

export default {
  name: 'footerControl',
  data() {
    return {
      mid: 0,
      musicUrl: '',
      currentTime: '00:00',
      allTime: '00:00',
      // 百分比
      percent: 0,
      // 定时器
      inter: null,
      // 音乐的状态 是正在播放还是在暂停
      isStart: false,
      startIcon: 'icon-zanting_huaban',
      stopIcon: 'icon-101fangxiang_xiangyou',
      iconButton: 'icon-101fangxiang_xiangyou',

      // 歌曲中每个歌词的时间列表
      lyricTimeList: [],
      // 播放顺序选项
      playOrder,
      currentOrderIcon: 'icon-ziyuanldpi'
    };
  },
  mounted() {
    eventBus.$on('changeMusic', (id) => {
      this.mid = id
      /** 保存歌曲 id */
      // 发送网络请求， 获取这首歌
      getDetailMusic(id)
          .then(data => this.handleMusicUrl(data))
          .catch(error => inError.call(this, '具体歌曲', error));
    })

    eventBus.$on('dumpToPoint', second => this.$refs.player.currentTime = second)  // 点击歌词，跳转

    eventBus.$on('loadStampTimeFromMusicInfo', timeArray => this.lyricTimeList = timeArray)
  },
  methods: {
    togglePlay() {
      /**
       * 单机播放暂停键，实现播放与暂停
       * */
      if (this.checkPlayerState()) {
        if (this.isStart) {
          /* 暂停音乐 */
          this.$refs.player.pause();
          this.isStart = false;
        } else {
          // 开始音乐
          this.$refs.player
              .play()
              .then((_) => {
                this.controller();
                this.$message.success('开始播放音乐~');
              })
              .catch((error) => {
                inError.call(this, '歌曲', error);
              });
        }
      }
    },

    handlePrevious() {
      /**
       * 单机上一首按钮
       * 播放检测
       * */
      let currentIndex = this.getIndexInPlayList(this.mid)
      if (currentIndex === 0) {
        // currentIndex === 0
        this.$message.info('已经是第一首了， 不能再往上了！！！')
      }
      if (this.checkMusicCanBePlay(currentIndex - 1)) {
        /** 通过检测， 播放歌曲 */
        informGetMusic(this.musicIdList[currentIndex - 1])
      }
    },

    handleNext() {
      /**
       * 单机下一首按钮
       * 播放检测
       * */
      console.log(this.mid)
      let currentIndex = this.getIndexInPlayList(this.mid)

      if (currentIndex === this.musicIdList.length - 1) {
        /** 如果是最后一首歌， 应从头重新播放 */
        if (this.checkMusicCanBePlay(this.musicIdList[0])) {
          informGetMusic(this.musicIdList[0])
        }
      } else {
        /** 如果不是最后一首歌， 正常播放下一首 */
        getInfoMusic(this.mid)
        .then(data => {
          if (data['privileges'][0]['pl']) {
            informGetMusic(this.musicIdList[currentIndex + 1])
          } else {
            this.mid = this.musicIdList[currentIndex + 1]
            this.handleNext()
          }
        })
      }
    },

    checkMusicCanBePlay(mid) {
      /**
       * 检查歌曲是否能够播放，（是否免费播放， 而非付费）
       * */
      let tag = true
      getInfoMusic(mid).then(data => {
        tag = !!data['privileges'][0]['pl']
      })

    },

    handleMusicUrl(data) {
      /**
       * 获取 音乐的 URL
       * */
      this.musicUrl = data.data[0].url;
      /** 这里没有考虑无法播放的歌曲 （无版权歌曲， 付费歌曲等情况） */
      this.$nextTick(() => {
        this.$refs.player
            .play()
            .then(_ => this.controller())
            .catch(error => inError.call(this, '歌曲', error));
      });
    },

    controller() {
      /**
       * 控制时间条的移动
       * */
      if (this.checkPlayerState()) {
        this.isStart = true;
        this.allTime = formatTime(this.$refs.player.duration);
        this.inter = setInterval(() => {
          // 格式化时间
          this.currentTime = formatTime(this.$refs.player.currentTime);
          // 计算百分比
          this.percent = Math.ceil(
              (this.$refs.player.currentTime / this.$refs.player.duration) * 100
          );
          // 发送消息给播放音乐页面，通知歌词高亮。 路径判断，如果不是歌曲页面， 就不发送了
          if (/\/music\/\d+/.test(this.$route.fullPath)) {
            if (
                this.lyricTimeList.includes(parseInt(this.$refs.player.currentTime))
            ) {
              informMusicSecond(parseInt(this.$refs.player.currentTime));
            }
          }
        }, 1000);
      }
    },

    percentGo(to) {
      /**
       * 滑动滑块  移动至指定的音乐时间
       */
      if (this.checkPlayerState()) {
        this.$refs.player.currentTime = Math.ceil(
            this.$refs.player.duration * to * 0.01
        );
      }
    },

    handlePlayOrder() {
      /**
       * 单机更改歌曲的播放顺序
       * */
      let index = 1
      this.playOrder.forEach(orderObj => {
        if (orderObj['icon'] === this.currentOrderIcon) {
          index = orderObj['index'] + 1 > 3 ? 1 : orderObj['index'] + 1
        }
      })
      this.playOrder.forEach(orderObj => {
        if (orderObj['index'] === index) this.currentOrderIcon = orderObj['icon']
      })
    },

    getIndexInPlayList(mId) {
      /**
       * 获取当前歌曲在播放列表中的索引
       * */
      return this.musicIdList.findIndex(id => id === mId)
    },

    checkPlayerState() {
      return (this.$refs.player.readyState === 4 && this.$refs.player.src)
    }

  },
  beforeDestroy() {
    //  清除音乐滑块定时器
  },
  watch: {
    percent(newValue, _) {

      if (newValue === 100) {
        // 清除定时器
        clearInterval(this.inter)
        // 更改按钮
        this.iconButton = this.stopIcon

        // 根据歌曲的播放模式判断下一首歌曲该如何播放
        let index = this.getIndexInPlayList(this.mid)
        this.$refs.player.removeAttribute('loop')
        switch (this.currentOrderIcon) {
          case 'icon-ziyuanldpi':
            // 循环播放
            if (index === this.musicIdList.length) {
              informGetMusic(this.musicIdList[0])
            } else {
              informGetMusic(this.musicIdList[index + 1])
            }
            this.handleNext()
            break
          case 'icon-danquxunhuan':
            // 单曲循环
            this.$refs.player.setAttribute('loop', 'loop')
            this.percent = 0
            this.controller()
            break
          default:
            // 随机播放
            let id = this.musicIdList.random()
            informGetMusic(id)
        }
      } else {
        this.iconButton = this.startIcon
      }

    },
    isStart(newValue, _) {
      this.iconButton = newValue ? this.startIcon : this.stopIcon;
      informRotate(newValue);
    },
  },
  computed: {
    ...mapState(['musicIdList'])
  }
};
</script>

<style lang="scss" scoped>
@import "footer";
</style>
