import React, { useContext, useEffect } from 'react'
import useSessionStorage from '../hooks/useSessionStorage'
import { useSocket } from './SocketProvider'
import { nanoid } from 'nanoid'

const GameContext = React.createContext()

export function useGameContext() {
    return useContext(GameContext)
}

//roomID, room users, isWaiting

export function GameProvider({ userId, createId, children }) {
    const [name, setName] = useSessionStorage('name', '')
    const [roomId, setRoomId] = useSessionStorage('room_id', '')
    const [roomUsers, setRoomUsers] = useSessionStorage('room_users', [])
    const socket = useSocket()

    function handleJoin(isJoin, roomIdInput) {
        var uid='';

        if (userId === "") {
            uid = nanoid()
            createId(uid)
        } else {
            uid= userId
        }

        if (isJoin) {
            // if (roomIdInput.length === 7) {
                socket.emit("join_room", { uid: uid, room: roomIdInput, username: name });
            // }

        } else {
            const newRoomId = nanoid(7)
            socket.emit("make_room", { uid: uid, room: newRoomId, username: name });
        }
    }

    useEffect(() => {
        if (socket == null) return

        socket.on('joinSuccess', (room) => {
            setRoomId(room)
        })

        socket.on('joinFailure', () => console.log('nooooo'))

        socket.on('roomUsers', users => {
            setRoomUsers(users)
        })

        // TODO: Fix
        return () => socket.off('receive-message')
    }, [socket, setRoomId, setRoomUsers])

    const value = {
        name,
        setName,
        handleJoin
    }

    return (
        <GameContext.Provider value={value}>
          {children}
        </GameContext.Provider>
      )
}
