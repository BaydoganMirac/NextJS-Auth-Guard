
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useRouter } from 'next/router';
export default function Navbar() {
    const [userAuth, setUserAuth ] = useState();
    const router= useRouter();
    useEffect(() =>{
        // Navbarda Profile ve Login butonlarını göstermek amacıyla bir state oluşturup auth kontrolü yaptıktan sonra state'i güncelliyoruz.
        if (!userService.userValue) {
            setUserAuth(false);
        } else {
            if(typeof userService.userValue?.token !== 'undefined'){
                userService.checkAuth(userService.userValue?.token).then((res) => {
                    setUserAuth(true)
                } ).catch(err => {
                    setUserAuth(false);
                })
            }else{
                setUserAuth(false)
            }
        }
    },[])
    const UserButtons = () =>{
        // Kullanıcının login durumuna göre headerda gösterilecek butonlar
        if(userAuth){
            return(<>
                <Link href='/profile'>
                    <a className={`${router.pathname == 'profile'? 'active': ''}`}>Profile</a>
                </Link>
            </>)
        }else{
            return(<>
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </>)
        }
    }
  return (<>
  <Head>
      <title>NextJS Auth Guard App</title>
  </Head>
  <div className="header">
    <Link href='/'>
      <a className="logo">NextJS Auth Guard APP</a>
    </Link>
    <div className="header-right">
      <Link href='/'>
        <a>Home</a>
      </Link>
    <UserButtons></UserButtons>
    </div>
  </div>
  </>)
}
