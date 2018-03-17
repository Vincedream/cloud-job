const AV = require('../../../libs/av-weapp-min.js');

// pages/index/tips/tips.js
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
    var sort = '01'
    var query = new AV.Query('tipsMes');
    query.equalTo('tipSort', sort);
    query.find().then(function (results) {
      that.setData({
        tipsMes: results
      })
    }, function (error) {
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tapMes: function (e) {
    var tipId = e.currentTarget.dataset.tipid;
    wx.navigateTo({
      url: '../mes-page/mes-page?id=' + tipId
    })
    console.log(tipId);
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