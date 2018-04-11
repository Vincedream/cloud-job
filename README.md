### 前言

云校招小程序是我在2017年10月份任职校招社团的技术负责人时，与社团小伙伴和指导老师共同参与设计分析，立志于开发出一款聚合校内所有招聘信息的微信小程序，实现招聘内容All In，用户能够在线投递简历，查看校内所有招聘信息和宣讲会内容的一款微信小程序。

but。。。

很可惜，最终学院方还是告诉了我，没有办法注册公司，项目无法上线，所以这个我用了二十多天开发的小程序最终还是胎死腹中，anyway，虽然没能上线，也没有向小伙伴们开放使用，但是自己还是学到了很多东西，从产品的功能设计、UI的设计、到数据库的设计、再到小程序整体框架的设计与开发，这个过程的风景已经让我足够满意了，也算是学前端一来，第一个像样点的作品，在这里给大家做一下分享和总结，征求到了老师的同意，已经将项目源码发布在[github](https://github.com/Vincedream/cloud-job)上，如果你的项目恰巧是leanCloud为后端的话，那么就更适合你啦～

### 需求分析

**主要功能：**
1. 展示出企业的招聘(全职、实习)信息
2. 实现在线投递简历
3. 展示出所有招聘宣讲会的时间地点
4. 收藏自己感兴趣的宣讲会和招聘信息

**附加功能：**
1. 面试宝典页，浏览面试技巧及经验
2. 招聘类新闻，查看最新的人力资讯
3. 查看入驻校园的招聘公司

### 选用技术栈

**UI设计：** UI设计参考拉钩、boss直聘的设计，也加入了自己的一些设计风格，自己设计宣讲会的点击日历查看信息的交互逻辑。

**前端：** 原生微信小程序API接口开发，没用用到框架，因为当时框架出来较新，自己的经验也不足，所以使用原生开发，尽管如此，项目功能都开发完成。

**后端：** 因为当时后端经验还不足，所以用了LeanCloud推出的一整套小程序接口服务，详尽阅读完官方文档后，能够满足基本的后端接口API需求。

### Show me the gif

满足大家的欲望，我将所有的页面都录制了gif图，因考虑到加载时间的原因，可能不是那么清晰，如果想要完整看到，那么就要clone源码到自己电脑上编译啦～

**由于github加载gif缓慢，请移步到我的博客页面查看加载更快速的gif** : [基于LeanCloud为后端的 “云校招” 微信小程序开发总结](http://vince.xin/article/5acc3acd6b78214ab8ac58da)

- 主界面：

![image](http://static.vince.xin/JISCFJIOWRF.gif)

- 宣讲会：

![image](http://static.vince.xin/YFUYUIO.gif)

- 个人中心页：

![image](http://static.vince.xin/IUYGHIUWFIO.gif)

### 开发难点

#### LeanCloud的接入

当时对一个开发完整项目并没有很多的经验的我，对于前后端联调也没有足够的深入，所以初次使用LeanCloud的服务还是比较懵逼的，苦读了几天文档后，先是接入微信小程序，做了一个curd的demo，然后觉得可行，才接入正式开发环境中。

具体开发步骤分为以下几个步骤：
1. 创建LeanCloud应用

这个就相当于创建一个后台服务，leanCloud会帮助你自动搭建一切环境，包括接口环境和数据库环境，省去了开发后端的步骤，这对于想要实现小程序完整功能，但是又没有后端开发经验的新手来说，是个非常棒的选择。

2. 配置域名白名单

小程序规定是要使用https来做接口请求的，并且在启用接口之前，需要对你在LeanCloud上的域名做白名单配置，这样小程序就知道这些域名下面的接口是安全的。

3. 接入LeanCloud

这一步是非常关键的一步，我们需要在LeanCloud上下载LeanCloud的lib包，然后在将第一步创建的应用接入小程序，进入这个应用获取的Id和Key，接入到你的小程序当中，一般是在根目录下的app.js中接入：


```
const AV = require('./libs/av-weapp-min.js');
AV.init({
  appId: '3uUhkgKJjk3DIRkSRPmM0B0M-gXXXXXX',
  appKey: 'rHpaGk49qAtUt7nlRxcwi3CiXXXXXX',
});
```


4. 实现前后端联调存储

这一步才是最难把控的，首先你需要自己设计所有的数据库表，然后在对leanCloud的存储文档做详尽的学习，这样才能保证你在小程序上能够灵活地获取数据和保存数据，我从代码中截取一段来看：


```
query.get(jobObjectId).then(function (job) {
    that.setData({
      jobMes: job
    })
    var jobMd = job.attributes.jobMd;
      wemark.parse(jobMd, that, {
      name: 'wemark'
    })
  }, function (error) {
    // 异常处理
  });
```

这里就是根据jobObjectId来获取存储在LeanCloud上的数据，然后通then来获取到请求回来的数据。

5. 用户信息接入

因为这个项目是需要用户和小程序进行数据上的交互的，比如投递简历和收藏功能，所以肯定要有一个user表，用来存储用户的信息，LeanCloud给我们一个很方便的解决方案，一键登陆：

```
const user = AV.User.current();
// 调用小程序 API，得到用户信息
wx.getUserInfo({
  success: ({userInfo}) => {
    // 更新当前用户的信息
    user.set(userInfo).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息
      this.globalData.user = user.toJSON();
    }).catch(console.error);
  }
});
```

以上是整个大概的流程，说实话，需要非常认真的阅读LeanCloud的文档，才能不出bug地使用他们的服务。

#### MarkDown的接入

我们在上面的第一个gif图看到，在招聘详情页里面的介绍是用markdown做的，当然，我不可能自己来完整地来做一整套内容样式的开发，所以Markdown是我最佳的选择，但是小程序原生并没有接入markdown的功能，在github溜了一圈后，找到个很合适的插件，于是这个问题也算是解决了，在这里分享给大家：[wemark](https://github.com/TooBug/wemark)，使用超级简单便捷～


```
<view class='detailBox'>
  <scroll-view scroll-y class='scroll'>
    <block wx:if="{{tabStyle =='a'}}">
      <template is="wemark" data="{{...wemark}}"></template>
    </block>
  </scroll-view>
</view>
```


#### 宣讲会日历设计以及交互

这个是让我头疼了好几天的设计，也许你看到的上面那个日历看上去很简单，但是我用了好几天才把它整体样式和交互逻辑给完善，需要自动定到当天的日期，之后的日期要显示“已过去”，并且需要根据不同的学校不同的日期来发送请求获取到正确的宣讲会内容，还有一个难点就是每年每月对应的周次都不一样，这点我没有想出更好的办法，原生小程序也没有对应的日历组件，所以一切从0自己造轮子，用了一个json来渲染对应的日历，这也是个耗时间的步骤，但是最终还是比较满意地还原了设计图和完成了交互需求。

### 总结

这次开发经历真是回忆满满，一个人摸爬滚打，从需求设计到编码，不知道遇到多少坑，多少个夜晚自己开着热点听着室友呼噜声写下一行行代码，最后就算没有机会上线，但是人生总不会是完美的，留下的遗憾激励着自己不断地进步。

Diligence is the mother of success. ：）
