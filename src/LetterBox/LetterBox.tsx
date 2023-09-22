import cx from "classnames";
import "./styles.css";

export interface LetterBoxProps {
  letter: string;
  green: boolean;
  yellow: boolean;
}

export const LetterBox = ({ letter, green, yellow }: LetterBoxProps) => {
  return (
    <div
      className={cx("letter-box", {
        ["letter-box--green"]: green,
        ["letter-box--yellow"]: yellow,
      })}
    >
      {letter}
    </div>
  );
};
