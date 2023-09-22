import "./styles.css";
import cx from "classnames";

export interface EmptyLetterBoxProps {
  active?: boolean;
}

export const EmptyLetterBox = ({ active }: EmptyLetterBoxProps) => {
  return (
    <div
      className={cx("emptyLetterBox", {
        ["active"]: active,
      })}
    ></div>
  );
};
