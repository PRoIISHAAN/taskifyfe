import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export function AuthFlowRoute({ children }) {
  const [isValidOtpFlow, setIsValidOtpFlow] = useState(null);
  const navigate = useNavigate();
  const { email } = useParams();

  useEffect(() => {
    async function validateOtpFlow() {
      try {
        // Check if this email exists in the system and is in OTP-pending state
        // We'll use a simple approach: try to get user info for this email
        const response = await axios.post(
          "/user/validateOtpEmail",
          { email: email },
          { withCredentials: true }
        );

        // If email is valid and pending OTP, allow access
        if (response.data.valid) {
          setIsValidOtpFlow(true);
        } else {
          // Email not found or not in OTP-pending state
          navigate("/login");
          setIsValidOtpFlow(false);
        }
      } catch (error) {
        // If validation fails, redirect to login
        navigate("/login");
        setIsValidOtpFlow(false);
      }
    }

    if (email) {
      validateOtpFlow();
    }
  }, [email, navigate]);

  // Show loading state while validating
  if (isValidOtpFlow === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating...</p>
        </div>
      </div>
    );
  }

  // Only render if valid OTP flow
  return isValidOtpFlow ? children : null;
}
