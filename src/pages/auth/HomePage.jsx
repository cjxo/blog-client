import { Link, Navigate } from "react-router-dom";
import useAuth from "../../components/AuthProvider.jsx";
import BlogForgePng from "../../../public/icons/Blog-Forge-Just-Logo.png";
import "./index-when-auth.css";

const HomePage = () => {
  const auth = useAuth();
  if (!auth.token) {
      return <Navigate to="/sign-in" />;
  }

  const sidebarNames = [
    "Home", "Inbox", "Notifications", "Add Post"
  ];

  return (
    <>
      <main className="bf-main-homepage">
        <section className="bf-side-bar">
          <Link to="/home">
            <img
              className="bf-logo-home"
              src={BlogForgePng}
              alt="blog forge logo"
            />
          </Link>
          <ul>
            <li>H</li>
          </ul> 
        </section> 
        <section className="bf-content-display-area">
          <header className="bf-header">
            <h1 className="bf-page-title">{sidebarNames[0]}</h1>
          </header>
          
          <section className="bf-main-display">
          </section>
        </section>
      </main>
    </>
  );
};

export default HomePage;
