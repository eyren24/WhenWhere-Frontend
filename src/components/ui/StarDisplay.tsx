import React from "react";
import { FaStar } from "react-icons/fa";

export const StarDisplay: React.FC<{ value?: number | null }> = ({ value }) => {
    const v = Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
    return (
        <div className="flex items-center gap-1" aria-label={`Valutazione ${v}/5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < v ? "fill-yellow-400" : "fill-gray-300"} aria-hidden />
            ))}
        </div>
    );
};
