"use client";

import React, { useState } from "react";

type DropdownVariant = "status";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  variant?: DropdownVariant;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  pending: {
    bg: "bg-warning-fill",
    text: "text-warning-text",
    dot: "bg-warning-indicator",
  },
  approved: {
    bg: "bg-success-fill",
    text: "text-success-text",
    dot: "bg-success-indicator",
  },
  completed: {
    bg: "bg-success-fill",
    text: "text-success-text",
    dot: "bg-success-indicator",
  },
  rejected: {
    bg: "bg-danger-fill",
    text: "text-danger-text",
    dot: "bg-danger-indicator",
  },
};

export default function Dropdown({
  variant = "status",
  options,
  value,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baseStyles = "w-[142px] relative";

  const variantStyles: Record<DropdownVariant, string> = {
    status: "",
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const colors = statusColors[value] || statusColors.pending;

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 py-[5px] px-[11px] rounded-full border border-gray-stroke bg-white"
      >
        <div className={`flex items-center gap-2 py-1 px-2 rounded-full ${colors.bg}`}>
          <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
          <span className={`text-sm ${colors.text}`}>
            {selectedOption?.label || "Select"}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-text transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-stroke rounded-b-md shadow-sm z-10">
          <div className="flex flex-col gap-2 p-[5px]">
            {options.map((option) => {
              const optColors = statusColors[option.value] || statusColors.pending;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 py-[5px] px-[11px] hover:bg-gray-fill rounded-md transition"
                >
                  <div className={`flex items-center gap-2 py-1 px-2 rounded-full ${optColors.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${optColors.dot}`}></span>
                    <span className={`text-sm ${optColors.text}`}>{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}