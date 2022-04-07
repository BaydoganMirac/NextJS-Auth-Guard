import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
export default function Login(){
    const router = useRouter()
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(() => {
        // Eğer kullanıcı login ise ana sayfaya yönlendir
        if (userService.userValue) {
            router.push('/');
        }
    }, []);
    const userLogin = (e) =>{
        // form subit işlemi yapıldığı zaman default eventı durdurup userService'deki login fonksiyonumuzu çalıştırıyoruz
        e.preventDefault();
        let mail = e.target[0].value;
        let password = e.target[1].value;
        return userService.login(mail, password)
        .then((res) => {
            router.push('/profile');
        })
        .catch(error => {
            setErrorAlert(true);
        });
    }
    return (<>
        <Link href='/'>
            <a style={{color: 'red', margin: '10px'}}> ← Go Home Page</a>
        </Link>
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='login-section' >
                <h1>Login Page</h1>
                <span>Test Email: <b>test@test.com</b></span>
                <span style={{marginBottom: '10px'}}>Test Password: <b>123</b></span>
                <form style={{display: 'flex', flexDirection: 'column', gap : '20px'}} onSubmit={userLogin}>
                    <input name='email' type='email' placeholder='Email'/>
                    <input name='password' type='password' placeholder='password'/>
                    <button>Login</button>
                </form>
            <div style={errorAlert ? {display:'block'} : {display:'none'}}>
                Password or mail wrong
            </div>
            </div>
        </div> 
    </>)
}