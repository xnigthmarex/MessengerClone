'use server'
import {prisma }from "@/server/prisma"

async function fetchFriendRequests(username) {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          receivedFriendRequests: {
            include: {
              sender: true,
            },
            where: {
              OR: [
                { status: "pending" },
              ]
            },
          },
        },
      });
  
      if (user) {
        return user.receivedFriendRequests;
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  
    return [];
  }
  

async function acceptFriendRequest(requestId) {
  try {
    await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "accepted" },
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
}

async function declineFriendRequest(requestId) {
  try {
    await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "declined" },
    });
  } catch (error) {
    console.error("Error declining friend request:", error);
  }
}

export { fetchFriendRequests, acceptFriendRequest, declineFriendRequest };
