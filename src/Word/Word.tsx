import { LetterBox } from "../LetterBox/LetterBox";
import "./styles.css";

export interface WordProps {
  word: string;
}
export const Word = ({ word }: WordProps) => {
  return (
    <div className="word">
      {word.split("").map((letter: string, i: number) => (
        <LetterBox key={i} letter={letter} green={i % 2 === 0} yellow={false} />
      ))}
    </div>
  );
};
