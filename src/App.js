import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'toastr/build/toastr.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/css/custom.css";
import "./styles/css/bootstrap.min.css";
import "./styles/css/swiper-bundle.min.css";
import "./styles/sass/style.scss";


import React, { useEffect } from "react";

import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import Dashboard from "./Components/Widgets/Dashboard";
import CreateGroup from "./Components/pages/Group/CreateGroup";
import PollingPage from "./Components/pages/Group/PollingPage";
import BrowseGroups from "./Components/pages/Group/BrowseGroups";
import ContactUs from "./Components/pages/ContactUs";
import { browse_groups, contact_us, create_group, polling_page } from "./Components/constent/Routes";

function App() {

  const [loading, setLoading] = useState(true);


  const [dark, setDark] = useState(false);


  //........... animation.....
  useEffect(() => {
    setLoading(true);
    AOS.init();

    setTimeout(() => {
      setLoading(false);

    }, 1500);



    if (localStorage.getItem("theme") === "dark") {
      setDark(true)
    }
    else {
      setDark(false)
    }
  }, []);
  config.autoAddCss = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}>

        </Route>
        <Route path="/SignUp" element={<SignUp />}>

        </Route>
        <Route path="/Dashboard" element={<Dashboard />}>


        </Route>
        <Route path={create_group} element={<CreateGroup />}></Route>
        <Route path={polling_page} element={<PollingPage />}></Route>
        <Route path={browse_groups} element={<BrowseGroups />}></Route>
        <Route path={contact_us} element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
