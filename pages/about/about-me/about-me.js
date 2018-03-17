const AV = require('../../../libs/av-weapp-min.js');

// pages/about/about-me/about-me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    AV.User.loginWithWeapp().then(user => {
      const userDetail = AV.User.current();
      let userMssage = userDetail.toJSON();
      console.log(userMssage);
      that.setData({
        userAllMssage: userMssage
      })
    }).catch(console.error);
    
  },
  formBindSubmit: function(e){
    var that = this;
    const userDetail = AV.User.current();
    let userMssage = userDetail.toJSON();
    console.log(userMssage.objectId);
    var userLean = AV.Object.createWithoutData('_User', userMssage.objectId);
    userLean.set('trueName', e.detail.value.trueName);
    userLean.set('userEmail', e.detail.value.userEmail);
    userLean.set('userTel', e.detail.value.userTel);
    userLean.set('userUniversity', e.detail.value.userUniversity);
    userLean.set('userMajor', e.detail.value.userMajor);
    userLean.set('userJobPlace', e.detail.value.userJobPlace);
    userLean.save().then(function(gg){
      // console.log(gg.attributes);
      // that.setData({
      //   userAllMssage: gg.attributes
      // })
      console.log('修改成功');
      wx.navigateBack({
        delta: 2
      })

    },function(error){
      console.log(error);
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */ 
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('test');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   userAllMssage: ''
    // })
    // console.log('test');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
   
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})