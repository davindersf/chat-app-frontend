import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/keys.constants";
import { getAccessTokenFromCode } from "../../queries/auth.queries";
import { setAccessToken, setRefreshToken } from "../../utils/session-storage";

export default function GetToken() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(
    function getAccessToken() {
      if (code) {
        getAccessTokenFromCode(code).then((data) => {
          // save in the tokens in session or local storage
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          // redirect the user to the home screen
          navigate("/chat");
        });
      }
    },
    [code]
  );

  if (!code) {
    return <div>didn't received a valid code param</div>;
  }

  return <div>Processing...</div>;
}
