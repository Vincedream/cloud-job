// var preachMes = require('../../../data/preachMes.js');
const AV = require('../../../libs/av-weapp-min.js');

// pages/about/about-cag/about-cag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabStyle:'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cagArray = [];
    var cagArrayjob = [];
    AV.User.loginWithWeapp().then(user => {
      var cagList = user.attributes.cagArray;
      
      cagList.map(function(currentValue){
        var query = new AV.Query('preach');
        query.get(currentValue).then(function (preach) {
          cagArray.push(preach);
          that.setData({
            preachMes: cagArray
          })
        }, function (error) {
          // 异常处理
        });
      });
      
    }).catch(console.error);

    AV.User.loginWithWeapp().then(user => {
      var cagListjob = user.attributes.cgaArrayjob;   
    cagListjob.map(function (currentValue) {
      var query = new AV.Query('jobHot');
      query.get(currentValue).then(function (job) {
        cagArrayjob.push(job);
        that.setData({
          jobMes: cagArrayjob
        })
        console.log(cagArrayjob);
      }, function (error) {
        // 异常处理
      });
    })
    }).catch(console.error)

  },


  tapPreach: function (e) {
    var preachId = e.currentTarget.dataset.preachid;
    console.log(preachId);
    wx.navigateTo({
      url: '../../preach/preach-detail/preach-detail?id=' + preachId
    })
  },
  tapJob: function(e) {
    var jobId = e.currentTarget.dataset.jobid;
    console.log(jobId);
    wx.navigateTo({
      url: '../../index/job-detail/job-detail?id=' + jobId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  console.log('----s123123')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  choseTabA: function () {
    this.setData({
      tabStyle: 'a'
    })
  },
  choseTabB: function () {
    this.setData({
      tabStyle: 'b'
    })
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