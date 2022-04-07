
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { userService } from '../services/userService';
import { useState, useEffect } from 'react';
export default function Home() {
  const [userAuth, setUserAuth] = useState();
  useEffect(()=>{
    // kullanıcının login durumunu state kaydediyoruz
    if(userService.userValue?.token){
      setUserAuth(true)
    }else{
      setUserAuth(false)
    }
  })
  const UserLoginText = () =>{
    // Kullanıcının login durumuna göre döneceğimiz index'deki yazımız
    if(userAuth){
      return(<>
      <span>
      You can logout from the <Link href={'#'} ><a onClick={() =>{  
            userService.logout();
          }} style={{color : 'red'}}>link</a></Link></span>
      </>)
    }else{  
      return (<>
      <span>You can login from the <Link href='/login'><a style={{color: 'red'}}>link</a></Link></span>
      </>)
    }
  }
  return (<>
    <Navbar></Navbar>
    <div className='container home-section'>
      <div>
      Welcome NextJS Auth Guard Application. <UserLoginText></UserLoginText>
      </div>
    </div>
  </>)
}
