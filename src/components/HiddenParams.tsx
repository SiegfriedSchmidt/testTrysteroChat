import React, {FC, useContext} from 'react';
import styled from "styled-components";
import CheckboxWithLabel from "./CheckboxWithLabel.tsx";
import {UserDataContext} from "../context/UserDataContext.tsx";

const StyledDiv = styled.div<{ $isOpen: boolean }>`
    opacity: ${props => props.$isOpen ? "1" : "0"};
    visibility: ${props => props.$isOpen ? "visible" : "hidden"};
    transition: all .4s;
    padding: 10px;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    border: black solid 2px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`

interface HiddenParamsProps {
  visible: boolean;
}

const HiddenParams: FC<HiddenParamsProps> = ({visible}) => {
  const {userData, setUserData} = useContext(UserDataContext);

  function onChangeHtmlParse(val: boolean) {
    setUserData({...userData, html_parse: val})
  }

  return (
    <StyledDiv $isOpen={visible}>
      <h3>Panel only for firefly enjoyers :)</h3>
      <CheckboxWithLabel checked={userData.html_parse} label='Parse html' onChange={onChangeHtmlParse}/>
    </StyledDiv>
  );
};

export default HiddenParams;