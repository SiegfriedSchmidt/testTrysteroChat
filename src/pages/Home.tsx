import React from 'react';
import styled from "styled-components";
import ParticleImage from "../components/ParticleImage.tsx";
import firefly from "/firefly.png"

const StyledDiv = styled.div`
    text-align: center;
    padding: 1rem;
`

const Home = () => {
  return (
    <StyledDiv>
      {/*<h1>Just home page, nothing interesting here...</h1>*/}
      <ParticleImage width={380} height={700} imageUrl={firefly} imageWidth={357} imageHeight={698} gap={3} pushD={25}/>
    </StyledDiv>
  );
};

export default Home;