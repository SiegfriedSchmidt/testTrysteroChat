import {useRoom} from "../hooks/useRoom.tsx";
import {useRef, useState, KeyboardEvent, useContext} from "react";
import {MessageType} from "../types/chat.ts";
import styled from "styled-components";
import send from "/send.svg"
import MessagesBox from "../components/MessagesBox.tsx";
import useUser from "../hooks/useUser.tsx";
import hashCode from "../utils/hash.ts";
import {UserDataContext} from "../context/UserDataContext.tsx";


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

const StyledDivSend = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    justify-content: space-evenly;
    align-items: center;
`

const StyledDivSyncMessages = styled.div`
    display: flex;
    justify-content: space-evenly;
`

type Peer = {
  username: string;
  sender_id: string;
}

const Main = () => {
  const {user} = useUser()
  const {userData} = useContext(UserDataContext)
  const {room} = useRoom(roomId, userData.protocol)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [peerCount, setPeerCount] = useState<number>(0)
  const [allPeers, setAllPeers] = useState<Peer[]>([])
  const [Loading, setLoading] = useState<boolean>(false)

  const [sendMessage, getMessage] = room.makeAction('message')
  const [sendPeersMessages, getPeersMessages] = room.makeAction('peermessage')
  const [sendMessageRequest, getMessageRequest] = room.makeAction('messagereq')
  const [sendUsernameRequest, getUsernameRequest] = room.makeAction('activereq')
  const [sendUsername, getUsername] = room.makeAction('username')

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

  function getUniqueMessages(messages: MessageType[]): MessageType[] {
    const uniqueHashes: number[] = [];
    return messages.filter(element => {
      const isDuplicate = uniqueHashes.includes(element.hash);
      if (!isDuplicate) {
        uniqueHashes.push(element.hash);
        return true;
      }
      return false;
    })
  }

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

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
  }

  function onClick() {
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
        <StyledDivSyncMessages>
          <h1>Online: {peerCount}</h1>
          <button disabled={Loading} onClick={onClickSyncMessages} style={{padding: '5px'}}>Sync messages</button>
          <button disabled={Loading} onClick={onClickGetUsernames} style={{padding: '5px'}}>Sync peers</button>
        </StyledDivSyncMessages>
        <MessagesBox messages={messages}/>
        <StyledDivSend>
          <StyledTextarea onKeyDown={keyDownHandler} rows={2} cols={30} ref={textareaRef} style={{}}/>
          <StyledButton onClick={onClick}><img src={send} alt="send"/></StyledButton>
        </StyledDivSend>
      </StyledDiv>
    </div>
  );
};

export default Main;