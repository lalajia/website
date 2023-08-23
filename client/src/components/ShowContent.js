import React, { useEffect, useState } from "react";

const ShowContent = () => {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    async function fetchContent() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/content`);
      const data = await response.json();
      setContents(data);
    }
    fetchContent();
  }, []);
  return (
    <div>
      <h2>Content</h2>

      {/* Render the fetched contents */}
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <h3>{content.title}</h3>
            <p>{content.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowContent;
