import React, { useState } from "react";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const fetchMyComments = (async) => {};
  return (
    <div>
      Comment
      <div>
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
  );
};

export default Comment;
