import Start from './components/Start'
import WaitRoom from './components/WaitRoom'
import useSessionStorage from './hooks/useSessionStorage';

function App() {
  const [id, setId] = useSessionStorage('id', '')

  return (
    id ? <WaitRoom id={id} /> : <Start/>
  );
}

export default App;
