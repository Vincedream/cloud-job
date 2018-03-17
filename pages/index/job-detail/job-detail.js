var wemark = require('../../../wemark/wemark');
const AV = require('../../../libs/av-weapp-min.js');
// pages/index/job-detail/job-detail.js
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    wemark: {},
    caged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;

  
  AV.User.loginWithWeapp().then(user => {
    that.setData({
      user: user
    })

    var cagList = user.attributes.cgaArrayjob;
    if (cagList.indexOf(options.id) == -1) {
      console.log('不存在')
    } else {
      console.log('存在');
      that.setData({
        caged: true
      })
    }


  }).catch(console.error);


  console.log(options.id);
  var jobObjectId = options.id;
  var query = new AV.Query('jobHot');
  query.get(jobObjectId).then(function (job) {
    that.setData({
      jobMes: job
    })
    var jobMd = job.attributes.jobMd;
      wemark.parse(jobMd, that, {
      // 新版小程序可自适应宽高
      // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
      name: 'wemark'
    })
  }, function (error) {
    // 异常处理
  });
  },

  cagTap: function(){
    console.log('cagcagcag');
    this.setData({
      caged: !this.data.caged
    })
    var that = this;
    if (this.data.caged) {
      var cagList = this.data.user.attributes.cgaArrayjob;
      cagList.push(this.data.jobMes.id);
      console.log(cagList);
      var userLean = AV.Object.createWithoutData('_User', this.data.user.id);
      userLean.set('cgaArrayjob', cagList);
      userLean.save().then(function (gg) {
        
        console.log('收藏成功');
      }, function (error) {
        console.log(error);
      });
    } else {

      var cagList = this.data.user.attributes.cgaArrayjob;
      for (var i = 0; i < cagList.length; i++) {
        if (cagList[i] == this.data.jobMes.id) {
          cagList.splice(i, 1);
          var userLean = AV.Object.createWithoutData('_User', this.data.user.id);
          userLean.set('cgaArrayjob', cagList);
          userLean.save().then(function (gg) {
            console.log('取消收藏成功');
          }, function (error) {
            console.log(error);
          });
          break;
        }
      }
    }

  },

  cagSubmit: function(){
    console.log('submitsubmitsubmit');
    wx.showModal({
      title: '提示',
      content: '程序员正在加班加点完善此功能，很快就会和大家见面！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  toCompany: function(e){
    var comName = e.currentTarget.dataset.incname;
    wx.redirectTo({
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