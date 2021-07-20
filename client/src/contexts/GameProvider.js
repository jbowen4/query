import React, { useState, useContext, useEffect } from 'react'
import useSessionStorage from '../hooks/useSessionStorage'
import { useSocket } from './SocketProvider'
import { nanoid, customAlphabet } from 'nanoid'

const nanoidCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789', 8)

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
            const newRoomId = nanoidCode()
            socket.emit("make_room", { uid: uid, room: newRoomId, username: name });
        }
    }

    function startGame() {
        if (roomUsers.length >= 3) {
            socket.emit("start_game", { room: roomId })
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

        socket.on('startGame', () => {
            setScreen('game')
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
        startGame,
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
