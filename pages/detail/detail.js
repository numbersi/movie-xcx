
import { HTTP } from '../../utils/http.js'
let http = new HTTP()
const log = function (str) {
  console.log(str)
}


// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      play_url:null,
      playIndex:1,//当前播放的集数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { href} = options
    this.getDetialData(href)
  },

  getDetialData:function (href) {

    wx.request({
      url: 'http://192.168.1.10:4444/api/getDetialData?href=' + href,
      success:(res)=>{
        this.setData(res.data)
        this.getPlayUrlTruthValue(res.data.playUrl)
        wx.setNavigationBarTitle({
          title: res.data.title
        })
      }
    })
  },

  getPlayUrlTruthValue(playUrl){
    if(playUrl){
      wx.request({
        url: 'http://192.168.1.10:4444/search/getPlayUrl',
        data: {
          url: playUrl
        },
        success: (res) => {
          console.log(res)
          this.setData(res.data)
        }
      })
    }

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
  onTap:function(e){
    const index = e.currentTarget.dataset.index
    const playItem = this.data.play_list[index]
    this.getPlayUrlTruthValue(playItem.playUrl)

  },
  binderror:function(e){
    console.log(e)
  }
})