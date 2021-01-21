import {getUser,getToken} from "./storageUtils";

/*
用来在内存中保存数据的工具模块
 */

export default  {
    user: {getUser},//保存当前登陆的user
    token:{getToken}
}