import React from 'react';
import StyledHeader from "../styles/Header.tsx";
import {Link} from "react-router-dom";
import Button from "./Button.tsx";

const Header = () => {
  return (
    <StyledHeader>
      <Link to='/'>
        <p>Home</p>
      </Link>
      <nav>
					<p>Hello, <strong>"Unknown"</strong></p>
					<Button $color="black">Change name</Button>
				</nav>
    </StyledHeader>
  );
};

export default Header;