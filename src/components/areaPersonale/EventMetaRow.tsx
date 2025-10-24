import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

type EventMetaRowProps = {
    icon?: React.ReactNode;
    label: string;
    children: React.ReactNode;
    badge?: boolean;
};

export const EventMetaRow: React.FC<EventMetaRowProps> = ({
                                                              icon,
                                                              label,
                                                              children,
                                                              badge,
                                                          }) => (
    <div className="event-meta-row">
    <span className="event-meta-label">
      {icon} {label}
    </span>
        {badge ? (
            <span className="event-meta-badge">{children}</span>
        ) : (
            <span className="event-meta-text">{children}</span>
        )}
    </div>
);
