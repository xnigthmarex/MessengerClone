

import {prisma} from '@/server/prisma'
import * as bcrypt from 'bcrypt'

export async function POST(req){
    //create user
    const data = await req.json();
    const user = await prisma.user.create({
        data: {
            username: data.username,
            password: await bcrypt.hash(data.password, 10)
        }
    })
    //return user with password removed
    const {password, ...userWithoutPassword} = user
    return  new Response(JSON.stringify(userWithoutPassword))
}