import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  googleOAuthLogin,
  loginByCredentials,
} from "../../queries/auth.queries";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSignInWithGoogle() {
    googleOAuthLogin();
  }

  function handleSignInWithCredentials() {
    loginByCredentials(username, password).then((data) => {
      navigate(`/get-token?code=${data.code}`);
    });
  }

  return (
    <div className="w-screen h-full overflow-auto">
      <div className="max-w-5xl mx-auto py-10 px-4 bg-gray-50 min-h-full flex flex-col">
        <h1 className="text-3xl font-bold underline mb-10">Login</h1>
        <div className="w-full h-full flex flex-col items-center gap-4 justify-center flex-1">
          <form className="w-80 flex flex-col gap-4">
            <input
              type="email"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
          <button
            className="ring-1 rounded-lg px-2"
            onClick={handleSignInWithCredentials}
          >
            Login
          </button>
          <button
            className="ring-1 rounded-lg px-2"
            onClick={handleSignInWithGoogle}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}
