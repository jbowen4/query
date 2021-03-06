import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'http://localhost:4000',
      { query: { id } }
    )
    setSocket(newSocket)

    // TODO: Close socket connection
    // When does useEffect end/close? 

    // return () => {
    //   console.log("closing socket")
    //   newSocket.close()
    // }
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}