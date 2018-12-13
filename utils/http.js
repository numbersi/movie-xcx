import {config} from '../config/config.js'
class  HTTP{
    request(params){
      if(!params.method){
        params.method ='GET'
      }
      wx.request({
        url: config.api_base_url+params.url,
        method:params.method,
        data:params.data,
        header:{
            'content-type':'application/json',
            'appkey':''
        },
        success:(res)=>{
          let code =  res.statusCode.toString()
          if (code.startsWith('2')){
            params.success(res)
          }
        },
        fail:(err)=>{

        },
        complete:()=>{

        }
      })
    }

}

export {HTTP}