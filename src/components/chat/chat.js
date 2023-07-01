"use client";
import React, { useEffect, useState } from "react";
import socket from "@/server/socket/client-socket";
import { fetch, create } from "./serveractions";
import Message from "./message/Message";

export default function Chat(props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const messages = await fetch(props.user,props.friend);
        setMessages(messages);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, [props.friend]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: { username: props.user },
      receiver: { username: props.friend },
      content: e.target.message.value,
    };
    setMessages([...messages, newMessage]);
    const isDuplicate = messages.some(
      (message) => message.content === newMessage.content
    );
    if (!isDuplicate) {
      await create({
        sender: props.user,
        receiver: props.friend,
        content: e.target.message.value,
      });
      socket.emit("input", newMessage);
    }
    e.target.reset();
  };

  socket.on("update", (message) => {
    console.log(message.receiver.username)
    console.log(message.sender.username)
    if ( message.receiver.username === props.user) {
      setMessages([...messages, message]);
    }
  });
  
  
  return (
    <div className="relative overflow-y-scroll bg-gray-400 w-full h-[30rem] border-8 rounded-2xl">
      {messages.map((message) => (
        <Message
          key={message.id}
          username={message.sender.username}
          content={message.content}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0.5 w-full flex justify-center">
        <form onSubmit={onSubmitHandler}>
          <input type="text" id="message" className="md:w-96 w-48 rounded-lg" />
          <button className="bg-green-500 rounded-lg px-2">
            <svg
              className="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 10 16"
            >
              <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
