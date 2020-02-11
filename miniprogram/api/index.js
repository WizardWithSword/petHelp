const api = {}
const db = wx.cloud.database()
const _ = db.command
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

/* 新增帮助 */
api.applyHelp = function (data) {
  return db.collection('help').add({
    data: { ...data }
  })
}
/* 首页查询帮助列表 */
api.getHelps = function (where) {
  return db.collection('help').where(where).orderBy('createtime', 'desc').get()
}

/* 获取我愿意帮助的求助id列表 */
api.getMyHelpsForOther = function () {
  let u = wx.getStorageSync('uid') || ''
  return db.collection('helpAccept').where({
    helpUid: u
  }).get().then(res => {
    if (res.data.length > 0) {
      let ids = []
      ids = res.data.map(item=>{
        return item.helpId
      })
      return db.collection('help').where({
        _id:_.in(ids)
      })
    } else {
      return []
    }
  })
}


module.exports = api