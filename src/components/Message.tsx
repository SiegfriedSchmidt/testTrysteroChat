import {FC} from 'react';
import {MessageType} from "../types/chat.ts";
import styled from "styled-components";

interface MessageProps {
  message: MessageType
  me: boolean
}

const StyledMessage = styled.div`
    position: relative;
    margin: 4px;
    padding: 10px 45px 10px 10px;
    display: inline-block;
    border-radius: 10px 10px 10px 10px;
    color: black;
    font-size: 14pt;
    max-width: 80%;
    min-width: 30%;
    word-wrap: break-word;

    span {
        color: rgba(104, 108, 114, 0.75);
        padding: 4px;
        font-size: 9pt;
        position: absolute;
        bottom: 0;
        right: 0;
    }
`

const StyledDivLeft = styled.div`
    text-align: left;

    ${StyledMessage} {
        background-color: rgba(170, 169, 169, 0.5);
    }

    p {
        background-color: #ffffff;
        border-bottom-left-radius: 0;
    }
`
const StyledDivRight = styled.div`
    text-align: right;

    ${StyledMessage} {
        background-color: rgba(169, 225, 225, 0.5);
    }

    p {
        background-color: #EEFFDE;
        border-bottom-right-radius: 0;
    }
`

const DateOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false};
const Message: FC<MessageProps> = ({message, me}) => {
  const DivStyle = me ? StyledDivRight : StyledDivLeft

  const date = (new Date(message.time)).toLocaleTimeString('en-US', DateOptions)
  return (
    <DivStyle>
      <StyledMessage>{message.text}<span>{date}</span></StyledMessage>
    </DivStyle>
  )
}

export default Message;