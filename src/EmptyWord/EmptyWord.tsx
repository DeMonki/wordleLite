import { EmptyLetterBox } from "../EmptyLetterBox/EmptyLetterBox";
import "./styles.css";

export const EmptyWord = () => {
    return (
        <div className="empty-word">
            {Array.from({length: 5}, (_, i) => i).map((_, i) => (
                <EmptyLetterBox key={i} />
            ))}
        </div>
    );
    }
