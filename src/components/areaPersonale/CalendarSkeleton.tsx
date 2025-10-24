import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

export const CalendarSkeleton = React.memo(() => {
    return (
        <div className="calendar-skeleton-wrapper">
            <div className="calendar-skeleton-title" />
            <div className="calendar-skeleton-grid">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="calendar-skeleton-cell">
                        <div className="calendar-skeleton-inner" />
                    </div>
                ))}
            </div>
        </div>
    );
});
CalendarSkeleton.displayName = "CalendarSkeleton";
