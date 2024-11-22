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
      <Icon
        path={mdil}
        color={selected ? "white" : (hover ? "white" : "#697565")}
        size={1.5}
      />
    </Link>
  );
};

const HomePage = () => {
  const auth = useAuth(); 

  const [maxContainerHeight, setMaxContainerHeight] = useState(0);
  const [selectedSidebar, setSelectedSidebar] = useState(0); 

  // damn, I hate this. 
  useEffect(() => {
    const updateMaxHeight = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
      const headerElement = document.querySelector(".bf-header");
      if (headerElement) {
        const headerHeight = headerElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight - headerHeight;
        setMaxContainerHeight(maxHeight);
        return true;
      }

      return false;
    };

    const observer = new MutationObserver(() => {
      if (updateMaxHeight()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);


  if (auth.loading) {
    return <div>Loading...</div>
  }

  if (!auth.token) {
      return <Navigate to="/sign-in" />;
  }

  const sidebarNames = [
    "Home",
    "Notifications",
    "Add Post",
    "Profile"
  ];

  const sidebarLinks = [
    {
      name: "/home",
      icon: mdilHome, 
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

          <LinkIcon mdil={mdilAccount} link="account" selected={selectedSidebar === 3} setSelected={ () => setSelectedSidebar(3) }/>
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

LinkIcon.propTypes = {
  mdil: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  setSelected: PropTypes.func,
};
