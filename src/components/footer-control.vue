<template>
  <div class="footer">
    <!-- 上一首 暂停开始 下一首 -->
    <div class="control">
      <span class="iconfont icon-xiangzuoshouqi"></span>
      <span class="iconfont" :class="getIcon" @click="togglePlay"></span>
      <span class="iconfont icon-xiangyouzhankai"></span>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <span class="time">{{currentTime}}</span>
      <el-progress :percentage="percent"
                   :show-text="false"
                   color="#b3330d"
                   :stroke-width="10">
      </el-progress>
      <span class="time">{{allTime}}</span>
    </div>

    <!-- 音量 -->
    <div class="volume">
      <span class="iconfont icon-shengyin"></span>
      <el-progress :percentage="20"
                   :show-text="false"
                   color="#b3330d"
                   :stroke-width="10">
      </el-progress>
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
        stopIcon: "icon-101fangxiang_xiangyou"
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
        this.$nextTick(() => {

          if (this.isStart) {
            this.$refs.player.pause()
            this.isStart = false
          } else {
            this.$refs.player.play()
              .then(_ => {
                // 更改音乐的状态
                this.isStart = true
                this.allTime = formatTime(this.$refs.player.duration)

                let that = this
                this.inter = setInterval(() => {
                  that.currentTime = formatTime(that.$refs.player.currentTime)
                  that.percent = Math.ceil((that.$refs.player.currentTime / that.$refs.player.duration) * 100)
                  if (this.$refs.player.currentTime >= this.$refs.player.duration) {
                    clearInterval(this.inter)
                  }
                }, 1000)
              })
              .catch(error => {
                this.$message.error("获取歌曲失败！！请重新尝试点击获取")
              })
          }

        })

      },
      handleMusicUrl(data) {
        // 获取到 音频文件
        this.musicUrl = data.data[0].url

        this.$nextTick(() => {
          this.$refs.player.play().then(_ => {
            this.isStart = true
            this.allTime = formatTime(this.$refs.player.duration)

            let that = this
            this.inter = setInterval(() => {
              that.currentTime = formatTime(that.$refs.player.currentTime)
              that.percent = Math.ceil((that.$refs.player.currentTime / that.$refs.player.duration) * 100)
              if (this.$refs.player.currentTime >= this.$refs.player.duration) {
                clearInterval(this.inter)
              }
            }, 1000)

          }).catch(error => {
            this.$message.error("获取歌曲失败！！请重新尝试点击获取")
          })
        })

      },
    },
    computed: {
      getIcon() {
        return this.isStart ? this.startIcon : this.stopIcon
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

      .time {
        margin: 0 16px;
      }

      .el-progress {
        display: inline-block;
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

      span {
        margin-right: 16px;
        font-size: 22px;
      }

      .el-progress {
        display: inline-block;
        width: 150px;
        transform: translateY(-4px);
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

  }

</style>
