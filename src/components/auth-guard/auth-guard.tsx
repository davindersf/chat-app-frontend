import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants/keys.constants";
import { getAccessToken } from "../../utils/session-storage";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(function checkAccessToken() {
    setIsCheckingAuth(true);
    // check if user is authorized
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("/login");
    } else {
      setIsAuthorized(true);
      setIsCheckingAuth(false);
    }
  }, []);

  if (isCheckingAuth || !isAuthorized) {
    return <div>Authenticating User...</div>;
  }

  return <>{children}</>;
}
