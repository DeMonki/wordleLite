import { useEffect, useState } from "react";
import { EmptyLetterBox } from "../EmptyLetterBox/EmptyLetterBox";
import { LetterBox } from "../LetterBox/LetterBox";
import "./styles.css";

type UserStringObject = {
  idx: number;
  str: string;
  color: string;
};

export interface MixedWordProps {
  word: UserStringObject[];
  wordLength: number;
}

export const MixedWord = ({ word, wordLength = 5 }: MixedWordProps) => {
  const array = Array.from({ length: wordLength }, (_, i) => i);

  const [indexFlag, setIndexFlag] = useState(0);

  useEffect(() => {
    let idxFlag = 0;
    while (word[idxFlag]?.str.match(/^[A-Z]/)) {
      idxFlag++;
    }
    setIndexFlag(idxFlag);
  }, [word]);

  return (
    <div className="mixedWord">
      {array.map((i: number) =>
        word[i] && word[i].str && word[i].str.match(/^[A-Z]/) ? (
          <LetterBox
            key={i}
            letter={word[i].str}
            green={word[i].color === "green"}
            yellow={word[i].color === "yellow"}
          />
        ) : (
          <EmptyLetterBox key={i} active={i === indexFlag} />
        )
      )}
    </div>
  );
};
