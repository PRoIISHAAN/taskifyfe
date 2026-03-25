import { useLocation, useParams } from "react-router-dom";
import OTPModal from "../components/otpModal";

export function OtpPage() {
  const { email, rememberme } = useParams();
  const location = useLocation();
  const nextPath = new URLSearchParams(location.search).get("next") || "";
  return (
    <OTPModal
      email={email}
      rememberme={rememberme === "true"}
      nextPath={nextPath}
      preferCompletionFlow={true}
    />
  );
}
