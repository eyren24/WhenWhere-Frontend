// src/components/ui/SelectField.tsx
import React from "react";
import type {ResTagDTO} from "../../services/api";

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
            <label htmlFor={id} className="block text-sm text-gray-700">
        <span className="mb-1 inline-flex items-center gap-1 font-medium">
          {label}
            {requiredMark && <span className="text-red-500">*</span>}
        </span>
                <select
                    id={id}
                    name={name}
                    ref={ref}
                    className="
            mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2
            text-sm text-gray-900 shadow-sm outline-none
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            disabled:opacity-60
          "
                    defaultValue={defaultValue}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    required={requiredMark}
                >
                    {/* Placeholder */}
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
