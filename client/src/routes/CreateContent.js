import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PostContent from "../components/PostContent";
import ShowContent from "../components/ShowContent";
import { fetchContentData } from "../utilities/fetchContent";

const CreateContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchContent() {
      const data = await fetchContentData();
      setContents(data);
    }
    fetchContent();
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="container-lg">
        <PostContent
          contents={contents}
          setContents={setContents}
        ></PostContent>
        <ShowContent contents={contents}></ShowContent>
      </div>
    </div>
  );
};

export default CreateContent;
