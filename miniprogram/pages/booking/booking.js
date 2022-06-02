// pages/booking/booking.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list_id: '',
        rmbs: '',
        userinfo: '',
        openid: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let userinfo = wx.getStorageSync('userinfo')
        let openid = wx.getStorageSync('openid')
        this.setData({
            list_id: options.list_id,
            userinfo: userinfo,
            openid: openid
        })
        wx.cloud.callFunction({
            name: 'getSeatList',
            data: {
                listid: options.list_id
            },
            complete: res => {
                this.setData({
                    rmbs: res.result.list
                })
            }
        })
    },
    confirm(){
        db.collection('choose').add({
            data: {
                openid: this.data.openid,
                chooseseat: this.data.list_id,
                _createTime: Date.parse(new Date()),
            }
        }).then(res => {
            wx.showToast({
              title: '选座成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                  db.collection("seat").doc(this.data.list_id).update({
                      data: {
                          situation: 2
                      },
                      success: res => {
                          setTimeout(function(){
                            wx.switchTab({
                                url: '../reservation/reservation',
                                })
                          },2000)
                      }
                  })
              }
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