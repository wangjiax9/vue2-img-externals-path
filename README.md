# vue2-img-externals-path
在多层级多入口，多层级多出口前提下  
测试图片路径和引入外部js的路由冲突问题

入口：src/app/sfgame/sfgame.js  
出口：dist/app/sfgame/sfgame.js

图片：src/app/sfgame/images/player.png

sfgame/style/style.scss中引用图片

```
background: url('../images/player.png') no-repeat;
```
sfgame/sfgame.js中引用图片
```
let manifest = [
    {src: require('./images/player.png'), id: 'p'}
]
```
在新down的vue-cli中，dev环境，打开Sources面板可以看到，已经生成了一个带版本的图片  
![image](https://gameapp.fp.ps.netease.com/file/5a912d7920e3db3c91fbe711eRpdLElB)  
可是在我的chook架构中，是无法生成这个st/img下的带版本的图片

在sfgame.html中引入外部插件
```
<script src="../static/createjs/easeljs.min.js" type="text/javascript"></script>
<script src="/static/preloadjs.min.js" type="text/javascript"></script>
```
在dev环境下，会出现外部js无法正常加载，

在chook/config/index.js中修改assetsSubDirectory，去掉斜杠' / '
```
dev: {

    // Paths
    assetsSubDirectory: 'static',
```
即可在src下的js或者css中使用相对路径引用图片
这是在我一一对比了两个架构的配置文件后发现的，太不起眼，却又至关重要