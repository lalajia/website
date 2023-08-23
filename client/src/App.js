import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import MyComments from "./routes/MyComments";
import CreateContent from "./routes/CreateContent";

function App() {
  function RequireAuth({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();

    if (!isLoading && !isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return children;
  }

  return (
    <AuthTokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<CreateContent />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/comment"
            element={
              <RequireAuth>
                <MyComments />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthTokenProvider>
  );
}

export default App;
