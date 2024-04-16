import React, {FC} from 'react';
import {stringToColour} from "../utils/colorManip.ts";
import styled from "styled-components";
import {MessageTextType} from "../types/chat.ts";
import getUsernameWithID from "../utils/getUsernameWithID.ts";

const StyledUsernameSpan = styled.span`
    padding: 3px;
    display: block;
    width: 100%;
    font-size: 10pt;
`

interface UsernameSpanProps {
  sender: string
  senderId: string
}

const UsernameSpan: FC<UsernameSpanProps> = ({sender, senderId}) => {
  const {username_part, id_part} = getUsernameWithID(sender, senderId)
  return (
    <StyledUsernameSpan>
      <b style={{color: stringToColour(sender + senderId)}}>{username_part}</b>{id_part}
    </StyledUsernameSpan>
  );
};

export default UsernameSpan;