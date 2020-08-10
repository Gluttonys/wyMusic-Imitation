<template>
  <div class="music">

    <div class="top">
      <div class="music__img">
        <MusicImage :pic="pic" :mid="mid"></MusicImage>
      </div>

      <div class="music__info">
        <info
                :singer="singer"
                :album="album"
                :mid="mid"
                :name="name">
        </info>
      </div>
      <div class="bc" :style="{backgroundImage:`url(${pic})`}"></div>
    </div>

    <div class="bottom">
      <div class="music__commend">
        <commend :mid="mid"></commend>
      </div>

      <div class="music__recommend">
        <recommend :mid="mid"></recommend>
      </div>
    </div>


  </div>
</template>

<script>

  import MusicImage from "./Image/MusicImage"
  import Info from "./Info/Info"
  import Commend from "./Commend/Commend"
  import Recommend from "./Recommend/Recommend"

  import {getInfoMusic} from "@/netWork/footerControl/requests"
  import {inError} from "@/tools/tools"

  export default {
    props: {},
    components: {
      MusicImage, Info, Commend, Recommend
    },
    data() {
      return {
        mid: this.$attrs["music_id"],
        songData: {},
        pic: "",
        name: "",
        album: "",
        singer: []
      }
    },
    created() {
      getInfoMusic(this.mid)
        .then(data => {
          console.log(data)
          this.songData = data["songs"][0]
          this.pic = this.songData["al"]["picUrl"]
          this.name = this.songData["name"]
          this.album = this.songData["al"]["name"]
          this.singer = this.songData["ar"]
        })
        .catch(error => inError.call(this, "播放歌曲信息", error))
    }
  }
</script>

<style lang="scss" scoped>
  @import "music";
</style>
