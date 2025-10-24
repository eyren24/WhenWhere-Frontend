import React from "react";
import { FaStar } from "react-icons/fa";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

export const StarDisplay: React.FC<{ value?: number | null }> = ({ value }) => {
    const v = Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
    return (
        <div className="star-display-wrapper" aria-label={`Valutazione ${v}/5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                    key={i}
                    className={i < v ? "star-filled" : "star-empty"}
                    aria-hidden
                />
            ))}
        </div>
    );
};
