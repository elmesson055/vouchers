import React, { useState } from "react";
import ValidationTerminal from "./voucher/ValidationTerminal";
import AuthenticationModal from "./voucher/AuthenticationModal";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated = false }: HomeProps) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  const [validationStatus, setValidationStatus] = useState<
    "valid" | "warning" | "invalid"
  >("valid");
  const [isProcessing, setIsProcessing] = useState(false);
  const [voucherDetails, setVoucherDetails] = useState({
    type: "standard" as const,
    remainingUses: 5,
    timeRestriction: "Valid all day",
    message: "Ready for voucher input",
  });

  const handleLogin = (username: string, password: string) => {
    // Simulated authentication
    setIsAuth(true);
  };

  const handleValidate = (code: string) => {
    setIsProcessing(true);
    // Simulated validation process
    setTimeout(() => {
      setValidationStatus("valid");
      setVoucherDetails({
        type: "standard",
        remainingUses: 4,
        timeRestriction: "Valid all day",
        message: "Voucher validated successfully",
      });
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!isAuth && (
        <AuthenticationModal
          isOpen={true}
          onLogin={handleLogin}
          onClose={() => {}}
        />
      )}

      <ValidationTerminal
        onValidate={handleValidate}
        isProcessing={isProcessing}
        validationStatus={validationStatus}
        voucherDetails={voucherDetails}
      />
    </div>
  );
};

export default Home;
