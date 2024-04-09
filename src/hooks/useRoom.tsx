import {joinRoom as joinRoomTorrent} from "trystero/torrent";
import {joinRoom as joinRoomNostr} from "trystero/nostr";
import {joinRoom as joinRoomMqtt} from "trystero/mqtt";
import {joinRoom as joinRoomIpfs} from "trystero/ipfs";
import {useEffect, useRef} from 'react'
import {BaseRoomConfig, Room, selfId} from "trystero";
import {Protocol} from "../types/protocols.ts";

function joinRoom(protocol: Protocol) {
  switch (protocol) {
    case "torrent":
      return joinRoomTorrent
    case "nostr":
      return joinRoomNostr
    case "mqtt":
      return joinRoomMqtt
    case "ipfs":
      return joinRoomIpfs
  }
}

export const useRoom = (roomConfig: BaseRoomConfig, roomId: string, protocol: Protocol): {
  room: Room,
  selfId: string
} => {
  const roomRef = useRef(joinRoom(protocol)(roomConfig, roomId))

  useEffect(() => {
    console.log('connected')
    roomRef.current = joinRoom(protocol)(roomConfig, roomId)
    return () => roomRef.current.leave()
  }, [roomConfig, roomId, protocol])

  return {room: roomRef.current, selfId: selfId}
}