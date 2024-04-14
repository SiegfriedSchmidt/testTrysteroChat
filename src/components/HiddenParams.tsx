import React, {FC} from 'react';
import styled from "styled-components";
import CheckboxWithLabel from "./CheckboxWithLabel.tsx";
import SelectWithLabel from "./SelectWithLabel.tsx";
import {Protocol, Protocols} from "../types/protocols.ts";
import useUserData from "../hooks/useUserData.tsx";

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
  const {userData, setUserData} = useUserData();

  function onChangeHtmlParse(val: boolean) {
    setUserData({...userData, html_parse: val})
  }

  function onChangeProtocolSelection(val: string) {
    setUserData({...userData, protocol: val as Protocol})
  }

  return (
    <StyledDiv $isOpen={visible}>
      <h3>Panel only for firefly enjoyers :)</h3>
      <CheckboxWithLabel checked={userData.html_parse} label='Parse html' onChange={onChangeHtmlParse}/>
      <SelectWithLabel label="Protocol" selection={Protocols} default_val={userData.protocol}
                       onChange={onChangeProtocolSelection}/>
    </StyledDiv>
  );
};

export default HiddenParams;