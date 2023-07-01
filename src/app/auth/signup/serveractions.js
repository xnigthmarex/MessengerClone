'use server'
import {prisma }from "@/server/prisma"

export async function checkUsername(username){
    
    try {
        const user = await prisma.user.findUnique({
        where: { username },
        });
        if (user) {
        return false;
        }
    } catch (error) {
        console.error("Error checking username:", error);
    }
    return true;
}
