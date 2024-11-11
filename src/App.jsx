import { useState } from 'react';
import './App.css';
import { NavTop } from "./components/HomepageNav.jsx";
import Footer from "./components/HomepageFooter.jsx";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
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
    </>
  )
}

export default App;
