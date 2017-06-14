# weIconBuilder
微信小程序字体图标样式生成器

## 生成字体图标资源

进入[http://fontello.com/](http://fontello.com/)网站，选择你喜欢的图标，然后下载（zip文件）

## 安装本工具
``` bash
$ sudo npm i weicon -g
```

## 生成wxss样式文件

安装好本工具后，直接命令行执行即可：
``` bash
$ weicon fontello-xxxxx/
```
会自动在当前目录生成`weIcon.wxss`文件
或者，自定义生成的文件名：
``` bash
$ weicon fontello-xxxxx/ myicon.wxss
```

## 导入wxss文件
直接复制`wxss`文件到微信小程序目录，然后在`app.wxss`中引用：
``` wxss
/**  app.wxss **/
@import "libs/weicon.wxss";
```

## 使用图标
在`wxml`文件中，使用`text`或者`view`组件，设置`class`即可使用图标：
``` wxml
// page.wxml

<view class="weIcon weIcon-search" />
<text class="weIcon weIcon-home" />
```
