import {joinRoom as joinRoomTorrent} from "trystero/torrent";
import {joinRoom as joinRoomNostr} from "trystero/nostr";
import {joinRoom as joinRoomMqtt} from "trystero/mqtt";
import {joinRoom as joinRoomIpfs} from "trystero/ipfs";
import {useEffect, useRef} from 'react'
import {Room, selfId} from "trystero";
import {Protocol} from "../types/protocols.ts";
import {appId} from "../utils/constants.ts";

function joinRoom(roomId: string, protocol: Protocol) {
  switch (protocol) {
    case "torrent":
      return joinRoomTorrent({appId}, roomId)
    case "nostr":
      return joinRoomNostr({appId}, roomId)
    case "mqtt":
      return joinRoomMqtt({appId}, roomId)
    case "ipfs":
      return joinRoomIpfs({appId}, roomId)
  }
}

export const useRoom = (roomId: string, protocol: Protocol): {
  room: Room,
  selfId: string
} => {
  const roomRef = useRef(joinRoom(roomId, protocol))

  useEffect(() => {
    roomRef.current = joinRoom(roomId, protocol)
    console.log('connected')

    function windowClosingHandler() {
      roomRef.current.leave()
    }

    window.addEventListener("beforeunload", windowClosingHandler)

    return () => {
      roomRef.current.leave()
      window.removeEventListener("beforeunload", windowClosingHandler)
    }
  }, [roomId, protocol])

  return {room: roomRef.current, selfId: selfId}
}