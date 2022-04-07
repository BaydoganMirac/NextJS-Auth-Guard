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

// Kullanıcı login olurken çalışacak fonksiyon
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
// Kullanıcı çıkış yaptığı zaman localstorage'daki veriyi siliyoruz.
// Ekstra güvenlik istiyorsak /api/user/chechAuth.js'de 14. kod satırındaki yoruma ek olarak; kullanıcının oluşturduğu tokenları kaydettiğimiz tablodaki isActive kolonunun 0 yapmamız bu tokenı süresi bitmediği halde kullanmasını engelleyebiliriz. Bu durum kullanıcının aktifliğini kontrol etmek amacıyla da kullanılabilir.
function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}
// Kullanıcı protected sayfalara girdiği zaman kayıtlı olan token'ın geçerliliğini kontrol etmek amacıyla oluşturduğumuz fonksiyon
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