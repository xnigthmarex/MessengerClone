'use server'
import {prisma }from "@/server/prisma"

export default async function AddFriendServer(username, friendUsername) {
    const user = await prisma.user.findUnique({
        where: { username },
      });
    
      if (!user) {
        return `User ${username} does not exist.`;
      }
    
      const friend = await prisma.user.findUnique({
        where: { username: friendUsername },
      });
    
      if (!friend) {
        return `Friend ${friendUsername} does not exist.`;
      }
    
      if (user.id === friend.id) {
        return "You cannot send a friend request to yourself.";
      }
    
      const existingRequest = await prisma.friendRequest.findFirst({
        where: {
          senderId: user.id,
          receiverId: friend.id,
        
        },
      });
    
      if (existingRequest) {
        return "Friend request already sent to this user.";
      }
    
      const reverseRequest = await prisma.friendRequest.findFirst({
        where: {
          senderId: friend.id,
          receiverId: user.id,
       
        },
      });
    
      if (reverseRequest) {
        return "Friend request already received from this user.";
      }
    
      await prisma.friendRequest.create({
        data: {
          senderId: user.id,
          receiverId: friend.id,
          status : "pending"
        },
      });
    
      return `Friend request sent from ${username} to ${friendUsername}.`;
    }
      