import React from "react";

type ButtonProps = {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           type = "button",
                                           variant = "primary",
                                           disabled = false,
                                       }) => {
    const baseClasses =
        "px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm focus:outline-none";
    const variants = {
        primary:
            "bg-sky-600 hover:bg-sky-700 text-white shadow-md hover:shadow-lg disabled:bg-sky-300",
        secondary:
            "bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm disabled:bg-gray-100",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]}`}
        >
            {label}
        </button>
    );
};

export default Button;