import Start from './components/Start'
import WaitRoom from './components/WaitRoom'
import useSessionStorage from './hooks/useSessionStorage';

function App() {
  const [id, setId] = useSessionStorage('user_id', '')

  return (
    id ? <WaitRoom id={id} /> : <Start/>
  );
}

export default App;
