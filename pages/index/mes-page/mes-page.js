var wemark = require('../../../wemark/wemark');
var md = '# hello, world\n\nI love you, wemark!';
const AV = require('../../../libs/av-weapp-min.js');

// pages/index/mes-page/mes-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wemark: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var MesId = options.id;
    var query = new AV.Query('tipsMes');
    query.get(MesId).then(function (result) {
      that.setData({
        mesMes: result
      })
      var mesMd = result.attributes.tipMd;
      wemark.parse(mesMd, that, {
        // 新版小程序可自适应宽高
        // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
        name: 'wemark'
      })
    }, function (error) {
      // 异常处理
    });



    console.log(options.id);
    // wemark.parse(md, this, {
    //   // 新版小程序可自适应宽高
    //   // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
    //   name: 'wemark'
    // })
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