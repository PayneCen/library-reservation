// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-1gbakf2q09dba4c3'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    let listid = event.listid
    return await db.collection("seat").aggregate().match({
        _id: listid
    }).lookup({
        from: 'position',
        localField: 'floor',
        foreignField: '_id',
        as: 'zwlist'
    }).end()
}