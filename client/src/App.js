import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./utilities/AuthTokenContext";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import MyComments from "./routes/MyComments";
import CreateContent from "./routes/CreateContent";
import ContentDetails from "./components/ContentDetails";
import NotFound from "./components/NotFound";

function App() {
  function RequireAuth({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();

    if (!isLoading && !isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return children;
  }

  return (
    // <AuthTokenProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/content" element={<CreateContent />} />
    //       <Route
    //         path="/auth/content"
    //         element={
    //           <RequireAuth>
    //             <CreateContent />
    //           </RequireAuth>
    //         }
    //       />
    //       <Route
    //         path="/auth/detail/:id"
    //         element={
    //           <RequireAuth>
    //             <ContentDetails />
    //           </RequireAuth>
    //         }
    //       />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route
    //         path="/comment"
    //         element={
    //           <RequireAuth>
    //             <MyComments />
    //           </RequireAuth>
    //         }
    //       />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </BrowserRouter>
    // </AuthTokenProvider>
    <AuthTokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/verify-user" element={<VerifyUser />} /> */}
          <Route path="/content" element={<CreateContent />} />
          <Route
            path="/auth/content"
            element={
              <RequireAuth>
                <CreateContent />
              </RequireAuth>
            }
          />
          <Route
            path="/auth/detail/:id"
            element={
              <RequireAuth>
                <ContentDetails />
              </RequireAuth>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycomment" element={<MyComments />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthTokenProvider>
  );
}

export default App;
