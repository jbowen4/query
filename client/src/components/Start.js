import { useState } from 'react'
import useSessionStorage from '../hooks/useSessionStorage';

const Start = () => {
    const [isJoin, setIsJoin] = useState(false)
    const [code, setCode] = useState('')
    const [name, setName] = useSessionStorage('name', '')

    return (
        <div className="container">
            <h1 className="title">Query</h1>
            <p>A game to play with your friends.</p>
            <input 
                id="name" 
                type="text"
                value={name}
                placeholder="First Name"
                onChange={e => setName(e.target.value)}
            />
            <input 
                id="code" 
                type="text"
                value={code}
                disabled={!isJoin}
                placeholder="Game Code"
                onChange={e => {
                    if (isJoin) setCode({code: e.target.value}
                )}}
            />
            <div class="mode-container">
                <button 
                    className={`${isJoin ? '' : 'selected'} mode-btn`}
                    onClick={() => setIsJoin(!isJoin)}>
                    Start Game
                </button>
                <button 
                    className={`${isJoin ? 'selected' : ''} mode-btn`}
                    onClick={() => setIsJoin(!isJoin)}>
                    Join Game
                </button>
            </div>
            <button class="submit">Go</button>
        </div>
    )
}

export default Start
