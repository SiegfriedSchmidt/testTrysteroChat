import React, {useContext} from 'react';
import styled from "styled-components";
import ParticleImage from "../components/ParticleImage.tsx";
import {UserDataContext} from "../context/UserDataContext.tsx";
import firefly from "/firefly.png"
import logo from "/logo.png"


const StyledDiv = styled.div`
    text-align: center;
    padding: 1rem;
`

const Home = () => {
  const {userData} = useContext(UserDataContext);

  return (
    <StyledDiv>
      {/*<h1>Just home page, nothing interesting here...</h1>*/}
      {
        userData.firefly ?
          <ParticleImage width={380} height={700} imageUrl={firefly} imageWidth={357} imageHeight={698} gap={3}
                         pushD={25}/>
          : <ParticleImage width={380} height={700} imageUrl={logo} imageWidth={256} imageHeight={256} gap={3}
                           pushD={25}/>
      }

    </StyledDiv>
  );
};

export default Home;