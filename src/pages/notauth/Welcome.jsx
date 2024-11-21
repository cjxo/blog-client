import { useState } from 'react';
import './welcome.css';
import { NavTop } from "../../components/HomepageNav.jsx";
import Footer from "../../components/HomepageFooter.jsx";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../components/AuthProvider.jsx";

window.addEventListener("storage", (e) => {
  if (event.key === "logout") {
    console.log('logged out.');
  }
});

const WelcomePage = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <div>Loading...</div>;  // Or any loading spinner... 
  }

  if (auth.token) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div style={{flexGrow:1}}>
        <nav>
          <NavTop
            forSignIn={location.pathname === '/sign-in'}
            forSignUp={location.pathname === '/sign-up'}
          />
        </nav>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default WelcomePage;
