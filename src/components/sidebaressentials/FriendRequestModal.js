'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import FriendRequestModalServer from './FriendRequestModalServer';

export default function PopUpModal(prop) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  console.log(prop.for_indox_session.name);
  return (
    <>
      <Button onClick={() => {props.setOpenModal('pop-up'); servercall(prop.for_indox_session.name)} } className = "bg-blue-500">Indox</Button>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
           
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => props.setOpenModal(undefined)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

async function servercall(name){
    //call the function from FriendRequestModalServer.js
    console.log(name);
    const friendRequests = await FriendRequestModalServer(name);
    console.log(friendRequests);
}


