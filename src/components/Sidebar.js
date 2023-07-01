"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { getAcceptedFriendRequests } from "@/components/serveractions";
import Chat from "@/components/chat/chat";
export function SideBar(props) {
  const [acceptedFriendRequests, setAcceptedFriendRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [chat, setChat] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const usernames = await getAcceptedFriendRequests(props.session);
        setAcceptedFriendRequests(usernames);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  function handleButtonClick(friendName) {
    setSelectedFriend(friendName);
    setChat(friendName);
    console.log("Button clicked for friend:", friendName);
  }

  return (
    <div className="flex">
      <Sidebar className="w-[6rem] h-[30.5rem]">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {acceptedFriendRequests.map((friendName, index) => (
              <Sidebar.Item key={index}>
                <button
                  onClick={() => handleButtonClick(friendName)}
                  className={`${
                    friendName === selectedFriend
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  } px-4 py-2 rounded-lg`}
                >
                  <h1>{friendName}</h1>
                </button>
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    {chat ? (<Chat friend = {chat} user = {props.session.name} ></Chat>):(<div></div>)}
    </div>
  );
}
