import React from "react";

type EventMetaRowProps = {
    icon?: React.ReactNode;
    label: string;
    children: React.ReactNode;
    badge?: boolean;
};

export const EventMetaRow: React.FC<EventMetaRowProps> = ({ icon, label, children, badge }) => (
    <div className="flex flex-wrap items-start gap-2 py-2">
    <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
      {icon} {label}
    </span>
        {badge ? (
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
        {children}
      </span>
        ) : (
            <span className="text-sm text-gray-800">{children}</span>
        )}
    </div>
);
