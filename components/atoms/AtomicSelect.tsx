"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  key: string;
  value: string;
}

interface Props {
  options: Option[];
  disabled?: boolean;
  onValueChange: (value: string) => void;
  value: string;
  placeholder: string;
}

const AtomicSelect = ({
  options,
  disabled = false,
  onValueChange,
  value,
  placeholder,
}: Props) => {
  return (
    <Select disabled={disabled} onValueChange={onValueChange} value={value}>
      <SelectTrigger id="custom-select" className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.key}>
              {option.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AtomicSelect;
