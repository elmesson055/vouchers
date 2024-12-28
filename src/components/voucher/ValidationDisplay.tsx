import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

type ValidationStatus = "valid" | "warning" | "invalid";

interface ValidationDisplayProps {
  status?: ValidationStatus;
  voucherType?: "standard" | "extra" | "disposable";
  remainingUses?: number;
  message?: string;
  timeRestriction?: string;
}

const ValidationDisplay = ({
  status = "valid",
  voucherType = "standard",
  remainingUses = 5,
  message = "Voucher is valid",
  timeRestriction = "Valid all day",
}: ValidationDisplayProps) => {
  const statusConfig = {
    valid: {
      color: "bg-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      badgeColor: "bg-green-500",
    },
    warning: {
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      badgeColor: "bg-yellow-500",
    },
    invalid: {
      color: "bg-red-100",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      icon: <AlertCircle className="h-6 w-6 text-red-600" />,
      badgeColor: "bg-red-500",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card
      className={`w-full max-w-md p-6 ${currentStatus.color} border-2 ${currentStatus.borderColor}`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{currentStatus.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${currentStatus.textColor}`}>
              Voucher Status
            </h3>
            <Badge className={`${currentStatus.badgeColor} text-white`}>
              {voucherType.toUpperCase()}
            </Badge>
          </div>

          <p className={`mt-1 text-sm ${currentStatus.textColor}`}>{message}</p>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className={currentStatus.textColor}>
              Remaining uses: {remainingUses}
            </span>
            <span className={currentStatus.textColor}>{timeRestriction}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ValidationDisplay;
