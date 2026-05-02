import React, { useRef, useState } from "react";

const OTPVerify = ({
  length = 4,
  onComplete,
  className = "",
  inputClassName = "",
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // trigger complete
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.slice(0, length).split("");
    const updatedOtp = [...otp];

    newOtp.forEach((digit, i) => {
      updatedOtp[i] = digit;
    });

    setOtp(updatedOtp);

    if (newOtp.length === length) {
      onComplete?.(newOtp.join(""));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Verify OTP</h2>
      <div
        className={`flex gap-2 justify-center ${className}`}
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`w-10 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${inputClassName}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPVerify;