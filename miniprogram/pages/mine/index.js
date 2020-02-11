// miniprogram/pages/mine/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: 'nav1',
    myapplyHelps: [],
    myHelpsForOther: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this._getList()

  },
  _getList () {
    if (this.data.choose === 'nav1') {
      let obj = {}
      obj._openid = wx.getStorageSync('uid')
      app.globalData.api.getHelps(obj).then(res => {
        console.log('获取到的list', res)
        this.setData({
          myapplyHelps: res.data || []
        })
      })      
    } else {
      app.globalData.api.getMyHelpsForOther().then(res => {
        this.setData({
          myHelpsForOther: res.data || []
        })
      })
    }
  },
  goDetail(e) {
    let id = e.currentTarget.dataSet.helpid
    wx.navigateTo({
      url: '/pages/help/detail?id='+id,
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
  chooseNav1 (str) {
    this.setData({
      choose: 'nav1'
    })
    this._getList()
  },
  chooseNav2(str) {
    this.setData({
      choose: 'nav2'
    })
    this._getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})