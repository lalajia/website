import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const ShowContent = ({ contents }) => {
  // const [contents, setContents] = useState([]);

  return (
    <div>
      <h2>Content</h2>

      {/* Render the fetched contents */}

      {contents.map((content) => (
        <ListGroup key={content.id} style={{ marginBottom: "1rem" }}>
          <ListGroup.Item>
            <h3>{content.title}</h3>
          </ListGroup.Item>
          <ListGroup.Item variant="info">
            <p style={{ wordWrap: "break-word" }}>{content.body}</p>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  );
};

export default ShowContent;
