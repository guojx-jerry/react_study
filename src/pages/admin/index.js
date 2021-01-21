import React,{Component} from 'react'
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from 'react-router-dom'
import {getUser, removeToken, removeUser} from "../../utils/storageUtils";
import {Button,message} from "antd";

/*
后台管理的路由组件
 */
export default class Admin extends Component {

    handleLogout=()=>{
        removeUser();
        removeToken();
        this.props.history.replace('/login');
        message.success('注销成功');
    }

    render() {
        const user = getUser();
        if (!user) {
            //自动跳转到登陆界面(在render()里面)
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <div>Admin</div>
                <div></div>
                <div>Hello:{user}</div>
                <Button type="primary" onClick={this.handleLogout}>
                    注销
                </Button>
            </div>

        )
    }
}
