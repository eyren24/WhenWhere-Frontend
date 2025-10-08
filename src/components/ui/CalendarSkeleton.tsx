import React from "react";

export const CalendarSkeleton = React.memo(() => {
    return (
        <div className="w-full">
            <div className="h-7 w-36 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="grid grid-cols-7 gap-[1px] bg-gray-200">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="aspect-[1.1/1] bg-white">
                        <div className="h-full w-full animate-pulse bg-gray-100" />
                    </div>
                ))}
            </div>
        </div>
    );
});
CalendarSkeleton.displayName = "CalendarSkeleton";
