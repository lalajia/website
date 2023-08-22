import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const loginButtonStyle = {
    background: "none",
    border: "none",
    padding: "0",
    cursor: "pointer",
    color: "inherit",
    fontSize: "inherit",
    textDecoration: "none",
  };

  return (
    <button style={loginButtonStyle} onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
