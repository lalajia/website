import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const requestedScopes = [
  "profile",
  "email",
  "read:comment",
  "read:user",
  "edit:comment",
  "edit:user",
  "delete:comment",
  "delete:user",
  "write:user",
  "write:comment",
  "update:users",
  "update:users_app_metadata",
  "update:current_user_metadata",
];

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
