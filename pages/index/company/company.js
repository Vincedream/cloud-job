const AV = require('../../../libs/av-weapp-min.js');
// pages/index/company/company.js
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
    var sort = '000000'
    var query = new AV.Query('companyList');
    query.equalTo('incCode', sort);
    query.find().then(function (results) {
      that.setData({
        companyMes: results
      })
    }, function (error) {
    });


    


  },
  tapAllJob:function(e){
    var comName = e.currentTarget.dataset.comname;
    wx.navigateTo({
      url: '../company-page/company-page?id=' + comName
    })
    console.log(comName)
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