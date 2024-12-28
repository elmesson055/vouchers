import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

interface NumericKeypadProps {
  onNumberClick?: (number: string) => void;
  onBackspace?: () => void;
  onClear?: () => void;
  disabled?: boolean;
}

const NumericKeypad = ({
  onNumberClick = () => {},
  onBackspace = () => {},
  onClear = () => {},
  disabled = false,
}: NumericKeypadProps) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="w-full max-w-[400px] bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-4">
        {numbers.map((number) => (
          <Button
            key={number}
            variant="outline"
            className="h-16 text-2xl font-bold"
            onClick={() => onNumberClick(number)}
            disabled={disabled}
          >
            {number}
          </Button>
        ))}
        <Button
          variant="outline"
          className="h-16"
          onClick={onBackspace}
          disabled={disabled}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          className="h-16"
          onClick={onClear}
          disabled={disabled}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default NumericKeypad;
