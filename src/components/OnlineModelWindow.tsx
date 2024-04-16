import React, {FC} from 'react';
import ModalWindow from "./ModalWindow.tsx";
import {Peers} from "../types/chat.ts";
import styled from "styled-components";
import UsernameSpan from "./UsernameSpan.tsx";

interface OnlineModalWindowProps {
  show: boolean
  setShow: (show: boolean) => void
  peers: Peers
}

const StyledOl = styled.ol`
    text-align: left;
    padding: 14px;

    li {
        font-size: 15pt;
    }

    li * {
        font-size: 15pt;
    }
`

const OnlineModelWindow: FC<OnlineModalWindowProps> = ({show, setShow, peers}) => {
  return (
    <ModalWindow show={show} setShow={setShow}>
      <h1>Online</h1>
      <StyledOl>
        {Object.values(peers).map((p, idx) => <li key={idx}><UsernameSpan sender={p.username} senderId={p.id}/></li>)}
      </StyledOl>
    </ModalWindow>
  );
};

export default OnlineModelWindow;