<template>
    <div class="song-list">
        <!-- 歌单信息 -->
        <div class="song__list__info--wrapper">
            <song-list-info :id="$attrs.song_list_id"></song-list-info>
        </div>

        <!-- 歌单内容， 例如 具体的音乐列表，评论， 收藏者 -->
        <div class="song__list__detail--wrapper">
            <song-list-detail></song-list-detail>
        </div>
    </div>
</template>

<script>

    import songListDetail from '../songListDetail/songListDetail'
    import songListInfo from '../songListInfo/songListInfo'

    export default {
        props: {
        },
        components: {
            songListInfo,
            songListDetail
        }
    };
</script>

<style lang="scss" scoped>
    @import "songList";
</style>
