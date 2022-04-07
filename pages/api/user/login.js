const user = {
    name: 'Miraç',
    surname: 'Baydogan',
    email : 'test@test.com',
    password:  '$2b$10$0jN2UzzRmzXba//RY4w7DOEF8KyL5mTX2WE.pS2gW5R6jLrmmsh7i'
}
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    try{
        if (req.method === 'POST') {
            const bcryptPass = await bcrypt.compare(req.body.password, user.password);
            if (!bcryptPass) {
            return res.status(401).json({
                error: 'Email Or password wrong'
            });
            }
            const token = jwt.sign(
                {
                email: user.email,
                id: user.id
                },
                process.env.NEXT_PUBLIC_JWT_KEY,
                {
                expiresIn: "12h"
                }
            );
            return res.status(200).json({
                email: user.email,
                name: user.name,
                surname: user.surname,
                token: token
            })
        } else {
        return res.status(400).json({
            error: 'Bad Request'
        })
        }
    }catch(err){
        return res.status(500).json({
            error:  err
        })
    }
}