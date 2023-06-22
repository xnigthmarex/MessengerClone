"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import {GetReceivedFriendRequests} from "./FriendRequestModalServer";

export default function PopUpModal(prop) {
  console.log(prop.session.name);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [Friend, setFriend] = useState([]);
  const handleSubmit = async () => {
    console.log("starting");
    setFriend(await GetReceivedFriendRequests(prop.session.name));
    console.log(Friend);
  };


  
  return (
    <>
      <Button
        onClick={() => {
          props.setOpenModal("pop-up");
          handleSubmit();
        }}
        className="bg-blue-500"
      >
        Requests
      </Button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="">
              {Friend.map((friend) => (
                <div key={friend.senderId} className = "flex justify-between">
                  <h1 className="my-2">{friend.senderUsername}</h1>
                 <div className = "flex m-2">
                  <Button color="success">YES</Button>
                  <Button color="failure">NO</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
