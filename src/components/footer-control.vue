<template>
  <div class="footer">
    <!-- 上一首 暂停开始 下一首 -->
    <div class="control">
      <span class="iconfont icon-xiangzuoshouqi"></span>
      <span class="iconfont" :class="iconButton" @click="togglePlay"></span>
      <span class="iconfont icon-xiangyouzhankai"></span>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <span class="time">{{currentTime}}</span>
      <el-slider v-model="percent" :debounce="300" :show-tooltip="false" @change="percentGo"></el-slider>
      <span class="time">{{allTime}}</span>
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
        <span class="iconfont icon-suiji1"></span>
      </div>

      <div class="tool">
        <span class="iconfont icon-yinleliebiao-"></span>
      </div>

    </div>

  </div>
</template>

<script>

  import eventBus from "../globalBus/eventBus.js"

  import {getDetailMusic} from "../netWork/footerControl/requests"

  import {formatTime} from "../tools/tools"

  export default {
    name: "footerControl",
    data() {
      return {
        musicUrl: "",
        currentTime: "00:00",
        allTime: "00:00",
        // 百分比
        percent: 0,
        // 定时器
        inter: null,
        // 音乐的状态 是正在播放还是在暂停
        isStart: false,
        startIcon: "icon-zanting_huaban",
        stopIcon: "icon-101fangxiang_xiangyou",
        iconButton: "icon-101fangxiang_xiangyou"
      }
    },
    created() {
      eventBus.$on("changeMusic", musicInfo => {
        // 发送网络请求， 获取这首歌
        getDetailMusic(musicInfo.mId)
          .then(data => this.handleMusicUrl(data))
          .catch(error => {
            this.$message.error("获取具体歌曲请求失败， 请打开控制台查看报错信息")
          })
      })
    },
    methods: {
      togglePlay() {

        if (this.isStart) {
          this.$refs.player.pause()
          this.isStart = false
        } else {
          this.$refs.player.play()
            .then(_ => {
              this.controller()
              this.$message.success("开始播放音乐~")
            })
            .catch(_ => {
              this.$message.error("获取歌曲失败！！请重新尝试点击获取")
            })
        }
      },

      handleMusicUrl(data) {
        /**
         * 首页自动选择热搜第一的歌曲 && 通过别处点击的来的播放的音乐
         */
        this.musicUrl = data.data[0].url
        this.$nextTick(() => {
          this.$refs.player.play()
            .then(_ => {
              this.controller()
            })
            .catch(_ => {
              this.$message.error("获取歌曲失败！！请重新尝试点击获取")
            })
        })
      },

      controller() {
        this.isStart = true
        this.allTime = formatTime(this.$refs.player.duration)
        this.inter = setInterval(() => {
          this.currentTime = formatTime(this.$refs.player.currentTime)
          this.percent = Math.ceil((this.$refs.player.currentTime / this.$refs.player.duration) * 100)
          if (this.percent === 100) clearInterval(this.inter)
        }, 1000)
      },

      percentGo(to) {
        /**
         * 滑动滑块  移动至指定的音乐时间
         */
        if (this.$refs.player.readyState === 4) {
          this.$refs.player.currentTime = Math.ceil(this.$refs.player.duration * to * 0.01)
        }
      }
    },
    watch: {
      percent(newValue, _) {
        this.iconButton = newValue === 100 ? this.stopIcon : this.startIcon
      },
      isStart(newValue, _) {
        this.iconButton = newValue ? this.startIcon : this.stopIcon
      }
    }
  }
</script>

<style lang="less" scoped>

  .footer {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 240px auto 200px 180px;


    .control {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      place-items: center;

      span {
        display: inline-block;
        background-color: #b3330d;
        border-radius: 50%;
        line-height: 45px;
        font-weight: 800;
        color: #ffffff;
        font-size: 21px;
        padding: 0 0 0 13px;
        width: 34px;
        height: 45px;
        cursor: pointer;
      }

    }

    .progress-bar {
      font-weight: 200;
      place-self: center;
      display: grid;
      grid-template-columns: 100px 1fr 100px;

      .time {
        justify-self: center;
        align-self: center;
      }

      .el-slider {
        width: 700px;

      }
    }

    .aduio {
      position: absolute;
      top: -500px;
      height: 0;
      width: 0;
      opacity: 0;
      visibility: hidden;
    }

    .volume {

      place-self: center;
      display: grid;
      grid-template-columns: 50px 1fr;

      span {
        justify-self: center;
        align-self: center;
        /*margin-right: 16px;*/
        font-size: 22px;
      }

      .el-slider {
        width: 150px;
      }

    }

    .tools {
      place-self: center end;
      cursor: pointer;

      .tool {
        display: inline-block;
        margin: 0 2em;

        span {
          font-size: 22px;
        }
      }

    }

    /* 修改进度条的默认样式 */

    /deep/ .el-slider {

      .el-slider__runway {
        .el-slider__bar {
          background-color: #b3330d;
        }

        .el-slider__button-wrapper {

          .el-slider__button {
            border: 2px solid #b3330d;
            width: 12px;
            height: 12px;
          }

        }

      }


    }
  }

</style>
