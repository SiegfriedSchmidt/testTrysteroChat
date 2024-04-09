import React from 'react';
import StyledHeader from "../styles/Header.tsx";
import {Link} from "react-router-dom";
import Button from "./Button.tsx";
import logo from "/logo.png";
import useUser from "../hooks/useUser.tsx";
import getUsernameWithID from "../utils/getUsernameWithID.ts";

const Header = () => {
  const {user, addUser} = useUser()
  const {username_part, id_part} = getUsernameWithID(user.username, user.id)

  function onClick() {
    const username = prompt('Set new username', user.username)
    if (username) {
      addUser(username)
    }
  }

  return (
    <StyledHeader>
      <Link to='/'>
        <img src={logo} alt='logo' width={40} height={40}/>
      </Link>
      <nav>
        <Link to='/about'><p>About</p></Link>
      </nav>
      <nav>
        <Link to='/global_chat'><p>Global</p></Link>
      </nav>
      <nav>
        <div>
          <Button onClick={onClick} $color="black">{username_part}</Button>
        <p>{id_part}</p>
        </div>
      </nav>
    </StyledHeader>
  );
};

export default Header;