<template>
  <div class="Info">
    <div class="song__name">
      <h2>{{ name }}</h2>
    </div>
    <div class="song__info">
      <div class="song__info__album">专辑 ：{{ album }}</div>
      <div class="song__info__singer">
        歌手 ：
        <span v-for="sing of singer" :key="sing.id">{{ sing.name }}</span>
      </div>
    </div>

    <!--  :class="{light: isLyricLight(item.stampTime, `lyric${index}`)}"-->
    <!--  :ref="`lyric${index}`" ： 用于固定歌词位置， 找到指定 dom  -->
    <div class="song__lyric" ref="song-lyric">
      <p
          v-for="(item, index) in lyricList"
          :key="item.time"
          :class="{light: item.stampTime === currentTime}"
          :ref="`lyric${index}`"
          @click="handlerDump(item.time)"
      >{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
import {getLyric} from '@/netWork/musicDetail/request';
import {
  informDumpToPoint,
  loadStampTimeFromMusicInfo,
} from '@/globalBus/events';
import {inError, backToStamp} from '@/tools/tools';
import eventBus from '@/globalBus/eventBus';

export default {
  props: {
    mid: {
      type: [Number, String],
      require: true,
    },
    name: String,
    album: String,
    singer: Array,
  },
  data() {
    return {
      musicData: {},
      albumName: '',
      lyric: '',
      lyricList: [],
      currentTime: 0,
    };
  },
  mounted() {
    /* 获取歌曲播放的时刻 */
    eventBus.$on('lyricChangeSecond', time => this.currentTime = time);

    getLyric(this.mid)
        .then(data => {
          // 有的音乐没有歌词， 这里给出一个判断
          if (!data['nolyric'] && !data['uncollected']) {
            /** 歌曲没有歌词， 歌曲没有被录入过歌词（未收集过的） */
            this.lyric = data['lrc']['lyric'];
            this.lyric.replace(/(\[.+\])(.*)\n/g, (_, $time, $content) => {
              this.lyricList.push({
                time: $time                    /* 未经过格式化时间 [01:23.345] */,
                stampTime: backToStamp($time)  /* 经过格式化的时间 86 指该段歌词出现在 86 s */,
                content: $content              /* 歌词内容 */,
              });
            });

            let timeArray = [];                /* [1, 3, 4, 6, 8, 12, 15, 18] : 每段歌词播放的时间 */
            this.lyricList.forEach(({stampTime}) => timeArray.push(stampTime));
            loadStampTimeFromMusicInfo(timeArray);
          }
        })
        .catch(error => inError.call(this, '歌词', error));
  },
  methods: {
    handlerDump(timeStr) {
      // 传入一个格式化的时间， 通知底部音乐条， 跳转到该时间位置
      informDumpToPoint(backToStamp(timeStr));
    },
    // isLyricLight(lyricTime, domRef) {
    //   // let offsetTop = this.$refs[domRef][0]["offsetTop"];
    //
    //   if (lyricTime === this.currentTime) {
    //     /**
    //      歌词滚动效果，没做出来
    //      */
    //     // this.$refs["song-lyric"].scrollTo({
    //     //   top: 100,
    //     //   behavior: "smooth",
    //     // });
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "Info";
</style>
