import React from 'react';
import styled from "styled-components";
import HiddenParams from "../components/HiddenParams.tsx";
import useUserData from "../hooks/useUserData.tsx";


const StyledDiv = styled.div`
    padding: 1rem;
`

const StyledP = styled.p<{ $color: boolean }>`
    color: ${props => props.$color ? "red" : "#a1a1a1"};
    position: absolute;
    bottom: -7%;
    right: 3%;
`

const About = () => {
  const {userData, setUserData} = useUserData();

  function onClick() {
    setUserData({...userData, firefly: !userData.firefly})
  }

  return (
    <StyledDiv>
      {
        userData.firefly ? <h1>Council of 3 men, cheese and fucked came up with the idea for this site</h1> :
          <h1>Just about page, nothing interesting here...</h1>
      }

      <HiddenParams visible={userData.firefly}/>
      <StyledP $color={userData.firefly} onClick={onClick}>Firefly is the best btw</StyledP>
    </StyledDiv>
  )
}

export default About;