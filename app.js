 const AV = require('./libs/av-weapp-min.js');
AV.init({
  appId: '3uUhkgKJjk3DIRkSRPmM0B0M-gzGzoHsz',
  appKey: 'rHpaGk49qAtUt7nlXXXXXXX',
});
//app.js
App({

  onLaunch: function () {
    var that = this;
    AV.User.loginWithWeapp().then(user => {
      if (getCurrentPages().length != 0) {  
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
      }
      const userDetail = AV.User.current();
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({ userInfo }) => {
          console.log('----' + userInfo.avatarUrl);
          // 更新当前用户的信息
          userDetail.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            that.globalData.user = user.toJSON();
            console.log(user.toJSON());
          }).catch(console.error);
        }
      });
    }).catch(console.error);
   
  },
  globalData: {
    a:1
  },
})
