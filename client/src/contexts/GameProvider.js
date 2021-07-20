import React, { useState, useContext, useEffect } from 'react'
import useSessionStorage from '../hooks/useSessionStorage'
import { useSocket } from './SocketProvider'
import { nanoid } from 'nanoid'

const GameContext = React.createContext()

export function useGameContext() {
    return useContext(GameContext)
}

//roomID, room users, isWaiting

export function GameProvider({ userId, createId, children }) {
    const [screen, setScreen] = useState('start')
    const [name, setName] = useSessionStorage('name', '')
    const [roomId, setRoomId] = useSessionStorage('room_id', '')
    const [roomUsers ,setRoomUsers] = useSessionStorage('room_users', [])
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

        socket.on('joinSuccess', room => {
            setRoomId(room.room)
        })

        socket.on('joinFailure', () => console.log('nooooo'))

        socket.on('roomUsers', users => {
            setRoomUsers(users.users)
            setScreen('waiting')
        })

        // TODO: Fix
        //return () => socket.off('receive-message')
    }, [socket, setRoomId, setRoomUsers])

    function endGame() {
        socket.emit("leave_game", { uid: userId, room: roomId })
        sessionStorage.clear()
        setScreen('start')
    }

    const value = {
        name,
        roomId,
        setName,
        screen,
        roomUsers,
        handleJoin,
        endGame
    }

    return (
        <GameContext.Provider value={value}>
          {children}
        </GameContext.Provider>
      )
}
