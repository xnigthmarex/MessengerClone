import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiBell } from "react-icons/hi";
import {
  fetchFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
} from "./serveractions";

export default function PopUpModal(prop) {
  const [openModal, setOpenModal] = useState();
  const [friendRequests, setFriendRequests] = useState([]);
  const props = { openModal, setOpenModal };

  useEffect(() => {
    async function fetchData() {
      const requests = await fetchFriendRequests(prop.session);
      setFriendRequests(requests);
    }

    fetchData();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);

      // Refresh friend requests after accepting the request
      const requests = await fetchFriendRequests(prop.session);
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await declineFriendRequest(requestId);

      // Refresh friend requests after declining the request
      const requests = await fetchFriendRequests(prop.session);
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  return (
    <>
      <Button
        pill
        onClick={() => props.setOpenModal("pop-up")}
        gradientDuoTone="pinkToOrange"
      >
        <HiBell className="md:mr-1 h-5 w-5" />
        <h1 className="hidden md:block">Request</h1>
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
            <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Request Received
            </h1>
            <ul>
              {friendRequests.map((request) => (
                <li key={request.id} className = "flex justify-between items-center">
                  <p>{request.sender.username} </p>
                  <div className = "flex">
                  <Button onClick={() => handleAcceptRequest(request.id)}>
                    Accept
                  </Button>
                  <Button onClick={() => handleDeclineRequest(request.id)}>
                    Decline
                  </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
