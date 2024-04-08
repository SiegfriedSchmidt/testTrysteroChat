import React from 'react';
import StyledHeader from "../styles/Header.tsx";
import {Link} from "react-router-dom";
import Button from "./Button.tsx";
import logo from "../assets/logo.png";

const Header = () => {
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
        <Button $color="black">Unknown</Button>
      </nav>
    </StyledHeader>
  );
};

export default Header;