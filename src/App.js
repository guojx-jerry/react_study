import React,{Component} from 'react'
import {BrowserRouter, Link, Route ,Switch} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
/*
应用的根组件
 */
export default class App extends Component {


    render() {
        return (

            <BrowserRouter>
                {/*<ul>*/}
                {/*    <li><Button type='primary'><Link to='/login'></Link>登录界面</Button></li>*/}
                {/*    <li><Button type='primary'><Link to='/admin'></Link>管理界面</Button></li>*/}
                {/*</ul>*/}
                {/*只匹配一个*/}
                <Switch>
                    <Route path='/login' component={Login}/>

                    <Route path='/' component={Admin}></Route>
                </Switch>



            </BrowserRouter>
        )
    }
}