"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiUser } from "react-icons/hi";
import AddFriendServer from "./AddFriendServer";
export default function PopUpModal(prop) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  //handle submit function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let session_username = prop.session
    let friend_username = e.target.username.value;
    AddFriendServer(session_username, friend_username).then((result) => {
      
      window.alert(result);
    });
  }
  return (
    <>
      <Button
        pill
        onClick={() => props.setOpenModal("pop-up")}
        gradientDuoTone="redToYellow"
      >
        <HiUser className="md:mr-1 h-5 w-5" />
        <h1 className="hidden md:block">AddFriend</h1>
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
          
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Enter Your Friends Username
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      
                      <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  
                 
                  <button  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ADD</button>

              </form>
          </div>
      </div>
  
        </Modal.Body>
      </Modal>
    </>
  );
}
