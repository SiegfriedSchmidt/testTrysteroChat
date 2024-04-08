import React, {FC, useEffect, useRef} from 'react';
import Message from "./Message.tsx";
import styled from "styled-components";
import {ChatMessageType} from "../types/chat.ts";

const StyledDivMessages = styled.div`
    padding: 4px;
    margin-top: 1rem;
    border: black solid 1px;
    border-radius: 7px;
    height: 74vh;
    overflow-x: hidden;
    position: relative;
`

interface MessageBoxProps {
  messages: ChatMessageType[];
}

const MessagesBox: FC<MessageBoxProps> = ({messages}) => {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight
  }, [messages?.length])

  return (
    <StyledDivMessages ref={messagesRef}>
      {messages.map((message, idx) =>
        <Message key={idx} message={message.message} me={message.me}/>
      )}
    </StyledDivMessages>
  );
};

export default MessagesBox;