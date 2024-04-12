import React from 'react';
import styled from "styled-components";
import ParticleImage from "../components/ParticleImage.tsx";
import logo from "/logo.png"

const StyledDiv = styled.div`
    text-align: center;
    padding: 1rem;
`

const Home = () => {
  return (
    <StyledDiv>
      {/*<h1>Just home page, nothing interesting here...</h1>*/}
      <ParticleImage imageUrl={logo} imageWidth={400} imageHeight={400} gap={5} pushD={25}/>
    </StyledDiv>
  );
};

export default Home;