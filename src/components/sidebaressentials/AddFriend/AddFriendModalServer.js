'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AddFriendRequestModalServer(session_user, friend_user) {
  try {
    
    const sender = await prisma.user.findUnique({
      where: {
        username: session_user,
      },
    });
    const receiver = await prisma.user.findUnique({
      where: {
        username: friend_user,
      },
    });

    
    const newFriendRequest = await prisma.friendRequest.create({
      data: {
        sender: {
          connect: { id: sender.id },
        },
        receiver: {
          connect: { id: receiver.id },
        },
        status: 'pending',
      },
    });

    console.log('Friend request sent:', newFriendRequest);
  } catch (error) {
    console.error('Error sending friend request:', error);
  } finally {
    await prisma.$disconnect();
  }
}
