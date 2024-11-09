import { useState } from 'react';
import './App.css';
import { NavTop } from "./components/HomepageNav.jsx";
import Footer from "./components/HomepageFooter.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <NavTop />
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
