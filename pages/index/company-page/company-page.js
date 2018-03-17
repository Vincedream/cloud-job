var wemark = require('../../../wemark/wemark');
var md = '# hello, world\n\nI love you, wemark!';
const AV = require('../../../libs/av-weapp-min.js');
// pages/index/company-page/company-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 'a',
    wemark: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var companyName = options.id;
    console.log(companyName);
    var that = this;
    var query = new AV.Query('companyList');
    query.equalTo('incName', companyName);
    
    query.find().then(function (results) {
      that.setData({
        companyMes: results[0]
      })
      var mdMes = results[0].attributes.companyMd;
      console.log(mdMes);
      wemark.parse(mdMes, that, {
        // 新版小程序可自适应宽高
        // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
        name: 'wemark'
      })
    }, function (error) {
    });

    
    var query1 = new AV.Query('jobHot');
    query1.equalTo('incName', companyName);
    query1.find().then(function (jobHot) {
      console.log("jobHot------------------");
      console.log(jobHot);
      that.setData({
        hotJobList: jobHot
      })
    }).then(function (todos) {
      // 更新成功
    }, function (error) {
      // 异常处理
    });
    
    
    
   
  },
  changeA: function(){
    this.setData({
      check: 'a'
    })
  },
  changeB: function () {
    this.setData({
      check: 'b'
    })
  },
  tapJob: function (e) {
    var jobId = e.currentTarget.dataset.jobid;
    wx.redirectTo({
      url: '../job-detail/job-detail?id=' + jobId
    })
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