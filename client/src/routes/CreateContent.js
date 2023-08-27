import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PostContent from "../components/PostContent";
import ShowContent from "../components/ShowContent";
import { fetchContentData } from "../utilities/fetchContent";
import Footer from "../components/Footer";

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
      <div className="app-container">
        <Header></Header>
        <div className="content">
          <div className="container-lg">
            <PostContent
              contents={contents}
              setContents={setContents}
            ></PostContent>
            <ShowContent contents={contents}></ShowContent>
          </div>
        </div>
        {/* <hr></hr> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CreateContent;
