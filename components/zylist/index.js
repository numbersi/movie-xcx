// components/zylist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    month_page_list:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    current_scroll: 0,
    month_page: null
  },

  attached :function(){
    this.setData({
      month_page: this.properties.month_page_list.month_pages[0]
    })
  },

  /**
   * 组件的方法列表
   */

  methods: {
    handleChangeScroll({ detail }) {
      this.setData({
        current_scroll: detail.key,
        month_page: this.properties.month_page_list.month_pages[detail.key]
      });
    },
    chooseItem: function (e){
      const { item } =e. currentTarget.dataset
      this.triggerEvent('choose', {
        item
      }, { bubbles: true, composed: true  })

    }
  }
})
