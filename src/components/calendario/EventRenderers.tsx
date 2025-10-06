import type { EventContentArg } from "@fullcalendar/core";
import React from "react";

export const EventRenderers = (eventInfo: EventContentArg): React.ReactElement => {
    const { event } = eventInfo;
    const rating = (event.extendedProps as { rating?: number }).rating ?? 0;
    const Stars = ({ rating }: { rating: number }) => {
        const items: React.ReactElement[] = [];
        for (let i = 1; i <= 5; i++) {
            items.push(
                <span key={i} className={`leading-none ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
            );
        }
        return <div className="flex gap-[2px] text-[16px] mt-[2px]">{items}</div>;
    };

    return (
        <div className="text-[0.8rem] leading-tight">
            <b className="block text-gray-900">{event.title}</b>
            <Stars rating={rating} />
        </div>
    );
};
