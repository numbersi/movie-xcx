//index.js
//获取应用实例

import { HTTP } from '../../utils/http.js'
let http = new HTTP()
const app = getApp()
const log = function(str) {
  console.log(str)
}
Page({
  data: {
    list_movie:[],
    pageno: 1
  },
  //事件处理函数
   onLoad:function(){
     this.getDyData(1)
   }, 
  getDyData: function (pageno) {
    // const that = this
    // wx.request({
    //   url: 'http://192.168.1.10:4444/api/dyData?&pageno=' + pageno,
    //   success: function(res) {
    //     log(res)
    //     that.setData({
    //       list_movie: that.data.list_movie.concat(res.data)
    //     })
    //   }
    // })
    http.request({ 
      url: 'api/getListData',
      data:{
        category:'dianying',
        pageno: pageno
      },
      success:(res)=>{
        this.setData({
          list_movie: this.data.list_movie.concat(res.data)
        })
      }
    })
  },

  onReachBottom: function() {

    let pageno = this.data.pageno+1
    this.setData({
      pageno:pageno
    })
    this.getDyData(pageno)

  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  }
})