import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    icon?: React.ReactNode;
    requiredMark?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
                                                                label,
                                                                icon,
                                                                requiredMark,
                                                                className = "",
                                                                ...props
                                                            }) => (
    <div className="field-wrapper">
        <label className="field-label">
            {icon}
            <span>
        {label} {requiredMark && <span className="field-required">*</span>}
      </span>
        </label>
        <textarea
            className={`field-textarea ${className}`}
            {...props}
        />
    </div>
);
