/*
包含应用中所有接口请求参数的模块
 */
import ajax from "./ajax";


//登陆
//注意：箭头有返回的作用，所以如果不加大括号就不用加return
export const reqLogin = (data) => ajax('/account/login',data,'POST')




