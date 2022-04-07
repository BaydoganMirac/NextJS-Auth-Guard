import Navbar from "../components/Navbar";
import AtuhGuard from "../services/AuthGuard";
import Link from 'next/link';
export default function Profile(){
    return (<>
        <AtuhGuard>
            <Navbar></Navbar>
            <div className='container home-section'>
                <div>
                This area is protected. If you are logged in, you can access this page. You can logout from the <Link href='/login'><a style={{color: `red`, marginLeft: '5px'}}>link</a></Link>
                </div>
            </div>
        </AtuhGuard>
    </>)
}