const api = {}
const db = wx.cloud.database()
const uid = wx.getStorageSync('uid') || ''
api.save = function (name, data) {}

api.get = function (name, where) {
  console.log('get', name, where)
}

api.getUserinfo = function () {
  let u = uid ||  wx.getStorageSync('uid') || ''
  return db.collection('user').where({
    _openid: u
  }).get().then(res => {
    return res
  })
}
api.saveUserinfo = function (data) {
  let u = wx.getStorageSync('uid') || ''
  return db.collection('user').where({
    _openid: u
  }).get().then(res => {
    console.log('查询的结果', res)
    if (res.data.length > 0) { // 执行update
      console.log('更新一条记录')
      return db.collection('user').where({
        _openid: u
      }).update({
        data: {...data}
      })
    } else { // 执行add
      console.log('新增一条记录')
      return db.collection('user').add({
        data: {...data}
      })
    }
  })
}
module.exports = api