import { EmptyWord } from "./EmptyWord/EmptyWord";
import {
  qwertyLetterRowOne,
  qwertyLetterRowTwo,
  qwertyLetterRowThree,
} from "./data/qwertyRows";
import { KbdButton } from "./KbdButton/KbdButton";

import { fiveLetterWords } from "./data/fiveLetterEnglishWords";

import { useState } from "react";

import "./App.css";
import { useRef } from "react";
import { MixedWord } from "./MixedWord/MixedWord";

function App() {
  type UserStringObject = {
    idx: number;
    str: string;
    color: string;
  };

  const wordRef = useRef(
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  );
  const turns = 6;
  const wordLength = 5;
  const turn = useRef(0);
  const valueRef = useRef("");
  console.log(fiveLetterWords.length, wordRef.current);

  const [winner, setWinner] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);
  const [userStringObjectArray, setUserStringObjectArray] = useState<
    UserStringObject[]
  >([{ idx: 0, str: "", color: "default" }]);
  const [previousTurnArray, setPreviousTurnArray] = useState<
    UserStringObject[][]
  >([]);
  const previousTurnLetters: string[] = [];
  previousTurnArray.forEach((turn) =>
    turn.forEach((letter) => previousTurnLetters.push(letter.str.toUpperCase()))
  );
  const [emptyTurnArray, setEmptyTurnArray] = useState<UserStringObject[]>(
    Array.from({ length: turns - 1 }, (_, i) => i).map((_, i) => ({
      idx: i,
      str: "",
      color: "default",
    }))
  );

  const setLetterColor = (str: string, idx: number) => {
    // if (str === wordRef.current[turn.current]) {
    if (str === wordRef.current.charAt(idx).toUpperCase()) {
      console.log(
        "=== str App.tsx [51] ===",
        str,
        wordRef.current.charAt(idx).toUpperCase(),
        wordRef.current
      );
      return "green";
    } else if (wordRef.current.toUpperCase().includes(str)) {
      return "yellow";
    } else {
      return "default";
    }
  };

  const setTurn = () => {
    if (turn.current < 6) {
      turn.current = turn.current + 1;
    }
    if (turn.current === 6) {
      turn.current = 0;
      setShowEndGame(true);
    }
    if (
      userStringObjectArray
        .map((str) => str.str)
        .join("")
        .toUpperCase() === wordRef.current.toUpperCase()
    ) {
      setWinner(true);
      setShowEndGame(true);
    }

    setPreviousTurnArray([
      [
        ...userStringObjectArray.map((str, idx) => ({
          idx,
          str: str.str,
          color: setLetterColor(str.str, idx),
        })),
      ],
      ...previousTurnArray,
    ]);
    emptyTurnArray.pop();
    valueRef.current = "";
    setUserStringObjectArray([{ idx: 0, str: "", color: "default" }]);
  };

  const backspaceVal = () => {
    valueRef.current = valueRef.current.slice(0, -1);
    setUserStringObjectArray(
      valueRef.current
        .split("")
        .map((str, idx) => ({ idx, str, color: "default" }))
    );
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (userStringObjectArray.length === 5) {
      setTurn();
    }
  };

  const handleReset = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowEndGame(false);
    setWinner(false);
    turn.current = 0;
    valueRef.current = "";
    setUserStringObjectArray([{ idx: 0, str: "", color: "default" }]);
    setPreviousTurnArray([]);
    setEmptyTurnArray(
      Array.from({ length: turns - 1 }, (_, i) => i).map((_, i) => ({
        idx: i,
        str: "",
        color: "default",
      }))
    );
    wordRef.current =
      fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
  };

  const kbdClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (valueRef.current.length < 6) {
      const target = event.target as HTMLButtonElement;
      valueRef.current = valueRef.current + target.innerHTML;
      setUserStringObjectArray(
        valueRef.current
          .split("")
          .map((str, idx) => ({ idx, str, color: "default" }))
      );
    }
  };

  return (
    <>
      {!showEndGame && (
        <MixedWord word={userStringObjectArray} wordLength={wordLength} />
      )}
      {previousTurnArray.length > 0 &&
        previousTurnArray.map((turn, i) => (
          <MixedWord word={turn} wordLength={wordLength} key={i} />
        ))}
      {emptyTurnArray.map((_, i) => (
        <EmptyWord key={i} />
      ))}
      {winner && turn.current < 6 && <EmptyWord />}
      {winner && <h3>Winner</h3>}
      {showEndGame && (
        <>
          <button onClick={handleReset}>Reset</button>
          <h3>Game Over</h3>
        </>
      )}
      <hr />
      {qwertyLetterRowOne.map((letter, i) => (
        <KbdButton
          disabled={
            previousTurnLetters.includes(letter) &&
            !wordRef.current.toUpperCase().includes(letter)
          }
          letter={letter}
          onClick={kbdClick}
          key={i}
        />
      ))}{" "}
      <br />
      {qwertyLetterRowTwo.map((letter, i) => (
        <KbdButton
          disabled={
            previousTurnLetters.includes(letter) &&
            !wordRef.current.toUpperCase().includes(letter)
          }
          letter={letter}
          onClick={kbdClick}
          key={i}
        />
      ))}{" "}
      <br />
      {qwertyLetterRowThree.map((letter, i) => (
        <KbdButton
          disabled={
            previousTurnLetters.includes(letter) &&
            !wordRef.current.toUpperCase().includes(letter)
          }
          letter={letter}
          onClick={kbdClick}
          key={i}
        />
      ))}
      <button className="controlButton" type="submit" onClick={handleSubmit}>
        Enter
      </button>
      <button className="controlButton" onClick={backspaceVal}>
        Backspace
      </button>
      <input type="hidden" value={wordRef.current.toUpperCase()} id="word" />
    </>
  );
}

export default App;
