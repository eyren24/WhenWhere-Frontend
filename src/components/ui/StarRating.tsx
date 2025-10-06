import React from "react";
import { FaStar } from "react-icons/fa";

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
        <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaStar className="text-yellow-500" aria-hidden />
                <span>{label}</span>
            </label>
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                    const curr = i + 1;
                    const active = value >= curr;
                    return (
                        <div
                            key={curr}
                            role="button"
                            tabIndex={0}
                            aria-label={`${curr} stelle`}
                            className={`inline-flex size-9 items-center justify-center rounded-md border transition hover:bg-gray-50 ${
                                active ? "bg-yellow-50 border-yellow-300" : "bg-white border-gray-200"
                            }`}
                            onClick={() => onChange(curr)}
                            onKeyDown={(e) => handleKey(e, curr)}
                            title={`${curr} stelle`}
                        >
                            <FaStar className={active ? "fill-yellow-400" : "fill-gray-300"} />
                        </div>
                    );
                })}
            </div>
            <input type="hidden" name="rating" value={String(value)} />
        </div>
    );
};
