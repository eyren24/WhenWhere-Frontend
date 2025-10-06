import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
    requiredMark?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, icon, requiredMark, className = "", ...props }, ref) => (
        <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {icon}
                <span>
          {label} {requiredMark && <span className="text-red-500">*</span>}
        </span>
            </label>
            <input
                ref={ref}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-blue-500 ${className}`}
                {...props}
            />
        </div>
    )
);
TextField.displayName = "TextField";
