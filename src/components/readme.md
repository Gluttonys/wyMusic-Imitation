## 这里面存放了较大得组件以及一些公用得小组件

- 较大组件
    - navigation-bar : 导航栏
    - sidebar : 侧边栏
    - footer-control : 底部， 就是哪个音乐控制条
    - song-block : 音乐块， 左下角得哪个， 页脚上面得哪个
    
- 公用组件
    - classifyModule : 模块容器， 用来包裹一个一个得`block`
        - title(String) : 标题
        - more(String) ；填入的是一个路由地址。 是否有更多按钮， 侧边那里
        - noMore(Boolean) : 是否显示更多按钮， 就上面哪个 
        - grid(Number) : 内容 分栏， 填入一个数字  表示下面的内容分几栏
        - gap(Number) : 分栏的间距
        - 匿名插槽一个 : 填入模块分类的内容
    - block : 一个一个得小块， 主要用在首页得各个板块上
    - strip : 条形组件， 用于展示歌曲列表得组件
        - bgColor(String) : 接收一个自定义的背景颜色
        - 匿名插槽一个 ： 用于添加音乐strip
    - type-tag ； 分类的标签， 上面是一个icon, 下面是一个标题文字
