const user = {
    name: 'Miraç',
    surname: 'Baydogan',
    email : 'test@test.com',
    password:  '$2b$10$0jN2UzzRmzXba//RY4w7DOEF8KyL5mTX2WE.pS2gW5R6jLrmmsh7i'
}
import * as jwt from 'jsonwebtoken';
export default async function handler(req, res) {
    try{
        if (req.method === 'POST') {
        const token = req.headers.authorization.split(" ")[1]; // Headerda Gelen Token'ı aldık
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY); // Tokenı secret key ile doğruladık
        req.userData = decoded;
        if(user.email == req.userData.email){ // Gelen tokendaki email veritabanımızdaki kullanıcının emaili ile eşleşiyorsa auth doğruluyoruz. Bu kısımda basic anlattığım için ekstra olarak kontrol sağlanması lazım. Örnek veriyorum login olan kullanıcıları ekstra bir tabloda [token, email, isActive] olarak tutulup token ve email üzerinden kontrol sağlanması daha sağlıklı olacaktır. 
            return res.status(200).json({
                message: true
            })
        }else{
            return res.status(401).json({
                error: 'Auth failed'
            }); 
        }
    } else {
        return res.status(400).json({
            error: 'Bad Request'
        })
    }
    }catch(err){
        return res.status(401).json({
            error: 'Auth failed'
        })
    }
}
