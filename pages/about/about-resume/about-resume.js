const AV = require('../../../libs/av-weapp-min.js');

// pages/about/about-resume/about-resume.js
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
        userAllMssage: userMssage,
        ImageUrl: userMssage.resumeImage
      })
    }).catch(console.error);
  },
  uploadImage: function(){
    var that = this;
    console.log('111');
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            that.setData({
              ImageUrl: file.url()
            })
            console.log(file.url())
          }
          ).catch(console.error);
      }
    });
  },
  savaImage:function(){
    var that = this;
    const userDetail = AV.User.current();
    let userMssage = userDetail.toJSON();
    console.log(userMssage.objectId);
    var userLean = AV.Object.createWithoutData('_User', userMssage.objectId);
    userLean.set('resumeImage', this.data.ImageUrl);
    userLean.save().then(function (gg) {
      console.log('简历上传成功');
      wx.navigateBack({
        delta: 2
      })

    }, function (error) {
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