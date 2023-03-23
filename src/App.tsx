import { Outlet, Route, Routes } from "react-router-dom";
import AppShell from "./components/app-shell";
import AuthGuard from "./components/auth-guard";
import ChatBox from "./pages/chat-box";
import GetToken from "./pages/get-token";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppShell>
              <Outlet />
            </AppShell>
          </AuthGuard>
        }
      >
        <Route path="chat" element={<ChatBox />} />
      </Route>
      <Route path="get-token" element={<GetToken />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
