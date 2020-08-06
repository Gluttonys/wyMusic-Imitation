<template>
  <div class="Info">
    <div class="song__name">
      <h2>{{name}}</h2>
    </div>
    <div class="song__info">
      <div class="song__info__album">专辑 ：{{album}}</div>
      <div class="song__info__singer">
        歌手 ：
        <span v-for="sing of singer" :key="sing.id">{{sing.name}}</span>
      </div>
    </div>

    <div class="song__lyric">
      <p v-for="item in lyricList" :key="item.time" @click="handlerDump(item.time)">{{item.content}}</p>
    </div>
  </div>
</template>

<script>
import { getLyric } from "../../../netWork/musicDetail/request";
import { informDumpToPoint } from "../../../globalBus/events";
import { inError, backToStamp } from "../../../tools/tools";

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
      albumName: "",
      lyric: "",
      lyricList: [],
    };
  },
  mounted() {
    getLyric(this.mid)
      .then((data) => {
        // 有的音乐没有歌词， 这里给出一个判断
        if (!data["nolyric"]) {
          this.lyric = data["lrc"]["lyric"];
          this.lyric.replace(/(\[.+\])(.*)\n/g, (_, $time, $content) => {
            this.lyricList.push({
              time: $time,
              content: $content,
            });
          });
        }
      })
      .catch((error) => {
        inError.call(this, "歌词", error);
      });
  },
  methods: {
    handlerDump(timeStr) {
      // 传入一个格式化的时间， 通知底部音乐条， 跳转到该时间位置
      informDumpToPoint(backToStamp(timeStr));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Info";
</style>
