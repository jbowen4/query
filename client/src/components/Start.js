import useSessionStorage from '../hooks/useSessionStorage';

const Start = () => {
    const [name, setName] = useSessionStorage('name', '')

    return (
        <div>
            <h1>Query</h1>
            <p>A game to play with your friends.</p>
            <label htmlFor="name">First Name</label>
            <input 
                id="name" 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button>Start Game</button>
            <button>Join Game</button>
        </div>
    )
}

export default Start
