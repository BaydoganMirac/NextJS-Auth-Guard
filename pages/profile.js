import Navbar from "../components/Navbar";
import AuthGuard from "../services/AuthGuard";
import Link from 'next/link';
import { userService } from "../services/userService";
export default function Profile(){
    // AuthGuardı bir component misali kullanıcıya göstermek istemediğimiz sayfaya ekliyoruz. 
    return (<>
        <AuthGuard>
            <Navbar></Navbar>
            <div className='container home-section'>
                <div>
                This area is protected. If you are logged in, you can access this page. You can logout from the <Link href='#'><a onClick={()=>{userService.logout()}} style={{color: `red`, marginLeft: '5px'}}>link</a></Link>
                </div>
            </div>
        </AuthGuard>
    </>)
}