import React, {ChangeEvent, FC, KeyboardEvent, useRef} from 'react';
import more from "/more.png";
import send from "/send.svg";
import styled from "styled-components";
import {MessageContentType} from "../types/chat.ts";

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

const StyledInput = styled.input`
    display: none;
`

const StyledDivSend = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    justify-content: space-evenly;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
    }
`

interface SendingBlockProps {
  onClickSend: (text: string) => void
  onClickFile: (file: Blob, filename: MessageContentType) => void
}

const SendingBlock: FC<SendingBlockProps> = ({onClickSend, onClickFile}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
  }

  function onClick() {
    if (textareaRef.current?.value) {
      onClickSend(textareaRef.current.value)
      textareaRef.current.value = ''
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const type: MessageContentType = e.target.files[0].type.slice(0, 5) === "image" ? "image" : "video"
      onClickFile(e.target.files[0], type)
    }
  }

  return (
    <StyledDivSend>
      <label htmlFor="file-input">
        <img src={more} alt="more"/>
      </label>
      <StyledInput type="file" id="file-input" onChange={onChange}></StyledInput>
      <StyledTextarea onKeyDown={keyDownHandler} rows={2} cols={30} ref={textareaRef}/>
      <StyledButton onClick={onClick}><img src={send} alt="send"/></StyledButton>
    </StyledDivSend>
  );
};

export default SendingBlock;