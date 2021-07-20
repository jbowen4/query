import useSessionStorage from '../hooks/useSessionStorage'
import { useGameContext } from '../contexts/GameProvider'
import { useHistory } from "react-router-dom";

const WaitRoom = () => {
    let history = useHistory();
    const { roomUsers, endGame } = useGameContext() 
    //const [roomUsers, ] = useSessionStorage('room_users', [])
    const [roomId, ] = useSessionStorage('room_id', '')

    const exit = () => {
        // TODO: Go back to start screen
        history.push('/')
        endGame()
    }
 
    return (
        <div className="container">
            <h2>Waiting...</h2>

            <h2>Code: {roomId}</h2>

            {roomUsers.map(user => (
                <h3 key={user.id}>{user.username}</h3>
            ))}

            <button>Start</button>
            <button onClick={() => exit()}>Exit</button>
        </div>
    )
}

export default WaitRoom
