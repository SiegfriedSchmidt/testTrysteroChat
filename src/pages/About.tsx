import React from 'react';
import styled from "styled-components";


const StyledDiv = styled.div`
    padding: 1rem;
`

const StyledP = styled.p`
    color: #a1a1a1;
    position: absolute;
    bottom: 1%;
    right: 3%;
`

const About = () => {
  return (
    <StyledDiv>
      <h1>Council of 3 men, cheese and fucked came up with the idea for this site</h1>
      <StyledP>Firefly is the best btw</StyledP>
    </StyledDiv>
  )
}

export default About;