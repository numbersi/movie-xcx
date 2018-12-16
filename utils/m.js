import {
  HTTP
} from './http.js'
let http = new HTTP()
class Movie {
  category =null
  constructor(options){
    this.category = options.category
    this.storageData = wx.getStorageSync(options.category),
    this.md5_html =null
  }
  getListData(that, pageno) {
    // wx.getStorage({
    //   key: this.category,
    //   success: ({data}) => {
    //     console.log(data)
    //     const md5_html = data.md5_html
    //    if(data){
    //      if (pageno == 1) {
    //        that.setData(data)
    //        this.checkMd5Html(,md5_html)
    //        return
    //      }
    //    }
    //     this.getListDataFormUrl(that, pageno, md5_html)
    //   },
    //   fail: () => {
    //     this.getListDataFormUrl(that, pageno)
    //   }
    // })
    if (this.storageData){
      if (pageno == 1) {
        that.setData(this.storageData)
          //  this.checkMd5Html(md5_html)
           return
         }
      this.getListDataFormUrl(that, pageno)
    }else{
       this.getListDataFormUrl(that, pageno)
    }
  }
  getListDataFormUrl(that, pageno, category, md5_html="") {
    http.request({
      url: 'api/getListData',
      data: {
        category:this.category,
        pageno
      },
      success: this.setListData(that, pageno,)
    })
  }
  setStorageData( data) {
    console.log(data)
    wx.setStorage({
      key: this.category,
      data: data,
    })
  }

  setListData(that, paneno) {
    if (paneno == 1) {
      return (res) => {
        res.data['pageno'] = 1
        this.setStorageData( res.data)
        this.md5_html= res.data.md5_html
        that.setData(res.data)
      }
    }
    return (res) => {
      let list_movie =that.data.list_movie.concat(res.data.list_movie)
      if (paneno<=4){
        res.data['pageno'] = paneno
        res.data['list_movie'] = list_movie
        wx.getStorage({
          key: this.category,
          success: ({data}) =>{
            console.log(this.storageData)
            res.data['md5_html'] = data.md5_html
            this.setStorageData(res.data)
          },
        })


      }
      that.setData({
        list_movie,
      })
    }
  }


/**
 * 检测 更新
 */
  checkMd5Html(category,md5_html){

   http.request({
     url:"api/checkMd5Html",
     data:{
       md5_html,
       category
     },
     success:({data})=>{
       console.log(data)
       if(data.flag){
         console.log('没有更新')
       }
     }
   })
 }
}



export {
  Movie
}