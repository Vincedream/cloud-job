const AV = require('../../../libs/av-weapp-min.js');

// pages/index/all-job-list/all-job-list.js
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
    var point = options.id;
    var BigPoint = point.charAt(0);
    console.log(BigPoint)
    if (BigPoint == "j" ){
      var query = new AV.Query('jobHot');
      var that = this;
      var sort = point;
      console.log(typeof (sort));
      query.equalTo('jobSortNum', sort);
      query.find().then(function (jobHot) {
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
    }else{
      var query = new AV.Query('jobHot');
      var that = this;
      var sort = point;
      console.log(typeof (sort));
      query.equalTo('incName', point);
      query.find().then(function (jobHot) {
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
    }
      
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