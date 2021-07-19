import Start from './components/Start'
import { GameProvider } from './contexts/GameProvider';
import { SocketProvider } from './contexts/SocketProvider';
import useSessionStorage from './hooks/useSessionStorage';

function App() {
  const [userId, setUserId] = useSessionStorage('user_id', '')

  return (
    <SocketProvider id={userId}>
      <GameProvider userId={userId} createId={setUserId}>
        <Start /> 
      </GameProvider>
    </SocketProvider>
  );
}

export default App;
