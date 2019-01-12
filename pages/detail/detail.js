import {
  HTTP
} from '../../utils/http.js'
let http = new HTTP()
const log = function(str,idx="") {
  console.log(inx,str)
}
// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    play_url: null,
    playIndex: 1, //当前播放的集数
    spinShow: false,
    fixTop: '',//区域离顶部的高度
    scrollTop: 0,//滑动条离顶部的距离,
    fixClass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      href
    } = options
    this.getDetialData(href)
  },
  getDetialData: function(href) {
    wx.getStorage({
      key: href,
      success: ({
        data
      }) => {
        console.log(data)
        if (data.category == "tv" && data.md5_html) {
          this.checkUpdate(href, data)
        }
        this.setData(data, () => {
          this.getPlayUrlTruthValue(data.playUrl)
        })
      },
      fail: () => {
        this.getDetailDataFormUrl(href)
      }
    })
  },
  checkUpdate: function(href, data) {
    http.request({
      url: 'api/checkUpdate',
      data: {
        href,
        md5_html: data.md5_html
      },
      success: (res) => {
        if (res.data) {
          this.setData(res.data)
          wx.setStorage({
            key: href,
            data: res.data,
          })
        } else {
          this.getPlayUrlTruthValue(data.playUrl)
          wx.setNavigationBarTitle({
            title: data.title
          })

        }
      }
    })
  },
  getDetailDataFormUrl(href) {
 
    http.request({
      url: 'api/getDetialData?href=' + href,
      success: (res) => {
        this.setData(res.data)
        this.getPlayUrlTruthValue(res.data.playUrl)
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        wx.setStorage({
          key: href,
          data: res.data,
        })
      }
    })
  },
  getPlayUrlTruthValue(playUrl) {

   const videoContext = wx.createVideoContext('myVideo')

    if (playUrl) {
      if (playUrl.endsWith('.m3u8')) {
      }
      let spinShow = true
      this.setData({
        spinShow
      }, () => {
        http.request({
          url: 'search/getPlayUrl',
          data: {
            url: playUrl
          },
          success: (res) => {
            console.log(res)
            spinShow = false
            const data = Object.assign({
              spinShow
            }, res.data)
            this.setData(data, () => {
              videoContext.play()
            })
          }
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let self = this;
    wx.createSelectorQuery().select('.playbox').boundingClientRect(function (rect) {
      self.setData({
        fixTop: rect.top,
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onTap: function(e) {
    const index = e.currentTarget.dataset.index
    const playItem = this.data.list_play[index]
    if (this.data.play_url) {
      this.setData({
        play_url: null,
        num: playItem.num
      })
    }
    this.getPlayUrlTruthValue(playItem.playUrl)

  },
  binderror: function(e) {

    log(e)
  },
  bindchoose: function({
    detail
  }) {
    console.log(detail)
    const {
      href
    } = detail.item
    this.getPlayUrlTruthValue(href)
  },
  chooseNum({
    currentTarget
  }) {
    const {
      href
    } = currentTarget.dataset
    console.log(href)
    this.getPlayUrlTruthValue(href)
  },
  onPageScroll: function ({scrollTop}) {
    let self = this;
    let top = scrollTop;
    let fixTop =this.data.fixTop
    let fixClass
    if (fixTop < scrollTop){
      fixClass = "fix_box" 
    }else{
        fixClass = "" 
    }
    self.setData({
      fixClass
    });
  },
  videoError:function(e){
      log(e)
  },
  bindwaiting:function(e){
    log(e,"bindwaiting")

  }
})