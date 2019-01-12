//index.js
//获取应用实例
import { Movie } from '../../utils/m.js'
let movie = new Movie({category:'dianying'})
const log = function (str) {
  console.log(str)
}
Page({
  data: {
    list_movie: [],
    pageno: 1,
    loading:true
  },
  //事件处理函数
  onLoad: function () {
  },
  onShow:function(){
    wx.hideLoading()

    this.getDyData(1)
  },
  getDyData: function (pageno) {
    movie.getListData(this, pageno)
  },

  onReachBottom: function () {

    let pageno = this.data.pageno + 1
    this.setData({
      pageno: pageno
    })
    this.getDyData(pageno)

  },
  onPullDownRefresh: function () {
    log('下拉里')
    wx.stopPullDownRefresh()
  }
})