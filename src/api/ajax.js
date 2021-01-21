import axios from "axios";
import {message} from "antd";


/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是一个promise对象
1、优化：统一处理请求异常
    在外层包一个自己创建的promise对象，在请求出错时不去reject，而去显示错误提示
 */
function ajax(url,data={},method='GET') {
    return new Promise(function (resolve, reject) {
        let promise;
        //1、执行异步ajax请求
        if (method == 'GET') { //发送get请求
            promise = axios.get(url, {//配置对象
                params: data//指定请求参数
            })

        } else {//发送post请求
            promise = axios({
                method: 'POST',
                url: url,
                data: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
                ,
            })
        }
        //2、如果成功了，调用resolve（value）
        promise.then(response =>{
            resolve(response)
        })
        //3、如果失败了，不调用reject(reason)，而是提示异常信息
            .catch(error=>{
                //reject(error)
                message.error('请求失败了:'+error.message)
            })



    })


}


export default ajax