import { useState, useEffect } from 'react'
import useSessionStorage from '../hooks/useSessionStorage';
import { useGameContext } from '../contexts/GameProvider';

const Start = () => {
    const { name, setName, handleJoin } = useGameContext() 

    const [isJoin, setIsJoin] = useState(false)
    const [code, setCode] = useState('')

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
                    if (isJoin) setCode(e.target.value)}}
            />
            <div className="mode-container">
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
            <button 
                className="submit" 
                onClick={() => handleJoin(isJoin, code)}>Go</button>
        </div>
    )
}

export default Start
