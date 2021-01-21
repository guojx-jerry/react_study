import store from 'store'
/*
进行local数据存储管理的工具模块
 */
const USER_KEY = 'user';
const TOKEN_KEY = 'token'


export function getUser(){
    // localStorage.getItem(user_key)||{};
    return store.get(USER_KEY)||0;
}

export function saveUser(user){
    store.set(USER_KEY,user)
    // localStorage.setItem(user_key,user);
}

export function removeUser(){
    // localStorage.removeItem(user_key);
    store.remove(USER_KEY)
}

export function getToken(){
    store.get(TOKEN_KEY)
}

export function saveToken(user){
    store.set(TOKEN_KEY,user)
    // localStorage.setItem(user_key,user);
}

export function removeToken(){
    // localStorage.removeItem(user_key);
    store.remove(TOKEN_KEY)
}
