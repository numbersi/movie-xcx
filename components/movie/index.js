// components/movie/index.js
const log = function (str) {
  console.log(str)
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list_movie:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail:function(e){
      // log(this.getCurrentTar(e,'href'))
      const href = this.getCurrentTar(e, 'href')
      wx.navigateTo({
        url: '/pages/detail/detail?href=' + href,
      })
    },
    getCurrentTar: function (e,sign){
      return e.currentTarget.dataset[sign]
    }, 

  },
})
