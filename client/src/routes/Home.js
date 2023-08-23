import ShowContent from "../components/ShowContent";
import Header from "../components/Header";
// import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import PostContent from "../components/PostContent";
import CreateContent from "./CreateContent";

const Home = () => {
  return (
    <div>
      <div className="container-fluid sticky-top">
        <Header></Header>
      </div>

      <div className="container-lg">
        {/* <NavBar></NavBar> */}
        <Carousel></Carousel>
        <ShowContent></ShowContent>
      </div>
    </div>
  );
};

export default Home;
