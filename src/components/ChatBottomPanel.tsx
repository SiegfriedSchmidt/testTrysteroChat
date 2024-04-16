import React, {FC} from 'react';
import styled from "styled-components";
import {Peers} from "../types/chat.ts";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`

interface ChatBottomPanelProps {
  peers: Peers
  Loading: boolean
  onClickSyncMessages: () => void
}

const ChatBottomPanel: FC<ChatBottomPanelProps> = ({peers, Loading, onClickSyncMessages}) => {
  return (
    <StyledDiv>
      <h1>Online: {Object.keys(peers).length}</h1>
      <button disabled={Loading} onClick={onClickSyncMessages} style={{padding: '5px'}}>Sync messages</button>
    </StyledDiv>
  );
};

export default ChatBottomPanel;