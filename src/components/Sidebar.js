"use client";

import { Sidebar } from "flowbite-react";
import FriendRequestModal from "./sidebaressentials/FriendRequestModal";
export default function MultiLevelDropdown(props) {
  return (
    <Sidebar className = "w-32">
      <Sidebar.Items>
        <Sidebar.ItemGroup className = "flex justify-center">
         
         
            <FriendRequestModal for_indox_session = {props.for_indox_session} ></FriendRequestModal>
        
          
         
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
