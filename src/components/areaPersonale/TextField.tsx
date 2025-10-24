import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
    requiredMark?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, icon, requiredMark, className = "", ...props }, ref) => (
        <div className="field-wrapper">
            <label className="field-label">
                {icon}
                <span>
          {label} {requiredMark && <span className="field-required">*</span>}
        </span>
            </label>
            <input
                ref={ref}
                className={`field-input ${className}`}
                {...props}
            />
        </div>
    )
);
TextField.displayName = "TextField";
