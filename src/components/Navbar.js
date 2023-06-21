'use client';

import { Dropdown, Navbar , Avatar} from 'flowbite-react';
import { signOut } from 'next-auth/react';

export default function NavbarWithDropdown(props) {
  
  return (
    <Navbar
      fluid
      rounded
    >
      
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
        >
          <Dropdown.Header>
          <span className="block text-lg">
            Signed in as
                        </span>
            
            <span className="block text-lg">
            {props.session.name.charAt(0).toUpperCase() + props.session.name.slice(1)}
            </span>
            
          </Dropdown.Header>
         
          <Dropdown.Item onClick = {signOut}>
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"
        >
          <h1 className = "text-black text-2xl">WELCOME TO MESSENGER {props.session.name.toUpperCase()}</h1>

        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


