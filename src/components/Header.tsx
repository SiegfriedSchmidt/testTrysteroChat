import React from 'react';
import StyledHeader from "../styles/Header.tsx";
import {Link} from "react-router-dom";
import Button from "./Button.tsx";
import logo from "../assets/logo.png";
import useUser from "../hooks/useUser.tsx";

const Header = () => {
  const {username, addUser} = useUser()

  function onClick() {
    const username = prompt('Set new username')
    if (username) {
      addUser({username: username})
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
        <Link to='/global_chat'><p>GlobalChat</p></Link>
      </nav>
      <nav>
        <Button onClick={onClick} $color="black">{username}</Button>
      </nav>
    </StyledHeader>
  );
};

export default Header;