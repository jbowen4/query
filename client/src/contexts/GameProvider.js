import React, { useContext, useEffect } from 'react'
import useSessionStorage from '../hooks/useSessionStorage'
import { useSocket } from './SocketProvider'
import { nanoid } from 'nanoid'

const GameContext = React.createContext()

export function useGameContext() {
    return useContext(GameContext)
}

//roomID, room users, isWaiting

export function GameProvider({ createId, children }) {
    const [name, setName] = useSessionStorage('name', '')
    const [roomId, setRoomId] = useSessionStorage('room_id', '')
    const [roomUsers, setRoomUsers] = useSessionStorage('room_users', [])
    const socket = useSocket()

    function handleJoin(isJoin, roomIdInput) {
        // create new userId
        createId(nanoid())

        if (isJoin) {
            // if (roomIdInput.length === 7) {
                socket.emit("join_room", { room: roomIdInput, username: name });
            // }

        } else {
            const newRoomId = nanoid(7)
            console.log(newRoomId)
            console.log(name)
            socket.emit("make_room", { room: newRoomId, username: name });
        }
    }

    useEffect(() => {
        if (socket == null) return

        socket.on('joinSuccess', (room) => {
            console.log(room)
        })

        socket.on('joinFailure', () => console.log('nooooo'))

        socket.on('roomUsers', users => {
            console.log(users)
        })

        return () => socket.off('receive-message')
    }, [socket])

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
