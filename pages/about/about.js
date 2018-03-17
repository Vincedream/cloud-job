const AV = require('../../libs/av-weapp-min.js');
 
// pages/about/about.js
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

   

    console.log('---');
     var appInsrance = getApp();
    console.log(getApp().globalData.user);
    this.setData({
      avatar: appInsrance.globalData.user.avatarUrl,
      name: appInsrance.globalData.user.nickName,
      objectId: appInsrance.globalData.user.objectId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },
  
  toMe:function(){
    wx.navigateTo({
      url: 'about-me/about-me'
    })
  },
  toResume: function () {
    wx.navigateTo({
      url: 'about-resume/about-resume'
    })
  },
  toCag: function () {
    wx.navigateTo({
      url: 'about-cag/about-cag'
    })
  },
  toQue: function () {
    wx.navigateTo({
      url: 'about-ques/about-ques'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('---');
  
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