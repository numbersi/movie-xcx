import {
  HTTP
} from './http.js'
let http = new HTTP()
class Movie {
  category = null
  constructor({
    category,
    href
  }) {
    if (category) {
      this.category = category
      this.storageDataList = wx.getStorageSync(category)
    } else if (href) {
      this.href = href
      this.storageDataDetail = wx.getStorageSync(href)
    }
    this.md5_html = null,
    this.updateTime = 0;
  }
  /**
   * 获取 详细信息
   */
  getDetailData(){
    if (this.storageDataDetail){
      that.setData(this.storageDataList)
      return
    }
    this.getDetailFormUrl()
  }
  getDetailFormUrl(){}
  /**
   * 获取 列表
   */
  getListData(that, pageno=1) {
    this.page = that
    if (this.storageDataList) {
      if (pageno == 1) {
        this.checkMd5Html()
        return
      }
      this.getListDataFormUrl( pageno)
    } else {
      this.getListDataFormUrl( pageno)
    }
  }
  getListDataFormUrl(pageno, category, md5_html = "") {
    http.request({
      url: 'api/getListData',
      data: {
        category: this.category,
        pageno
      },
      success: this.setListData( pageno, )
    })
  }
  setStorageData(data) {

    console.log(data)
    wx.setStorage({
      key: this.category,
      data: data,
    })
  }

  setListData( paneno) {
    if (paneno == 1) {
      return (res) => {
        res.data['pageno'] = 1
        this.setStorageData(res.data)
        this.md5_html = res.data.md5_html
        this.page.setData(res.data)
      }
    }
    return (res) => {
      let list_movie = this.page.data.list_movie.concat(res.data.list_movie)
      if (paneno <= 40) {
        res.data['pageno'] = paneno
        res.data['list_movie'] = list_movie
        wx.getStorage({
          key: this.category,
          success: ({
            data
          }) => {
            console.log(this.storageDataList)
            res.data['md5_html'] = data.md5_html
            this.setStorageData(res.data)
          },
        })


      }
      this.page.setData({
        list_movie,
      })
    }
  }
  /**
   * 检测 更新
   */
  checkMd5Html() {
    let time = new Date().getTime()
    let timeC = (time - this.updateTime) / 1000
    console.log(timeC)
    if (timeC<180){
      return
    }
    this.updateTime = time
    http.request({
      url: "api/checkMd5Html",
      data: {
        category: this.category,
        md5_html: wx.getStorageSync(this.category).md5_html
      },
      success: ({
        data
      }) => {
        if (data.flag) {
          console.log('没有更新')
          this.page.setData(this.storageDataList)

        }else{
          this.page.setData(
            data.data
          )
          this.setStorageData(data.data)

        }
      }
    })
  }


}



export {
  Movie
}