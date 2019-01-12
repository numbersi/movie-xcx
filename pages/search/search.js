// pages/search/search.js
import { HTTP } from '../../utils/http.js'
const http = new HTTP()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wd:'',
    current: 0,
    current_scroll: 0,
    month_page: null,
    sources:[
      'zuida','tv6'
    ],
    source:'zuida'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  blur: function ({ detail}){
    //双向绑定 
    this.setData({ wd: detail.detail.value }, this.getSearcheDatafromApi)
  
  },
  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key,
      source: this.data.sources[detail.key]
    },this.getSearcheDatafromApi);
  },
  getSearcheDatafromApi(){
    if(!this.data.wd){
      return
    }
    const that =this
    wx.showLoading({
      title: '正在搜索',
    })
    http.request({
      url: 'api/search',
      data: {
        wd: that.data.wd,
        source: that.data.source
      },
      success: function ({data}) {
        wx.hideLoading()
        console.log(data)
        if (data.msg){
          return 
        }
        that.setData({
          video: data.video
        })
      }
    })
  }, 
})