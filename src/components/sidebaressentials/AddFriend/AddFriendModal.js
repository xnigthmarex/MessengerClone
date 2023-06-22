"use client";

import { Button, Modal ,Label, TextInput, Checkbox} from "flowbite-react";
import { useState ,useRef } from "react";
import AddFriendRequestModalServer from "./AddFriendModalServer";

export default function PopUpModal(prop) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const inputRef = useRef(null);
  const handleSubmit = async () => {
    const name = inputRef.current.value;
   
    const friendRequests = await AddFriendRequestModalServer(prop.session.name,name);

    console.log(name);
  }
  return (
    <>
      <Button onClick={() => props.setOpenModal("pop-up")}>+ Add Friend</Button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>ADD FRIENDS</Modal.Header>
        <Modal.Body>
          <div className = "flex max-w-md flex-col gap-4">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Friends Username" />
            </div>
            <TextInput
              id="name"
              placeholder="aryan"
              required
              type="text"
              ref={inputRef}
            />
         
          
          
          <Button type="submit" onClick = {handleSubmit}>Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
  
}
