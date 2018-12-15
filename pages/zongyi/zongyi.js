const app = getApp()

import { Movie } from '../../utils/m.js'
let movie = new Movie({ category: 'zongyi' })

// pages/tv/tv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_movie: [],
    pageno: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZydata(1)
  },
  getZydata: function (pageno) {
    movie.getListData(this, pageno, 'zongyi')
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onReachBottom: function () {

    let pageno = this.data.pageno + 1
    this.setData({
      pageno: pageno
    })
    this.getZydata(pageno)

  },
})