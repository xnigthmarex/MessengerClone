"use client";

import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { signOut } from "next-auth/react";
import AddFriendModel from "./Models/AddFriend/AddFriend";
import Request from "./Models/Request/Request";
export default function NavbarWithDropdown(props) {
  
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            alt="Flowbite React Logo"
            className="mr-3 h-6 sm:h-9"
            src="/favicon.ico"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Messenger
          </span>
        </Navbar.Brand>
       
        <div className="flex md:order-2">
          <div className="mx-4 flex-col ">
            <Request session = {props.session.name}></Request>
          </div>
          <div className="mr-4">
            <AddFriendModel session = {props.session.name} />
          </div>

          <Dropdown
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Signed In As</span>
              <span className="block truncate text-lg font-medium">
                {props.session.name.charAt(0).toUpperCase() +
                  props.session.name.slice(1)}
              </span>
            </Dropdown.Header>

            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <Navbar className="grid justify-center">
        <h1 className="text-2xl">Welcome to Messenger -</h1>
        <h1 className="text-2xl">
          {" "}
          {props.session.name.charAt(0).toUpperCase() +
            props.session.name.slice(1)}
        </h1>
      </Navbar>
    </>
  );
}
