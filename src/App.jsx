import React from "react";
import About from "./components/About"
import Nav from "./components/Navbar"
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Ecommerce from "./pages/Ecommerce";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import {Route,Routes} from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "/about" element={<About />} />
        <Route path= "/e-com" element={<Ecommerce />} />
        <Route path= "/contact" element={<Contact />} />
        <Route path= "/profile" element={<Profile />} />
        <Route path= "/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
