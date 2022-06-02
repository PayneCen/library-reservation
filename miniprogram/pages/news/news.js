// pages/news/news.js
const db = wx.cloud.database()
const times = require("../../utils/times.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text_id: '',
        time: '',
        html: '',
        title: '',
        picture: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            text_id: options.text_id
        })
        db.collection("news").doc(this.data.text_id).get().then(res => {
            res.data._updateTime = times.toDate(res.data._updateTime)
            this.setData({
                html: res.data.content,
                title: res.data.title,
                time: res.data._updateTime,
                picture: res.data.picture
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})