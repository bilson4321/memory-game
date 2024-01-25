import Game from "./components/Game";
import { GameContextProvider } from "./context/GameContext";

function App() {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
}

export default App;
