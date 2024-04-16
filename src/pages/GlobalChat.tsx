import {useRoom} from "../hooks/useRoom.tsx";
import {useEffect, useRef, useState,} from "react";
import {MessageType, Peers} from "../types/chat.ts";
import styled from "styled-components";
import MessagesBox from "../components/MessagesBox.tsx";
import useUser from "../hooks/useUser.tsx";
import getUniqueMessages from "../utils/getUniqueMessages.ts";
import useUserData from "../hooks/useUserData.tsx";
import SendingBlock from "../components/SendingBlock.tsx";
import useRoomAction from "../hooks/useRoomAction.tsx";
import ChatBottomPanel from "../components/ChatBottomPanel.tsx";
import {globalRoomId} from "../utils/constants.ts";
import {User} from "../types/user.ts";
import {createMessage, getMessagesHashes, sortMessages} from "../utils/messagesUtils.ts";
import {DataPayload} from "trystero";

const StyledDiv = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 1rem;
    background-color: whitesmoke;

    h1 {
        font-size: 15pt;
    }
`

const Main = () => {
  const {user} = useUser()
  const {userData} = useUserData()
  const {room} = useRoom(globalRoomId, userData.protocol)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [peers, setPeers] = useState<Peers>({})
  const [Loading, setLoading] = useState<boolean>(false)

  const [sendMessage, getMessage] = useRoomAction('message', room)
  const [sendPeersMessages, getPeersMessages] = useRoomAction('peermessage', room)
  const [sendMessagesRequest, getMessagesRequest] = useRoomAction('reqmessage', room)
  const [sendUsername, getUsername] = useRoomAction('username', room)

  useEffect(() => {
    sendUsername(user)
  }, [room]);

  room.onPeerJoin((peerId: string) => {
    sendUsername(user, peerId)
  })

  room.onPeerLeave((peerId: string) => {
    const state = {...peers}
    delete state[peerId]
    setPeers(state)
  })

  getUsername((data, peerId) => {
    const state = {...peers}
    state[peerId] = data as User
    setPeers(state)
  })

  getMessage((message, peerId) => {
    setMessages([...messages, message as MessageType])
  })

  getMessagesRequest((hashes, peerId) => {
    console.log(hashes)
  })

  getPeersMessages((peers_messages, peerId) => {
    setMessages((messages) => {
      return sortMessages([...peers_messages as MessageType[], ...messages])
    })
  })

  function onClickSyncMessages() {
    sendMessagesRequest(getMessagesHashes(messages))
  }

  function onClickSend() {
    if (textareaRef.current?.value) {
      const message: MessageType = createMessage(user.username, user.id, textareaRef.current.value, userData.html_parse)
      setMessages([...messages, message])
      sendMessage(message)
      textareaRef.current.value = ''
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      <StyledDiv>
        <ChatBottomPanel peers={peers} Loading={Loading} onClickSyncMessages={onClickSyncMessages}/>
        <MessagesBox messages={messages}/>
        <SendingBlock textRef={textareaRef} onClick={onClickSend}/>
      </StyledDiv>
    </div>
  );
};

export default Main;