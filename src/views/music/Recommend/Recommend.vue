<template>
  <div class="Recommend">
    <classify-module title="包含这首歌的歌单" no-more :gap="0">
      <strip v-for="playlist in playlists" :key="playlist.id">
        <div class="inner">
          <div class="inner--left">
            <el-image :src="playlist['coverImgUrl']"></el-image>
          </div>
          <div class="inner--right">
            <router-link :to="`/songList/${playlist['id']}`" tag="p">
              {{ playlist['name'] }}
            </router-link>
            <p>播放 ： {{ formatBigNumber(playlist['playCount']) }}</p>
          </div>
        </div>
      </strip>
    </classify-module>

    <classify-module title="相似歌曲" no-more :gap="0">
      <strip v-for="music in miniMusics" :key="music['id']">
        <div class="inner">
          <div class="inner--left">
            <el-image :src="music['album']['blurPicUrl']"></el-image>
          </div>
          <div class="inner--right">
            <p @click="informGetMusic(music.id)">{{ music['name'] }}</p>
            <p>{{ music['artists'][0]['name'] }}</p>
          </div>
        </div>
      </strip>
    </classify-module>
  </div>
</template>

<script>

import classifyModule from '@/components/public/classifyModule'
import strip from '@/components/public/strip'

import {getPlayListByMusic, getMusicByMusic} from '@/netWork/musicDetail/request'
import {informGetMusic} from '@/globalBus/events'
import {inError, formatBigNumber} from '@/tools/tools'

export default {
  props: {
    mid: [Number, String],
  },
  data() {
    return {
      playlists: [], /** 推荐歌单 */
      miniMusics: []  /** 相似歌曲 */
    }
  },
  mounted() {
    /** 获取相似歌单数据 */
    getPlayListByMusic(this.mid)
        .then(data => this.playlists = data['playlists'])
        .catch(error => inError.call(this, '推荐歌单', error))

    /** 获取相似歌曲数据 */
    getMusicByMusic(this.mid)
        .then(data => this.miniMusics = data['songs'])
        .catch(error => inError.call(this, '相似歌曲', error))
  },
  methods: {
    formatBigNumber,
    informGetMusic
  },
  components: {
    classifyModule, strip
  }
};
</script>

<style lang="scss" scoped>
@import "Recommend";
</style>