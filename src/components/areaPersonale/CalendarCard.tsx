import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

type Props = {
    accent: string;
    children: React.ReactNode;
};

export const CalendarCard = React.memo(({ accent, children }: Props) => {
    return (
        <div
            className="calendar-card"
            style={{ borderColor: accent }}
        >
            {children}
        </div>
    );
});
CalendarCard.displayName = "CalendarCard";
