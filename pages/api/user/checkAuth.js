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
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
        req.userData = decoded;
        if(user.email == req.userData.email){
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
