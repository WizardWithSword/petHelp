// miniprogram/pages/user/set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '西湖区'], // 救助行政区域
    addr: '', // 救助详细地址
    name: '',
    phone: '',
    wechat: '',
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
    app.globalData.api.getUserinfo().then(res => {
      console.log('查询的结果', res)
      if (res.data.length > 0) {
        let item = res.data[0]
        let arr = []
        arr.push(item.provice)
        arr.push(item.city)
        arr.push(item.area)
        this.setData({
          region: arr,
          name: item.name,
          addr: item.addr,
          phone: item.phone,
          wechat: item.wechat,
        })
      }
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
  chooseArea(e) {
    this.setData({
      region: e.detail.value
    })
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  inputWechat(e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  inputAddr (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  submit () {
    let obj = {}
    obj.name = this.data.name
    obj.phone = this.data.phone
    obj.wechat = this.data.wechat
    obj.addr = this.data.addr
    obj.provice = this.data.region[0] || ''
    obj.city = this.data.region[1] || ''
    obj.area = this.data.region[2] || '-'
    console.log('确定', obj)
    app.globalData.api.saveUserinfo(obj).then(res => {
      console.log('确定的结果', res)
      if (res.errMsg === 'collection.add:ok' || res.errMsg === 'collection.update:ok') {
        wx.showToast({
          title: '提交成功！',
          success: function () {
            wx.navigateBack()
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})