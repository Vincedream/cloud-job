const AV = require('../../libs/av-weapp-min.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    hotJobList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = new AV.Query('jobHot');
    var that = this;
    var sort = 'j000000';
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


    var queryImage = new AV.Query('tipsMes');
    queryImage.equalTo('tipSort', '02');
    queryImage.find().then(function (swiperImage) {
      console.log('----');
        var imageList = swiperImage;
      that.setData({
        imgUrls: imageList
      })
    }).then(function (todos) {
      // 更新成功
    }, function (error) {
      // 异常处理
    });
  },


  tapJob: function (e) {
    var jobId = e.currentTarget.dataset.jobid;
    wx.navigateTo({
      url: 'job-detail/job-detail?id=' + jobId
    })
  },

  tofullTime: function(){
    wx.navigateTo({
      url: 'full-time/full-time'
    })
  },
  topartTime: function () {
    wx.navigateTo({
      url: 'part-time/part-time'
    })
  },
  toCompany: function () {
    wx.navigateTo({
      url: 'company/company'
    })
  },
  toTips: function () {
    wx.navigateTo({
      url: 'tips/tips'
    })
  },
  toNews: function () {
    wx.navigateTo({
      url: 'news/news'
    })
  },
  tapImage: function(e){
    var imageId = e.currentTarget.dataset.objectid;
    console.log(imageId);
    wx.navigateTo({
      url: 'mes-page/mes-page?id=' + imageId
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