import jwt from 'jsonwebtoken'

export function signJwtAccessToken(payload,options="1hr"){
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload,secret,{expiresIn:options});
    return token;
}

export function verifyJwtAccessToken(token){
    try{
        const secret = process.env.SECRET_KEY;
        const decoded = jwt.verify(token,secret);
        return decoded;
    }catch(err){
        console.log(err);
        return null;
    }
}