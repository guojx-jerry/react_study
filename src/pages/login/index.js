import React,{Component} from 'react'
import './login.less'
import { Form, Input, Button, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from "../../api";
import logo from './img/jerry.png'
import axios from "axios";
import {message} from "antd";
import memoryUtils from "../../utils/memoryUtils";
import {getUser, saveToken, saveUser} from '../../utils/storageUtils'
import {Redirect} from "react-router-dom";

/*
登录的路由组件
 */
class Login extends Component {
    constructor(props) {
        super(props);
    }






/*
async和await
1、作用：简化promise对象的使用：不用再使用.then()来指定成功/失败的回调函数，以同步编码（没有回调函数）的方式实现异步流程
2、哪里用await：在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3、哪里写async：await所在的最近的函数定义的左侧
 */
    handleCommit = (async (values) => {
        const {username,password} = values
            const response = await reqLogin({
                cardID:username,
                password:password
            })
            console.log('请求成功',response)
        const result = response.headers.status
        if(result==0){
            message.error('用户名不存在或者密码错误');
        }else{
            message.success('登陆成功')
            //保存用户
            localStorage.setItem('user',response.headers['user'])//保存到内存中
            saveUser(response.headers['user']);//保存到local中
            //跳转到管理界面(不需要再回退回来)
            this.props.history.replace('/')

        }





            //     .then((res)=>{
            //         console.log(res);
            //         if(res.headers['user-token']){
            //             localStorage.setItem('token',res.headers['user-token']);
            //         }
            //     }).catch(error=>{
            //         console.log(error)
            // })




    });
    handleCommit1=(values)=>{
        debugger;
        return new Promise(function(resolve,reject){
            axios({
                url:'/account/login',
                method:'post',
                headers:{
                    'Content-type':'application/json;charset=UTF-8'
                },
                data:JSON.stringify({
                    cardID:values.username,
                    password:values.password
                })
            })
                .then((res)=>{
                    console.log(res)
                    if(res.headers['user-token']){
                        // localStorage.setItem('token',res.headers['user-token']);
                        saveToken(res.headers['user-token'])
                    }
                })
        })
    };



    render() {
        //如果检测到用户登陆，自动跳转到管理页面
        const user = getUser();
        if(!user){
        return(
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt='Jerry' />
                    <h1>React项目：医疗挂号系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <div><Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.handleCommit}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    whitespace:true,
                                    message: '请输入用户名',
                                },
                                {
                                    min:4,
                                    message:'用户名至少为4位',
                                },
                                {
                                    max:12,
                                    message:'用户名最多为12位',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required:false,
                                    whitespace:true,
                                    message:'密码必须填写',

                                },
                                {
                                    pattern:/^\w+$/,
                                    message:'密码必须由英文、数字、下划线组成'
                                },
                                {
                                    min:4,
                                    message:'密码至少为4位',
                                },
                                {
                                    max:12,
                                    message:'密码最多为12位',
                                }

                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form></div>
                </section>
            </div>

        )}
        else {
            message.success('检测到登陆用户'+user+',自动登陆...')
            return <Redirect to='/'/>
        }
    }
}

export default Login