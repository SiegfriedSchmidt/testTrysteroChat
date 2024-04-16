import React, {FC, useState} from 'react';
import styled from "styled-components";
import {Peers} from "../types/chat.ts";
import OnlineModelWindow from "./OnlineModelWindow.tsx";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;

    progress {
        margin-top: 1rem;
        flex-basis: 80%;
    }
`

interface ChatBottomPanelProps {
  peers: Peers
  Loading: boolean
  fileLoading: number
  onClickSyncMessages: () => void
}

const ChatBottomPanel: FC<ChatBottomPanelProps> = ({peers, Loading, fileLoading, onClickSyncMessages}) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  function onClickOnline() {
    setShowModal(!showModal)
  }

  return (
    <StyledDiv>
      <OnlineModelWindow peers={peers} show={showModal} setShow={setShowModal}/>
      <h1 onClick={onClickOnline}>Online: {Object.keys(peers).length}</h1>
      <button disabled={Loading} onClick={onClickSyncMessages} style={{padding: '5px'}}>Sync messages</button>
      {Loading ? <progress max="100" value={fileLoading}></progress> : <></>}
    </StyledDiv>
  );
};

export default ChatBottomPanel;