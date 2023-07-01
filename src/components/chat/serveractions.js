'use server'
import { prisma } from "@/server/prisma";

// Fetch the first 10 messages where the sender is the user or the receiver is the user
export async function fetch(username, friendname) {
    console.log("fetching messages for", username);
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          sentMessages: {
            include: {
              sender: true,
              receiver: true,
            },
            where: {
              OR: [
                { sender: { username: friendname } },
                { receiver: { username: friendname } },
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
          },
          receivedMessages: {
            include: {
              sender: true,
              receiver: true,
            },
            where: {
              OR: [
                { sender: { username: friendname } },
                { receiver: { username: friendname } },
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
          },
        },
      });
  
      if (user) {
        const messages = [...user.sentMessages, ...user.receivedMessages];
  
        // Sort messages by createdAt timestamp in descending order
        messages.sort((a, b) => b.createdAt - a.createdAt);
  
        return messages.slice(0, 10); // Retrieve the 10 latest messages
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  
    return [];
  }
  

// Create a new message
export async function create({ sender, receiver, content }) {
    try {
        await prisma.message.create({
        data: {
            content,
            sender: { connect: { username: sender } },
            receiver: { connect: { username: receiver } },
        },
        });
    } catch (error) {
        console.error("Error creating message:", error);
    }
}