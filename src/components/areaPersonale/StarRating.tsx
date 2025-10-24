import React from "react";
import { FaStar } from "react-icons/fa";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

interface StarRatingProps {
    value: number; // 1..5
    onChange: (v: number) => void;
    label?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, label = "Rating (1–5)" }) => {
    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>, v: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(v);
        }
    };

    return (
        <div className="star-rating-wrapper">
            <label className="star-rating-label">
                <FaStar className="star-icon" aria-hidden />
                <span>{label}</span>
            </label>
            <div className="star-rating-stars">
                {Array.from({ length: 5 }, (_, i) => {
                    const curr = i + 1;
                    const active = value >= curr;
                    return (
                        <div
                            key={curr}
                            role="button"
                            tabIndex={0}
                            aria-label={`${curr} stelle`}
                            className={`star-rating-box ${active ? "active" : ""}`}
                            onClick={() => onChange(curr)}
                            onKeyDown={(e) => handleKey(e, curr)}
                            title={`${curr} stelle`}
                        >
                            <FaStar className={active ? "star-filled" : "star-empty"} />
                        </div>
                    );
                })}
            </div>
            <input type="hidden" name="rating" value={String(value)} />
        </div>
    );
};
