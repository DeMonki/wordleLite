import cx from "classnames";
import "./styles.css";

export interface KbdButtonProps {
  disabled?: boolean;
  letter: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const KbdButton = ({ disabled, letter, onClick }: KbdButtonProps) => (
  <button
    className={cx("kbdButton", {
      ["disabled"]: disabled,
    })}
    onClick={onClick}
  >
    {letter}
  </button>
);
