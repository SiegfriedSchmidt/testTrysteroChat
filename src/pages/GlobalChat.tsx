import {useRoom} from "../hooks/useRoom.tsx";
import {useRef, useState, KeyboardEvent, useEffect, useMemo} from "react";
import {MessageType} from "../types/chat.ts";
import styled from "styled-components";
import MessagesBox from "../components/MessagesBox.tsx";
import useUser from "../hooks/useUser.tsx";
import hashCode from "../utils/hash.ts";
import getUniqueMessages from "../utils/getUniqueMessages.ts";
import useUserData from "../hooks/useUserData.tsx";
import SendingBlock from "../components/SendingBlock.tsx";
import useRoomAction from "../hooks/useRoomAction.tsx";
import ChatBottomPanel from "../components/ChatBottomPanel.tsx";


const roomId = 'kfwlakflwekflmvlfkleflaepqe'

const StyledDiv = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 1rem;
    background-color: whitesmoke;

    h1 {
        font-size: 15pt;
    }
`

type Peer = {
  username: string;
  sender_id: string;
}

const Main = () => {
  const {user} = useUser()
  const {userData} = useUserData()
  const {room} = useRoom(roomId, userData.protocol)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [peerCount, setPeerCount] = useState<number>(0)
  const [allPeers, setAllPeers] = useState<Peer[]>([])
  const [Loading, setLoading] = useState<boolean>(false)

  const [sendMessage, getMessage] = useRoomAction('message', room)
  const [sendPeersMessages, getPeersMessages] = useRoomAction('peermessage', room)
  const [sendMessageRequest, getMessageRequest] = useRoomAction('messagereq', room)
  const [sendUsernameRequest, getUsernameRequest] = useRoomAction('activereq', room)
  const [sendUsername, getUsername] = useRoomAction('username', room)

  useEffect(() => {
    room.onPeerJoin((peerId: string) => {
      setPeerCount(peerCount + 1)
    })

    room.onPeerLeave((peerId: string) => {
      setPeerCount(peerCount - 1)
    })

    getMessage((message, peer) => {
      setMessages([...messages, message as MessageType])
    })

    getMessageRequest((data, peer) => {
      sendPeersMessages(messages)
    })

    getUsernameRequest((data, peer) => {
      sendUsername({username: user.username, sender_id: user.id} as Peer)
    })
  }, [room]);

  function onClickSyncMessages() {
    setLoading(true)
    getPeersMessages((peers_messages, peer) => {
      setMessages((messages) => {
        const new_messages: MessageType[] = [...(peers_messages as MessageType[]), ...messages]
        const new_unique_messages = getUniqueMessages(new_messages)
        new_unique_messages.sort((lhs, rhs) => {
          return lhs.time < rhs.time ? -1 : 1
        })
        return new_unique_messages
      })
    })

    setTimeout(() => {
      getPeersMessages((peers_messages, peer) => {
      })
      setLoading(false)
    }, 5000)

    sendMessageRequest('')
  }

  function onClickGetUsernames() {
    setLoading(true)
    setAllPeers([])
    setPeerCount(0)
    getUsername((data, peer) => {
      setAllPeers((peers) => {
        const uniquePeers = [...peers, data as Peer].filter((value, index, array) => {
          return array.indexOf(value) === index;
        })
        setPeerCount(uniquePeers.length)
        return uniquePeers
      })
    })

    setTimeout(() => {
      getUsername((username, peer) => {
      })
      setLoading(false)
    }, 5000)

    sendUsernameRequest('')
  }

  function CreateMessage(sender: string, sender_id: string, text: string, html_parse: boolean): MessageType {
    const newMessage = {sender, text, sender_id, html_parse, time: (new Date()).getTime()}
    return {...newMessage, hash: hashCode(JSON.stringify(newMessage))}
  }

  function onClickSend() {
    if (textareaRef.current?.value) {
      const message: MessageType = CreateMessage(user.username, user.id, textareaRef.current.value, userData.html_parse)
      setMessages([...messages, message])
      sendMessage(message)
      textareaRef.current.value = ''
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      <StyledDiv>
        <ChatBottomPanel peerCount={peerCount} Loading={Loading} onClickSyncMessages={onClickSyncMessages}
                         onClickGetUsernames={onClickGetUsernames}/>
        <MessagesBox messages={messages}/>
        <SendingBlock textRef={textareaRef} onClick={onClickSend}/>
      </StyledDiv>
    </div>
  );
};

export default Main;