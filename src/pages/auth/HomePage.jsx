import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../components/AuthProvider.jsx";
import Icon from '@mdi/react';
import {
  mdilHome,
  mdilInbox,
  mdilPlusBox,
  mdilAccount,
  mdilBell,
} from '@mdi/light-js';
import BlogForgePng from "../../../public/icons/Blog-Forge-Just-Logo.png";
import "./index-when-auth.css";

const SidebarIcon = ({ mdil, color="white" }) => {
  return (
    <Icon
      path={mdil}
      size={1.5}
      color={color}
    />
  );
};

const LinkIcon = ({ mdil, link, selected=false, setSelected=()=>{} }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={link}
      className={`bf-link-icon ${selected ? "selected" : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setSelected()}
    >
      <SidebarIcon
        mdil={mdil}
        color={
          selected ? "white" : (hover ? "white" : "#697565")
        }
      />
    </Link>
  );
};

const HomePage = () => {
  const auth = useAuth();
  if (!auth.token) {
      return <Navigate to="/sign-in" />;
  }

  const [maxContainerHeight, setMaxContainerHeight] = useState(0);

  useEffect(() => {
    const updateMaxHeight = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
      const headerHeight = document.querySelector(".bf-header").offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight - headerHeight;
      setMaxContainerHeight(maxHeight);
    };

    updateMaxHeight();

    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  const [selectedSidebar, setSelectedSidebar] = useState(0);
  const sidebarNames = [
    "Home", "Inbox", "Notifications", "Add Post", "Profile"
  ];

  const sidebarLinks = [
    {
      name: "/home",
      icon: mdilHome, 
    },
    {
      name: "inbox",
      icon: mdilInbox,
    },
    {
      name: "notifications",
      icon: mdilBell,
    },
    {
      name: "add-post",
      icon: mdilPlusBox
    }
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
            {
              sidebarLinks.map((link, idx) => {
                return (
                  <li key={idx}>
                    <LinkIcon 
                      mdil={link.icon} 
                      link={link.name} 
                      selected={selectedSidebar === idx} 
                      setSelected={() => setSelectedSidebar(idx)} 
                    />
                  </li>
                );
              })
            }
          </ul>

          <LinkIcon mdil={mdilAccount} link="account" selected={selectedSidebar === 4} setSelected={ () => setSelectedSidebar(4) }/>
        </section> 
        <section className="bf-content-display-area">
          <header className="bf-header">
            <h1 className="bf-page-title">{sidebarNames[selectedSidebar]}</h1>
          </header>
          
          <section className="bf-main-display" style={{maxHeight: maxContainerHeight}}>
            <Outlet />
          </section>
        </section>
      </main>
    </>
  );
};

export default HomePage;

SidebarIcon.propTypes = {
  mdil: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
};

LinkIcon.propTypes = {
  mdil: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  setSelected: PropTypes.func,
};
