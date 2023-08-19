import Header from "../components/Header";
import LoginButton from "../components/login";
import LogoutButton from "../components/logout";
import Profile from "../components/profile";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <Profile></Profile>
    </div>
  );
};

export default Home();
