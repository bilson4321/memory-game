import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { shuffle } from "../utils/array";
import Card from "./Card";
import { allCardValues } from "../constants/card";
import { GameContext } from "../context/GameContext";

const Game = () => {
  const { gameTimer, moves, setMoves, setGameCompleted } =
    useContext(GameContext);
  const [cards] = useState<string[]>(
    shuffle(allCardValues.concat(allCardValues))
  );
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);

  const flipTimeOut = useRef<ReturnType<typeof setTimeout>>();

  const checkCompletion = useCallback(() => {
    if (Object.keys(clearedCards).length === cards.length) {
      return true;
    }
  }, [cards.length, clearedCards]);

  useEffect(() => {
    if (checkCompletion()) {
      setGameCompleted(true);
    }
  }, [checkCompletion, setGameCompleted]);

  const evaluate = useCallback(() => {
    const [first, second] = openCards;
    if (cards[first] === cards[second]) {
      setClearedCards((prev) => [...prev, first, second]);
      setOpenCards([]);
      return;
    }

    flipTimeOut.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  }, [cards, openCards]);

  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((prev) => prev + 1);
    } else {
      clearTimeout(flipTimeOut.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(() => evaluate(), 300);
    }
  }, [evaluate, openCards]);

  const checkIfCardIsFlipped = (index: number) => {
    return openCards.includes(index) || clearedCards.includes(index);
  };

  const checkIfCardIsInactive = (index: number) => {
    return clearedCards.includes(cards.indexOf(cards[index]));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-center my-4">
          <h1 className="text-5xl">Memory Game</h1>
        </div>
        <div className="flex flex-row justify-between my-2 px-2">
          <p>Timer: {gameTimer}</p>
          <p>Moves: {moves}</p>
        </div>
        <div className="container px-2 lg:px-10 ">
          <div className="grid grid-cols-4 gap-4 justify-center items-stretch">
            {cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  title={card}
                  isInactive={checkIfCardIsInactive(index)}
                  isFlipped={checkIfCardIsFlipped(index)}
                  onClick={() => handleCardClick(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
