// pages/info/info.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myInfo: '',
        openid: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const app = getApp()
        let openid = app.globalData.openid
        this.setData({
            openid: openid
        })
        db.collection("user").where({ openid: this.data.openid }).get().then(res => {
            this.setData({
                myInfo: res.data
            })
            console.log(res.data[0]);
        })
    },

    formSubmit(e) {
        db.collection("user").where({ openid: this.data.openid }).update({
            data: {
                tel: e.detail.value.tel,
                mail: e.detail.value.mail,
                address: e.detail.value.address,
                zip: e.detail.value.zip,
                _updateTime: Date.parse(new Date()),
            },
            success: function(res) {
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1500
                })
            }
        })
    },

    toCancle(e) {
        wx.redirectTo({
            url: '../user/user'
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