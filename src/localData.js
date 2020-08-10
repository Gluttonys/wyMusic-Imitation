export let authorFilter = {
  languagesTypes: [
    {name: '全部', to: '#', payload: '-1'},
    {name: '华语', to: '#', payload: '7'},
    {name: '日本', to: '#', payload: '8'},
    {name: '欧美', to: '#', payload: '96'},
    {name: '韩国', to: '#', payload: '16'},
    {name: '其他', to: '#', payload: '0'},
  ],
  genderTypes: [
    {name: '全部', to: '#', payload: '-1'},
    {name: '男歌手', to: '#', payload: '1'},
    {name: '女歌手', to: '#', payload: '2'},
    {name: '乐队组合', to: '#', payload: '3'},
  ],
  letterTypes: [
    {name: '热门', to: '#', payload: '-1'},
    {name: 'A', to: '#', payload: 'A'},
    {name: 'B', to: '#', payload: 'B'},
    {name: 'C', to: '#', payload: 'C'},
    {name: 'D', to: '#', payload: 'D'},
    {name: 'E', to: '#', payload: 'E'},
    {name: 'F', to: '#', payload: 'F'},
    {name: 'G', to: '#', payload: 'G'},
    {name: 'H', to: '#', payload: 'H'},
    {name: 'I', to: '#', payload: 'I'},
    {name: 'J', to: '#', payload: 'J'},
    {name: 'K', to: '#', payload: 'K'},
    {name: 'L', to: '#', payload: 'L'},
    {name: 'M', to: '#', payload: 'M'},
    {name: 'N', to: '#', payload: 'N'},
    {name: 'O', to: '#', payload: 'O'},
    {name: 'P', to: '#', payload: 'P'},
    {name: 'Q', to: '#', payload: 'Q'},
    {name: 'R', to: '#', payload: 'R'},
    {name: 'S', to: '#', payload: 'S'},
    {name: 'T', to: '#', payload: 'T'},
    {name: 'U', to: '#', payload: 'U'},
    {name: 'V', to: '#', payload: 'V'},
    {name: 'W', to: '#', payload: 'W'},
    {name: 'X', to: '#', payload: 'X'},
    {name: 'Y', to: '#', payload: 'Y'},
    {name: 'Z', to: '#', payload: 'Z'},
    {name: '#', to: '#', payload: '#'},
  ]
}

export let searchType = {
  /**
   *     1: 单曲
   *     10: 专辑
   *     100: 歌手
   *     1000: 歌单
   *     1002: 用户
   *     1004: MV
   *     1006: 歌词
   *     1009: 电台
   *     1014: 视频
   *     1018:综合 （默认）
   */
  song: 1,
  playList: 1000,
  video: 1014,
  sim_query: 1009,
  mlog: 1004,
  talk: 1006,
  artist: 100,
  album: 10,
  user: 1002,
  all: 1018
}

export let playOrder = [
  {index: 1, icon: 'icon-ziyuanldpi'}, /** 循环播放 */
  {index: 2, icon: 'icon-danquxunhuan'},  /** 单曲循环 */
  {index: 3, icon: 'icon-suiji1'},  /** 随机播放 */
]