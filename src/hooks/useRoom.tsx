import {joinRoom as joinRoomTorrent} from "trystero/torrent";
import {joinRoom as joinRoomNostr} from "trystero/nostr";
import {joinRoom as joinRoomMqtt} from "trystero/mqtt";
import {joinRoom as joinRoomIpfs} from "trystero/ipfs";
import {joinRoom as joinRoomFirebase} from "trystero/firebase";
import {useEffect, useRef} from 'react'
import {Room, selfId} from "trystero";
import {Protocol} from "../types/protocols.ts";

function joinRoom(roomId: string, protocol: Protocol) {
  switch (protocol) {
    case "torrent":
      return joinRoomTorrent({appId: 'ewklqkge'}, roomId)
    case "nostr":
      return joinRoomNostr({appId: 'ewklqkge'}, roomId)
    case "mqtt":
      return joinRoomMqtt({appId: 'ewklqkge'}, roomId)
    case "ipfs":
      return joinRoomIpfs({appId: 'ewklqkge'}, roomId)
    case "firebase":
      return joinRoomFirebase({appId: "https://kun-chat-4387b-default-rtdb.europe-west1.firebasedatabase.app/"}, roomId)
  }
}

export const useRoom = (roomId: string, protocol: Protocol): {
  room: Room,
  selfId: string
} => {
  const roomRef = useRef(joinRoom(roomId, protocol))

  useEffect(() => {
    console.log('connected')
    roomRef.current = joinRoom(roomId, protocol)
    return () => roomRef.current.leave()
  }, [roomId, protocol])

  return {room: roomRef.current, selfId: selfId}
}