import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const ShowContent = ({ contents }) => {
  // const [contents, setContents] = useState([]);

  return (
    <div className="container-lg">
      <h2>Content</h2>

      {/* Render the fetched contents */}
      <ul>
        {contents.map((content) => (
          <ListGroup key={content.id}>
            <ListGroup.Item>
              <h3>{content.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              <p style={{ whiteSpace: "normal" }}>{content.body}</p>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </ul>
    </div>
  );
};

export default ShowContent;
