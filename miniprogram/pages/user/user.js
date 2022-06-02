// pages/user/user.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: '',
        userInfo: ''
    },
    getopenid() {
        let that = this;
        let usid = '';
        wx.cloud.callFunction({
            name: 'open',
            success: (res) => {
                usid = res.result.openid
                this.setData({
                    openid: res.result.openid,
                })
                getApp().globalData.openid = res.result.openid
                wx.setStorageSync('openid', usid)
            },
            fail(res) {
                console.log("获取失败", res);
            }
        })
        wx.getUserProfile({
            desc: '用于完善资料',//声明
            success: (res) => {
                db.collection("user").where({ openid: usid }).get().then(res => {
                    this.setData({
                        userInfo: res.data[0]
                    })
                    wx.setStorageSync('userinfo', res.data)
                })
                // this.setData({ userInfo: res.userInfo })
            },
            fail(res) {
                console.log('用户拒绝')
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let user = wx.getStorageSync('openid')
        var userinfo = wx.getStorageSync('userinfo')
        this.setData({
            openid: user,
            userInfo: userinfo
        })
        getApp().globalData.openid = user
        if(this.data.userInfo==''){
            db.collection("user").where({ openid: user }).get().then(res => {
              this.setData({
                userInfo: res.data
              })
              wx.setStorageSync('userinfo', res.data)
            })
          }
    },

    toInfo: function (e) {
        wx.navigateTo({
            url: '../info/info'
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