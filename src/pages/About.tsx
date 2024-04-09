import React, {useContext} from 'react';
import styled from "styled-components";
import {UserDataContext} from "../context/UserDataContext.tsx";
import HiddenParams from "../components/HiddenParams.tsx";


const StyledDiv = styled.div`
    padding: 1rem;
`

const StyledP = styled.p<{ $color: boolean }>`
    color: ${props => props.$color ? "red" : "#a1a1a1"};
    position: absolute;
    bottom: 1%;
    right: 3%;
`

const About = () => {
  const {userData, setUserData} = useContext(UserDataContext);

  function onClick() {
    setUserData({...userData, firefly: !userData.firefly})
  }

  return (
    <StyledDiv>
      <h1>Council of 3 men, cheese and fucked came up with the idea for this site</h1>
      <HiddenParams visible={userData.firefly}/>
      <StyledP $color={userData.firefly} onClick={onClick}>Firefly is the best btw</StyledP>
    </StyledDiv>
  )
}

export default About;