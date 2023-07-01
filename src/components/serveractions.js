'use server'
// prisma.js
import {prisma }from "@/server/prisma"

// This function fetches a list of friends for a given user. It first finds the user in the database, then finds all of their friend requests. It then filters the list of friend requests to only include those with a status of "accepted", and then returns a list of the usernames of the users who sent or received those friend requests.

export async function getAcceptedFriendRequests(session) {
  try {
    // Get the username from the session object
    const username = session.name;

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    // Get the user ID from the user object
    const userId = user.id;

    // Find all of the friend requests that involve the user
    const acceptedFriendRequests = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { senderId: userId, status: "accepted" },
          { receiverId: userId, status: "accepted" },
        ],
      },
      select: {
        sender: { select: { username: true } },
        receiver: { select: { username: true } },
      },
    });

    // Filter the list of friend requests to only include those with a status of "accepted"
    // Return a list of the usernames of the users who sent or received those friend requests
    const friends = acceptedFriendRequests.map((friendRequest) => {
       
      if (friendRequest.sender.username === username) {
        return friendRequest.receiver.username;
      } else {
        return friendRequest.sender.username;
      }
    });

    return friends;
  } catch (error) {
    throw error;
  }
}
