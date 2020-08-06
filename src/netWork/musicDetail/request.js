import {
    request
} from '../request';

function getLyric(id) {
    /* 通过歌曲的 id 获取歌曲信息 */
    return request({
        url: "/lyric",
        params: {
            id: id
        }
    });
}


export {
    getLyric
}

