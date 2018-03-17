var timePoint = require('../../data/time.js');

const AV = require('../../libs/av-weapp-min.js');
// pages/preach/preach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uniArray: ['今日热门','江西财经大学', '南昌大学', '江西师范大学','江西农业大学','江西理工大学','南昌航空大学','华东交通大学','东华理工大学','江西师范科技大学','南昌工程学院'],
    indexUni: '00',
    uniTitlePoint: 0,
    messageList: '',
    pointAt:' ',
    pickYear: '',
    pickMonth: '',
    DayToday:'',
    preachMes: '',
    time_point: ''
    
    
  },
  Click: function(e){
    // console.log(e.currentTarget.dataset);
    this.setData({
      pointAt: e.currentTarget.dataset.dayid
    });
    this.showMess();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取今日时间
    var DayNow = new Date();
    var DayNowYear = DayNow.getFullYear();
    var DayNowMonth = DayNow.getMonth() + 1;
    var DayNowDay = DayNow.getDate();
    //如果日为单数，修改为带“0”双数，统一规则
    var ss = (''+DayNowDay).length;
    var ssday;
    if(ss==1){
      ssday = '0' + DayNowDay;
    }else{
      ssday = DayNowDay;
    }
    //如果月为单数，修改为带“0”双数，统一规则
    var dd =(''+ DayNowMonth).length;
    var oday;
    if(dd==1){
      oday = '0' + DayNowMonth;
    }else{
      oday = DayNowMonth;
    }

    //设置当天的年月，以获得渲染的数据
    var setTimePoint = timePoint.calendarPoint;
    var testfu =  ''+ DayNowYear + oday;
    testfu = testfu.substring(2,6);
    testfu = 't' + testfu
    var setNowTimePoint = setTimePoint[testfu];

    //设置当天的日期
    var DayTodayT = '' + DayNowYear + '' + oday + '' + ssday;
    var DayTodayTT = DayTodayT.substring(2, 8);
    var DayToday = parseInt(DayTodayTT);
    
    //设置pick时间初始化显示位置，例如今天是10月份，则点击pick后定位到10月份
    var tanchuPick = parseInt(DayNowYear) + '-' + oday;
    
    //获取初始化年月bar与设置今日时间
    this.setData({
      time_point: setNowTimePoint,
      pickYear: parseInt(DayNowYear),
      pickMonth: oday,
      DayToday: DayToday,
      pointAt: DayToday,
      pickdefault: tanchuPick
    })
    this.showMess();
  
    
  },
  
  loadPrachList: function(){
    var that = this;
    var ppd = parseInt(that.data.messageList);
    var query = new AV.Query('preach');
    query.equalTo('messageList', ppd);
    query.find().then(function (preach) {
      var preachMes = JSON.stringify(preach);
      var preachgg = JSON.parse(preachMes);
      that.setData({
        preachMes: preach
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

  //切换宣讲会年月，渲染日历
  bindDateChange: function (e) {
    var yuandata = e.detail.value;
    console.log(yuandata);
    var nowwData = yuandata.replace("-", "");
    var nowData = nowwData.substring(2,6);
    var pickYear = nowwData.substring(0,4);
    var pickMonth = nowData.substring(2,4); 
    var chosechange = timePoint.calendarPoint;
    var gg = 't' + nowData;
    var ggg = chosechange[gg];
    console.log(ggg);
    this.setData({
      yearMonth: nowData,
      pickYear: pickYear,
      pickMonth: pickMonth,
      time_point: ggg
    })
  },
  //切换宣讲会地点
  bindPickerChangee: function (e) {
    var uniPoint ; 
    if (e.detail.value.length == 1){
      uniPoint = '0'+e.detail.value;
    }else{
      uniPoint = e.detail.value;
    }
    this.setData({
      indexUni: uniPoint,
      uniTitlePoint: e.detail.value
    });
    this.showMess();
  },
  //当初始化页面或用户点击相应日期、学校时候，加载数据来源
  showMess: function(){
    var a =''+ this.data.pointAt + this.data.indexUni;
    console.log(a);
    this.setData({
      messageList:a
    });

    this.loadPrachList();
  },
  //跳转preachDetail页面
  tapPreach: function(e){
    var preachId = e.currentTarget.dataset.preachid;
    console.log(preachId);
    wx.navigateTo({
      url: 'preach-detail/preach-detail?id=' + preachId 
    })
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