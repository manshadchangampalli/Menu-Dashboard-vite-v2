import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "../../lib/utils";

interface CustomSelectProps {
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
}

const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  error,
  containerClassName,
  className,
  disabled,
}: CustomSelectProps) => {
  return (
    <div className={cn("space-y-1.5 flex flex-col", containerClassName)}>
      <label className="text-xs font-bold text-app-muted uppercase ml-1">
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-full h-10 border-app-border bg-white text-sm font-medium focus:ring-1 focus:ring-app-text",
            error ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export { CustomSelect };
