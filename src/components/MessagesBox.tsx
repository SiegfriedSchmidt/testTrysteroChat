import React, {FC, useEffect, useRef} from 'react';
import Message from "./Message.tsx";
import styled from "styled-components";
import {MessageAllType} from "../types/chat.ts";

const StyledDivMessages = styled.div`
    padding: 8px;
    margin-top: 1rem;
    -webkit-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
    border-radius: 5px;
    height: 74vh;
    overflow-x: auto;
    position: relative;
`

interface MessageBoxProps {
  messages: MessageAllType[];
}

const MessagesBox: FC<MessageBoxProps> = ({messages}) => {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight
  }, [messages?.length])

  return (
    <StyledDivMessages ref={messagesRef}>
      {messages.map((message, idx) =>
        <Message key={idx} message={message}/>
      )}
    </StyledDivMessages>
  );
};

export default MessagesBox;