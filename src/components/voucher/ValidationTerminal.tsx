import React, { useState } from "react";
import NumericKeypad from "./NumericKeypad";
import ValidationDisplay from "./ValidationDisplay";
import { Card } from "@/components/ui/card";

interface ValidationTerminalProps {
  onValidate?: (code: string) => void;
  isProcessing?: boolean;
  validationStatus?: "valid" | "warning" | "invalid";
  voucherDetails?: {
    type: "standard" | "extra" | "disposable";
    remainingUses: number;
    timeRestriction: string;
    message: string;
  };
}

const ValidationTerminal = ({
  onValidate = () => {},
  isProcessing = false,
  validationStatus = "valid",
  voucherDetails = {
    type: "standard",
    remainingUses: 5,
    timeRestriction: "Valid all day",
    message: "Ready for voucher input",
  },
}: ValidationTerminalProps) => {
  const [voucherCode, setVoucherCode] = useState<string>("");

  const handleNumberClick = (number: string) => {
    if (voucherCode.length < 8) {
      setVoucherCode((prev) => prev + number);
    }
  };

  const handleBackspace = () => {
    setVoucherCode((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setVoucherCode("");
  };

  return (
    <div className="w-full max-w-[600px] min-h-[800px] bg-gray-50 p-8 rounded-xl shadow-lg">
      <Card className="p-6 space-y-8 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Voucher Validation Terminal
          </h2>
          <p className="text-gray-500">Enter voucher code to validate</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md p-4 bg-gray-100 rounded-lg text-center">
            <span className="text-3xl font-mono tracking-wider">
              {voucherCode || "········"}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <ValidationDisplay
            status={validationStatus}
            voucherType={voucherDetails.type}
            remainingUses={voucherDetails.remainingUses}
            message={voucherDetails.message}
            timeRestriction={voucherDetails.timeRestriction}
          />

          <NumericKeypad
            onNumberClick={handleNumberClick}
            onBackspace={handleBackspace}
            onClear={handleClear}
            disabled={isProcessing}
          />
        </div>
      </Card>
    </div>
  );
};

export default ValidationTerminal;
