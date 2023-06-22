"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetReceivedFriendRequests(name) {
  try {
    // Find all received friend requests for the given username
    const receivedFriendRequests = await prisma.friendRequest.findMany({
      where: {
        receiver: {
          username: name,
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // Extract the sender's ID, username, and status from each friend request
    const friendRequestsInfo = receivedFriendRequests.map((friendRequest) => ({
      senderId: friendRequest.sender.id,
      senderUsername: friendRequest.sender.username,
      status: friendRequest.status,
    }));

    console.log('Received Friend Requests:', friendRequestsInfo);
    return friendRequestsInfo;
  } catch (error) {
    console.error('Error retrieving received friend requests:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
