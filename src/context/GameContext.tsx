// Context for the game timer, score, and game state

import { createContext, useEffect, useState } from "react";
import Modal from "../components/Modal";

export const GameContext = createContext({
  gameTimer: 0,
  moves: 0,
  setMoves: {} as React.Dispatch<React.SetStateAction<number>>,
  setGameCompleted: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

interface GameContextProviderProps {
  children: React.ReactNode;
}
export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [gameTimer, setGameTimer] = useState(60);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (gameTimer > 0 && !gameOver && !gameCompleted) {
        setGameTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timerInterval);
        setGameOver(true);
        if (moves != 0) {
          const timeBasedScore = gameTimer + (50 - moves);
          setScore(timeBasedScore);
        } else {
          setScore(0);
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameCompleted, gameOver, gameTimer, moves]);

  return (
    <GameContext.Provider
      value={{ gameTimer, moves, setMoves, setGameCompleted }}
    >
      {children}
      <Modal open={gameOver} onClose={() => setGameOver(false)}>
        <p className="text-xl">{score}</p>
        <div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      </Modal>
    </GameContext.Provider>
  );
};
