import {FC} from 'react';
import {MessageTextType} from "../types/chat.ts";
import styled from "styled-components";
import useUser from "../hooks/useUser.tsx";
import parse from 'html-react-parser';
import UsernameSpan from "./UsernameSpan.tsx";

interface MessageProps {
  message: MessageTextType
}

const StyledMessage = styled.div`
    position: relative;
    margin: 4px;
    padding: 5px 10px 18px 10px;
    //padding: 10px 45px 10px 10px;
    display: inline-block;
    border-radius: 10px 10px 10px 10px;
    color: black;
    font-size: 14pt;
    min-width: 30%;
    word-wrap: break-word;
    -webkit-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
`

const StyledTimeSpan = styled.span`
    color: rgba(104, 108, 114, 0.75);
    padding: 4px;
    padding-right: 6px;
    padding-top: 6px;
    font-size: 9pt;
    position: absolute;
    bottom: 0;
    right: 0;
`

const StyledDivLeft = styled.div`
    text-align: left;

    ${StyledMessage} {
        background-color: rgba(170, 169, 169, 0.5);
        border-bottom-left-radius: 0;
    }
`
const StyledDivRight = styled.div`
    text-align: right;

    ${StyledMessage} {
        background-color: rgba(169, 225, 225, 0.5);
        border-bottom-right-radius: 0;
    }
`

// const DateOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false};
const Message: FC<MessageProps> = ({message}) => {
  const {user} = useUser()
  const me = message.senderId == user.id
  const DivStyle = me ? StyledDivRight : StyledDivLeft
  const date = (new Date(message.time)).toLocaleTimeString('RU-ru')

  return (
    <DivStyle>
      <StyledMessage>
        {me ? <></> : <UsernameSpan sender={message.sender} senderId={message.senderId}/>}
        {message.htmlParse ? parse(message.text) : message.text}
        <StyledTimeSpan>{date}</StyledTimeSpan>
      </StyledMessage>
    </DivStyle>
  )
}

export default Message;