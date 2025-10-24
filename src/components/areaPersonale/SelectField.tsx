import React from "react";
import type { ResTagDTO } from "../../services/api";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

type SelectFieldProps = {
    id: string;
    name: string;
    label: string;
    options: ResTagDTO[];
    requiredMark?: boolean;
    placeholder?: string;
    defaultValue?: string | number;
    value?: string | number;
    onChange?: (value: string) => void;
    disabled?: boolean;
};

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
    (
        {
            id,
            name,
            label,
            options,
            requiredMark = false,
            placeholder = "Seleziona...",
            defaultValue,
            value,
            onChange,
            disabled,
        },
        ref
    ) => {
        return (
            <label htmlFor={id} className="select-field-wrapper">
        <span className="select-field-label">
          {label}
            {requiredMark && <span className="select-field-required">*</span>}
        </span>
                <select
                    id={id}
                    name={name}
                    ref={ref}
                    className="select-field-select"
                    defaultValue={defaultValue}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    required={requiredMark}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={`${id}-${opt.id}`} value={String(opt.id)}>
                            {opt.nome}
                        </option>
                    ))}
                </select>
            </label>
        );
    }
);

SelectField.displayName = "SelectField";
