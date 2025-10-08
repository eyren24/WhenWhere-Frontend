import React from "react";

type Props = {
    accent: string; // hex
    children: React.ReactNode;
};

export const CalendarCard = React.memo(({ accent, children }: Props) => {
    return (
        <div
            className="rounded-2xl p-3 sm:p-4 bg-white/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 border"
            style={{ borderColor: accent }}
        >
            {children}
        </div>
    );
});
CalendarCard.displayName = "CalendarCard";
