import {FC, useContext} from 'react';
import {MessageType} from "../types/chat.ts";
import styled from "styled-components";
import {stringToColour} from "../utils/colorManip.ts";
import useUser from "../hooks/useUser.tsx";
import getUsernameWithID from "../utils/getUsernameWithID.ts";
import parse from 'html-react-parser';

interface MessageProps {
  message: MessageType
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

const StyledUsernameSpan = styled.span`
    padding: 3px;
    display: block;
    width: 100%;
    font-size: 10pt;
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
  const me = message.sender_id == user.id
  const DivStyle = me ? StyledDivRight : StyledDivLeft

  const {username_part, id_part} = getUsernameWithID(message.sender, message.sender_id)
  const date = (new Date(message.time)).toLocaleTimeString()
  return (
    <DivStyle>
      <StyledMessage>
        {me ?
          <></> :
          <StyledUsernameSpan><b
            style={{color: stringToColour(message.sender + message.sender_id)}}>{username_part}</b>{id_part}
          </StyledUsernameSpan>
        }
        {message.html_parse ? parse(message.text) : message.text}
        <StyledTimeSpan>{date}</StyledTimeSpan>
      </StyledMessage>
    </DivStyle>
  )
}

export default Message;