import React, { useEffect, useState } from "react";
import ShowContent from "../components/ShowContent";
import Header from "../components/Header";
// import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import { fetchContentData } from "../utilities/fetchContent";
import Footer from "../components/Footer";

const Home = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchContent() {
      const data = await fetchContentData();
      setContents(data);
    }
    fetchContent();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <div className="container-lg">
          {/* <NavBar></NavBar> */}
          <Carousel></Carousel>
          <ShowContent contents={contents}></ShowContent>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
