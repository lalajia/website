import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const logoutButtonStyle = {
    background: "none",
    border: "none",
    padding: "0",
    cursor: "pointer",
    color: "inherit",
    fontSize: "inherit",
    textDecoration: "none",
  };

  return (
    <button
      style={logoutButtonStyle}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
