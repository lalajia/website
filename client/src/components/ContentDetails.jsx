import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ContentDetails() {
  const { id } = useParams();
  const { isLoading } = useAuth0();
  const { accessToken } = useAuthToken();
  const [content, setContent] = useState(null);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/content/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    setContent(data);
  };

  const addNewComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/content/${id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: newComment,
        }),
      }
    );
    const data = await response.json();
    setNewComment("");
    fetchContent();
  };

  const updateComiment = async (i) => {
    const comment = content.comments[i];
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/content/${id}/comment/${comment.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: comment.inputValue,
        }),
      }
    );
    const data = await response.json();
    fetchContent();
  };

  const deleteComment = async (i) => {
    const comment = content.comments[i];
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/content/${id}/comment/${comment.id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: comment.inputValue,
        }),
      }
    );
    const data = await response.json();
    fetchContent();
  };

  if (isLoading || !content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <button className="btn-one" onClick={() => navigate("/auth/content")}>
        Go Back
      </button>
      <div className="df al-c">
        <div className="wp-50">
          <h2>Content</h2>
          <label className="bold" htmlFor="title">
            Title:
          </label>
          <div className="mb-20 p10">{content.title}</div>
          <label className="bold" htmlFor="body">
            Text:
          </label>
          <div className="p10">{content.body}</div>
        </div>

        <div className="wp-50">
          <h2>Comment</h2>
          <textarea
            className="input-title"
            rows="4"
            placeholder="Please enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="primary" onClick={addNewComment}>
            submit
          </button>

          <ul>
            {content &&
              content.comments.map((comment, i) => (
                <li key={comment.id}>
                  <div className="df ai-c">
                    <div
                      className="userName"
                      title={comment.user.name || comment.user.auth0Id}
                    >
                      {comment.user.name || comment.user.auth0Id}
                    </div>
                    :
                    {comment.isEdit ? (
                      <input
                        type="text"
                        value={comment.inputValue}
                        onChange={(e) => {
                          content.comments[i].inputValue = e.target.value;
                          setContent({ ...content });
                        }}
                      />
                    ) : (
                      <div className="content-item comment">{comment.body}</div>
                    )}
                  </div>

                  {comment.isEdit ? (
                    <>
                      <button
                        className="primary btn-round small mr-10 mt-10"
                        onClick={() => updateComiment(i)}
                      >
                        confirm
                      </button>
                      <button
                        className="primary btn-round small mr-10 mt-10"
                        onClick={() => {
                          content.comments[i].isEdit = false;
                          setContent({ ...content });
                        }}
                      >
                        cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="primary btn-round small mr-10 mt-10"
                      onClick={() => {
                        content.comments[i].isEdit = true;
                        content.comments[i].inputValue = comment.body;
                        setContent({ ...content });
                      }}
                    >
                      edit
                    </button>
                  )}

                  <button
                    className="primary btn-round small danger"
                    onClick={() => deleteComment(i)}
                  >
                    delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
