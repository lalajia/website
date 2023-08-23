import React from "react";
import Header from "../components/Header";
import PostContent from "../components/PostContent";
import ShowContent from "../components/ShowContent";

const CreateContent = () => {
  return (
    <div>
      <Header></Header>
      <div className="container-lg">
        <PostContent></PostContent>
        <ShowContent></ShowContent>
      </div>
    </div>
  );
};

export default CreateContent;
