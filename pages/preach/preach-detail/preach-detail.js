 // pages/preach/preach-detail/preach-detail.js
var wemark = require('../../../wemark/wemark');
const AV = require('../../../libs/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabStyle: 'a',
    wemark: {},
    preachMes: '',
    preach_detail:'',
    caged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var appInsrance = getApp().globalData.user;
    // console.log(getApp());
    
    var that = this;
    AV.User.loginWithWeapp().then(user => {


      var cagList = user.attributes.cagArray;
      console.log(cagList);
      console.log(options.id);
      if (cagList.indexOf(options.id) == -1){
        console.log('不存在')
      }else{
        console.log('存在');
        that.setData({
          caged: true
        })
      }


      that.setData({
        user: user
      })
      console.log(user);
    }).catch(console.error);


   
    var preachId = options.id;
    console.log(preachId);
    var that = this;
    var query = new AV.Query('preach');
    query.get(preachId).then(function (preach) {
      that.setData({
        preach_detail: preach
      });   
      wemark.parse(preach.attributes.md, that, {
        name: 'wemark'
      });
      that.searchUni();
    }, function (error) {
      console.log(error);
    });    
  },
  searchUni: function(){
    var that = this;
    var query = new AV.Query('preach');
    query.equalTo('uniName',this.data.preach_detail.attributes.uniName );
    query.find().then(function (preach) {
      that.setData({
        preachMes: preach
      }); 
    }, function (error) {
      console.log(error);
    });
  },
  tapPreach: function (e) {
    console.log(this.data.caged);
    this.setData({
      caged: !this.data.caged
    })
    var preachId = e.currentTarget.dataset.preachid;
    console.log(preachId);
    wx.redirectTo({
      url: 'preach-detail?id=' + preachId
    })
  },
  


  savetoCag:function(){
    this.setData({
      caged: !this.data.caged
    })


    if(this.data.caged){
      var cagList = this.data.user.attributes.cagArray;
      cagList.push(this.data.preach_detail.id);
      var userLean = AV.Object.createWithoutData('_User', this.data.user.id);
      userLean.set('cagArray', cagList);
      userLean.save().then(function (gg) {
        console.log('修改成功');
      }, function (error) {
        console.log(error);
      });
    }else{
      var cagList = this.data.user.attributes.cagArray;
      for (var i = 0; i < cagList.length; i++) {
        if (cagList[i] == this.data.preach_detail.id) {
          cagList.splice(i, 1);

          var userLean = AV.Object.createWithoutData('_User', this.data.user.id);
          userLean.set('cagArray', cagList);
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready完成")    
    
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
  sharePage: function(){
    wx.showModal({
      title: '提示',
      content: '点击右上角转发给好友！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('fenxiang')
  }
})