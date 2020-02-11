// miniprogram/pages/help/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '西湖区'], // 救助行政区域
    addr: '', // 救助详细地址
    num: '', // 宠物数量
    type: '', // 品种
    way: '', // 进入方式
    feed: '', // 喂养方式
    step: 'step1',
    noreg: false, // 是否未注册
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.api.getUserinfo().then(res => {
      if (res.data.length === 0) {
        this.setData({
          noreg: true
        })
      } else {
        this.setData({
          noreg: false
        })
      }
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

  },
  chooseArea (e) {
    console.log('选择地址', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  inputAddr (e) {
    console.log('输入地址：', e.detail.value)
    this.setData({
      addr: e.detail.value
    })
  },
  goNext () {
    this.setData({
      step: 'step2'
    })
  },
  inputNum(e) {
    console.log('输入数量：', e.detail.value)
    this.setData({
      num: e.detail.value
    })
  },
  inputType (e) {
    this.setData({
      type: e.detail.value
    })
  },
  inputHowInto (e) {
    this.setData({
      way: e.detail.value
    })
  },
  inputHowFeed(e) {
    this.setData({
      feed: e.detail.value
    })
  },
  submit () {
    let obj = {}
    obj.provice = this.data.region[0] || ''
    obj.city = this.data.region[1] || ''
    obj.area = this.data.region[2] || '-'
    obj.addr = this.data.addr || ''
    obj.num = this.data.num || ''
    obj.type = this.data.type || ''
    obj.way = this.data.way || ''
    obj.feed = this.data.feed || ''
    console.log('提交', obj)
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo == '') {
      console.log('请填写身份信息')
      wx.showModal({
        title: '认证提醒',
        content: '请完整填写身份信息，以便后台审核该求助的真实性',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/set',
            })
          } else if (res.cancel) {
            wx.navigateTo({
              url: '/pages/user/set',
            })
          }
        }
      })
    } else {
      submit()
    }
  }
})