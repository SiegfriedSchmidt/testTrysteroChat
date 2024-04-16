import React, {FC} from 'react';
import styled from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`

interface ChatBottomPanelProps {
  peerCount: number
  Loading: boolean
  onClickSyncMessages: () => void
  onClickGetUsernames: () => void
}

const ChatBottomPanel: FC<ChatBottomPanelProps> = ({peerCount, Loading, onClickSyncMessages, onClickGetUsernames}) => {
  return (
    <StyledDiv>
      <h1>Online: {peerCount}</h1>
      <button disabled={Loading} onClick={onClickSyncMessages} style={{padding: '5px'}}>Sync messages</button>
      <button disabled={Loading} onClick={onClickGetUsernames} style={{padding: '5px'}}>Sync peers</button>
    </StyledDiv>
  );
};

export default ChatBottomPanel;