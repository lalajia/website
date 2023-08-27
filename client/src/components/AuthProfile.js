import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

let id = null;

export default function AuthProfile() {
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAuthToken();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [[isAuthenticated && user.sub]]);

  const fetchProfile = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setComments(data.comments);
    id = data.id;
  };

  return (
    isAuthenticated && (
      <div className="content-container df fd-c">
        <button className="primary" onClick={() => navigate("/content")}>
          Go Back
        </button>
        <div>
          <p>
            <span className="bold">Avatar: </span>
            {user.picture ? (
              <img src={user.picture} width="70" alt="profile avatar" />
            ) : (
              "None"
            )}
          </p>
        </div>
        <div>
          <p>
            <span className="bold">📧 Email: </span>
            {user.email}
          </p>
        </div>
        <div>
          <p>
            <span className="bold">🔑 Auth0Id: </span>
            {user.sub}
          </p>
        </div>
        <div>
          <p>
            <span className="bold">✅ Email verified: </span>
            {user.email_verified?.toString()}
          </p>
        </div>
        <div>
          <h2>Comments</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <div>{comment.body}</div>
                <p className="ta-r">
                  Posted on{" "}
                  <span className="c-blue">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
