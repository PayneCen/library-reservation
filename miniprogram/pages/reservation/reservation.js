// pages/reservation/reservation.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        placeArr: [],
        index_s: 0,
        statusArr: ['查看全部','已被预约','暂未预约','不可预约'],
        seatArr: [],
        whereArr: [],
        reservationStatus: '',
    },
    bindChangePlace: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindChangeStatus: function(e) {
        this.setData({
            index_s: e.detail.value,
            reservationStatus: 5
        })
        if(e.detail.value==0) {
            //查看全部
            wx.cloud.callFunction({
                name: "getseat",
                complete: res=>{
                    this.setData({
                        seatArr: res.result.data
                    })
                }
            })
        }else if(e.detail.value==1) {
            //已被预约
            this.setData({
                reservationStatus: 2
            })
        }else if(e.detail.value==2) {
            //暂未预约
            this.setData({
                reservationStatus: 0
            })
        }else {
            //不可预约
            this.setData({
                reservationStatus: 1
            })
        }
        if(this.data.reservationStatus!=5){
            let zt = this.data.reservationStatus
            db.collection("seat").where({situation: parseInt(zt)}).get().then(res => {
                this.setData({
                    seatArr: res.data
                })
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // db.collection("seat").get().then(res => {
        //     this.setData({
        //         seatArr: res.data
        //     })
        // });
        wx.cloud.callFunction({
            name: "getseat",
            complete: res=>{
                this.setData({
                    seatArr: res.result.data
                })
            }
        })
        db.collection("position").get().then(res => {
            this.setData({
                whereArr: res.data
            });
            let arr = ['查看全部'];
            for(let i=0; i<res.data.length; i++) {
                arr.push(res.data[i].floor);
            }
            this.setData({
                placeArr: arr
            });
        });
    },
    getList(){
        wx.cloud.callFunction({
            name: 'getseat',
            complete: res => {
                wx.stopPullDownRefresh()
                this.setData({
                    seatArr: res.result.data
                })
            }
        })
    },
    showxq(e){
        db.collection("seat").doc(e.currentTarget.id).get().then(res => {
            if(res.data.situation == 0){
                wx.navigateTo({
                    url: '../booking/booking?list_id='+e.currentTarget.id,
                })
            }else {
                wx.showToast({
                  title: '该座位不可预约',
                  icon: 'error',
                  duration: 1000,
                })
            }
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
        this.getList();
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
        this.getList();
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