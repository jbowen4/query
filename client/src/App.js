import Start from './components/Start'
import WaitRoom from './components/WaitRoom'
import Game from './components/Game'
import { GameProvider } from './contexts/GameProvider';
import { SocketProvider } from './contexts/SocketProvider';
import useSessionStorage from './hooks/useSessionStorage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useSessionStorage('user_id', '')

  return (
    <SocketProvider id={userId}>
      <GameProvider userId={userId} createId={setUserId}>
        <Router>
          <Switch>
            <Route exact path="/"><Start/></Route>
            <Route path="/waiting"><WaitRoom/></Route>
            <Route path="/game"><Game/></Route>
          </Switch>
        </Router>
      </GameProvider>
    </SocketProvider>
  );
}

export default App;
