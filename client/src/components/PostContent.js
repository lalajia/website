import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import ReactTextareaAutosize from "react-textarea-autosize";

const PostContent = ({ contents, setContents }) => {
  //   const [contents, setContents] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  async function addContent(e) {
    e.preventDefault();
    if (!newTitle || !newBody) {
      alert("Please enter both title and body.");
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        body: newBody,
      }),
    });
    if (response.ok) {
      const content = await response.json();
      setContents([content, ...contents]);
      setNewTitle("");
      setNewBody("");
    } else {
      alert("Failed to add content.");
    }
  }
  return (
    <div>
      <Row>
        <Col
          md={3}
          lg={2}
          className="d-md-block bg-info sidebar position-sticky pt-3"
        >
          {/* <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="position-sticky pt-3"> */}
          <Nav.Item>
            <Nav.Link active>New Text Post</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active>New Picture Post</Nav.Link>
          </Nav.Item>
          {/*<Nav.Item>
            <Nav.Link>Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Customers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Reports</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Integrations</Nav.Link>
          </Nav.Item> */}
          {/* </div>
          </Nav> */}
        </Col>
        <Col md={9} sm className="px-4">
          <div className="d-flex justify-content-between flex-wrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            Text Post
          </div>
          <Form onSubmit={addContent}>
            <Form.Group controlId="formTitle">
              <Form.Label>Your Post Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>Your Thought</Form.Label>
              <ReactTextareaAutosize
                className="form-control textarea-autosize"
                minRows={1}
                placeholder="Type your thought today..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
            </Form.Group>
            <div className="mb-10">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default PostContent;
