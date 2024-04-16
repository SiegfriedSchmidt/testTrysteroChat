import React, {FC, KeyboardEvent, Ref} from 'react';
import more from "/more.png";
import send from "/send.svg";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    font-size: 15pt;
    padding: 10px;
    margin: 10px;
`

const StyledButton = styled.div`
    img {
        width: 40px;
        height: 40px;
    }
`

const StyledDivSend = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    justify-content: space-evenly;
    align-items: center;
`

interface SendingBlockProps {
  textRef: Ref<HTMLTextAreaElement>;
  onClick: () => void
}

const SendingBlock: FC<SendingBlockProps> = ({textRef, onClick}) => {
  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <StyledDivSend>
      <StyledButton><img src={more} alt="send"/></StyledButton>
      <StyledTextarea onKeyDown={keyDownHandler} rows={2} cols={30} ref={textRef} style={{}}/>
      <StyledButton onClick={onClick}><img src={send} alt="send"/></StyledButton>
    </StyledDivSend>
  );
};

export default SendingBlock;