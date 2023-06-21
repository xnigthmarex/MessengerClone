'use server'

import {prisma} from '@/server/prisma'

export default async function FriendRequestModalServer(name){
    console.log(name);
    //using name get id then query the friend requests
    const receivedFriendRequests = await prisma.friendRequest.findMany({
        where: {
          receiver: {
            username: name // Replace 'yourUsername' with the desired username
          }
        }
      });
      
      
      console.log(receivedFriendRequests);
      
      
}
