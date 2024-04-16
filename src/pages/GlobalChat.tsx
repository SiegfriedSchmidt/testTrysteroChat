import {useRoom} from "../hooks/useRoom.tsx";
import {useEffect, useState} from "react";
import {MessageTextType, Peers} from "../types/chat.ts";
import styled from "styled-components";
import MessagesBox from "../components/MessagesBox.tsx";
import useUser from "../hooks/useUser.tsx";
import useUserData from "../hooks/useUserData.tsx";
import SendingBlock from "../components/SendingBlock.tsx";
import useRoomAction from "../hooks/useRoomAction.tsx";
import ChatBottomPanel from "../components/ChatBottomPanel.tsx";
import {globalRoomId} from "../utils/constants.ts";
import {User} from "../types/user.ts";
import {createMessage, getMessagesHashes, getMissingMessages, sortMessages} from "../utils/messagesUtils.ts";
import syncMessagesWithPeers from "../utils/syncMessagesWithPeers.ts";

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
  const [messages, setMessages] = useState<MessageTextType[]>([])
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
    setMessages([...messages, message as MessageTextType])
  })

  getMessagesRequest((hashes, peerId) => {
    sendPeersMessages(getMissingMessages(hashes as number[], messages))
  })

  async function onClickSyncMessages() {
    setLoading(true)
    const hashes = getMessagesHashes(messages)
    const newMessages = await syncMessagesWithPeers(peers, hashes, sendMessagesRequest, getPeersMessages)
    setMessages(sortMessages([...messages, ...newMessages]))
    setLoading(false)
  }

  function onClickSend(text: string) {
    const message: MessageTextType = createMessage(user.username, user.id, text, userData.htmlParse)
    setMessages([...messages, message])
    sendMessage(message)
  }

  return (
    <div style={{textAlign: "center"}}>
      <StyledDiv>
        <ChatBottomPanel peers={peers} Loading={Loading} onClickSyncMessages={onClickSyncMessages}/>
        <MessagesBox messages={messages}/>
        <SendingBlock onClickSend={onClickSend}/>
      </StyledDiv>
    </div>
  );
};

export default Main;