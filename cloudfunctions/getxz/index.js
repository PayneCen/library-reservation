// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-1gbakf2q09dba4c3'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var text = event.openid
  return await db.collection('choose').aggregate().match({openid:text})
  .lookup({
    from:'seat',
    localField:'chooseseat',
    foreignField:'_id',
    as:'zwList'
  }) 
  .sort({
    _updateTime: -1 // 倒序
  })
  .end()
}