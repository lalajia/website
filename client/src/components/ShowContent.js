import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { User, useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchContentData } from "../utilities/fetchContent";
import { useAuthToken } from "../AuthTokenContext";

const ShowContent = ({ contents }) => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const params = useLocation();
  const token = useAuthToken();
  const [name, setName] = useState("");
  // const [contents, setContents] = useState([]);

  // useEffect(() => {
  //   // async function fetchContent() {
  //   //   const data = await fetchContentData();
  //   // }
  //   // fetchContent();

  //   if (params.pathname !== "/content") {
  //     const fetchName = async () => {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token.accessToken}`,
  //         },
  //       });
  //       const data = await response.json();
  //       setName(data.name);
  //     };
  //     fetchName();
  //   }
  // }, [params.pathname, token.accessToken]);

  return (
    <div className="mt-4">
      <h2>Content</h2>
      <hr />

      {contents.map((content) => (
        <ListGroup key={content.id} style={{ marginBottom: "1rem" }}>
          <ListGroup.Item>
            <h3>
              <strong>{content.title}</strong>
            </h3>
            <span className="text-end">
              <em>{new Date(content.createdAt).toLocaleDateString()}</em>
            </span>
          </ListGroup.Item>
          <ListGroup.Item variant="info">
            <p style={{ wordWrap: "break-word" }}>{content.body}</p>
            {user && (
              <button
                className="primary"
                onClick={() => navigate("/auth/detail/" + content.id)}
              >
                detail
              </button>
            )}
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  );
};

export default ShowContent;
