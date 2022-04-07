import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from './userService';


export default function AuthGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // İlk Yüklenmede Auth Fonksiyonumuzu Çağırıyoruz
        authCheck(router.asPath);

        const hideContent = () => setAuthorized(false);
        // ilk yüklemede içeriği gizliyoruz
        router.events.on('routeChangeStart', hideContent);

        //  Yönlendirme tamamlandığında auth kontrolünü tekrar yapıyoruz
        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

    }, [router]);

    function authCheck(url) {
        // Kullanıcı Login olmadığı zaman yönlendireceğimiz sayfa
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        
            if (!userService.userValue && !publicPaths.includes(path)) {
                    setAuthorized(false);
                    router.push({
                        pathname: '/login',
                        query: { returnUrl: router.asPath }
                    });
            } else {
                if(typeof userService.userValue?.token){
                    userService.checkAuth(userService.userValue?.token).then((res) => {
                        setAuthorized(true);
                    } ).catch(err => {
                        setAuthorized(false);
                        router.push({
                            pathname: '/login',
                            query: { returnUrl: router.asPath }
                        });
                    })
                }else{
                    setAuthorized(false);
                }
            }
      

    }
    return (authorized && children);
}