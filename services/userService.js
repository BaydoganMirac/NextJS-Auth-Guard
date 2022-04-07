import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';
import axios from 'axios';
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    checkAuth
};

async function login(userEmail, userPassword) {
    let userInfo = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URI + '/api/user/login', {email : userEmail, password: userPassword});
    if(userInfo?.data){
        // Kullanıcıya abonelik oluşturup localstorage'de bilgileri tutuyoruz
        userSubject.next(userInfo.data);
        localStorage.setItem('user', JSON.stringify(userInfo.data));
        return userInfo.data;
    }else{
        return false;
    }
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}
function checkAuth(token){
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.post(process.env.NEXT_PUBLIC_BACKEND_URI + '/api/user/checkAuth',{}, config)
    .then(res => {
        if(res.data.message){
            return true;
        }
    })
}