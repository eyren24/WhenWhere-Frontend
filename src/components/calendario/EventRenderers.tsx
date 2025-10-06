import type { EventContentArg } from "@fullcalendar/core";
import React from "react";

export const EventRenderers = (eventInfo: EventContentArg): React.ReactElement => {
    const { event } = eventInfo;
    const rating = (event.extendedProps as { rating?: number }).rating ?? 0;

    const textColor = event.textColor || "#111827"; // fallback gray-900

    const Stars = ({ rating }: { rating: number }) => {
        const items: React.ReactElement[] = [];
        for (let i = 1; i <= 5; i++) {
            items.push(
                <span
                    key={i}
                    className="leading-none"
                    style={{ color: i <= rating ? textColor : "rgba(0,0,0,.3)" }}
                >
          ★
        </span>
            );
        }
        return <div className="flex gap-[2px] text-[16px] mt-[2px]">{items}</div>;
    };

    return (
        <div className="text-[0.8rem] leading-tight" style={{ color: textColor }}>
            <b className="block">{event.title}</b>
            <Stars rating={rating} />
        </div>
    );
};
