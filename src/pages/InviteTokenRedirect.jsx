import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InviteTokenRedirect() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    sessionStorage.setItem("pendingInviteToken", token);
    navigate("/invite/accept-invite", {
      replace: true,
      state: { inviteToken: token },
    });
  }, [token, navigate]);

  return null;
}
