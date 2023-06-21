import { signJwtAccessToken } from '@/server/jwt';
import {prisma} from '@/server/prisma'
import * as bcrypt from 'bcrypt'

export async function POST(req){
  
    const data = await req.json();
    
    //find user
    const user = await prisma.User.findUnique({
        where: {
            username: data.username
        }
    })
    
    //check password
    if(user && (await bcrypt.compare(data.password, user.password))){
        //return user with password removed
        const {password, ...userWithoutPassword} = user
        const accessToken = signJwtAccessToken(userWithoutPassword);
        const result = {
            ...userWithoutPassword,
            accessToken,
        }
        return  new Response(JSON.stringify(result))
    }
    // Return null if user data could not be retrieved
    return new Response(JSON.stringify(null));
    
}
