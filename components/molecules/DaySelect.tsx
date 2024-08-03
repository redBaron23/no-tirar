"use client";

import { useState } from "react";
import Chip from "../atoms/Chip"; // Adjust the import path as needed

const OPTIONS = [
  { label: "Hoy" },
  { label: "Ayer" },
  { label: "Últimos 7 días" },
  { label: "Últimos 30 días" },
];

const DaySelect = () => {
  const [selectedOption, setSelectedOption] = useState("Hoy");

  const handleChipClick = (label: string) => {
    setSelectedOption(label);
  };

  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap py-2 hide-scrollbar ">
      {OPTIONS.map((option, index) => (
        <Chip
          key={`${index}/${option.label}`}
          label={option.label}
          isSelected={selectedOption === option.label}
          onClick={() => handleChipClick(option.label)}
        />
      ))}
    </div>
  );
};

export default DaySelect;
