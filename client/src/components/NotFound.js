import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style/index.css";

const NotFoundPage = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <h1 className="text-center">Not Found</h1>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
