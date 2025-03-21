import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from 'react-toastify';

import "@fortawesome/fontawesome-free/css/all.min.css";

import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/css/custom.css";
import "./styles/css/bootstrap.min.css";
import "./styles/css/swiper-bundle.min.css";
import "./styles/sass/style.scss";
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import Dashboard from "./Components/Widgets/Dashboard";
import CreateGroup from "./Components/pages/Group/CreateGroup";
import PollingPage from "./Components/pages/Group/PollingPage";
import BrowseGroups from "./Components/pages/Group/BrowseGroups";
import ContactUs from "./Components/pages/ContactUs";
import { browse_groups,my_group,active_groups, change_password, contact_us, create_group, dashboard, forgot_password, group_details, home, loginRoute, onfidoKyc, polling_page, register, user_profile, add_member, active_group, community_engagement } from "./Components/constent/Routes";
import ForgotPassword from "./Components/auth/ForgotPassword";
import ChangePassword from "./Components/auth/ChangePassword";
import Profile from "./Components/pages/User/Profile";
import GroupDetails from "./Components/pages/Group/GroupDetails";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import OnfidoKyc from "./Components/pages/Kyc/OnfidoKyc";
import Layout from "./layout/layout";
import MyGroups from "./Components/pages/Group/MyGroups";
import ActiveGroups from "./Components/pages/Group/ActiveGroups";
import AddMember from "./Components/partials/AddMember";
import ResetPassword from "./Components/auth/ResetPassword";
import ActiveGroupCard from "./Components/pages/Community/ActiveGroupCard";

function App() {
  const { login ,walletAddress } = useAuth();
  useEffect(() => {
    const jwtToken = localStorage?.getItem("jwtToken");
    if (jwtToken && walletAddress===null) {
      login();
    }
  }, [login]);
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
    <>
      <BrowserRouter>
      <Layout>
        <Routes>
          
          <Route path={home} element={<SignIn />} />
          <Route path={loginRoute} element={<SignIn />} />
          <Route path={register} element={<SignUp />} />
          <Route path={forgot_password} element={<ForgotPassword />} />
          <Route path={contact_us} element={<ContactUs />} />
          <Route path="/reset-password/:otp" element={<ResetPassword />} />
          {/* <Route path={group_details} element={<GroupDetails />} /> */}



          {/*============== protect route========================== */}
          <Route path={onfidoKyc} element={<ProtectedRoute component={<OnfidoKyc />} />} />
          <Route path={change_password} element={<ProtectedRoute component={<ChangePassword />} />} />
          <Route path={browse_groups} element={<ProtectedRoute component={<BrowseGroups />} />} />
          <Route path={dashboard} element={<ProtectedRoute component={<Dashboard />} />} />
          <Route path={user_profile} element={<ProtectedRoute component={<Profile />} />} />
          <Route path={create_group} element={<ProtectedRoute component={<CreateGroup />} />} />

          <Route path={my_group} element={<ProtectedRoute component={<MyGroups />} />} />
          <Route path={active_group} element={<ProtectedRoute component={<ActiveGroups />} />} />
          <Route path={active_groups} element={<ProtectedRoute component={<ActiveGroups />} />} />

          <Route path={group_details} element={<ProtectedRoute component={<GroupDetails />} />} />
          <Route path={polling_page} element={<ProtectedRoute component={<PollingPage />} />} />
          <Route path={add_member} element={<ProtectedRoute component={<AddMember />} />} />
          <Route path={community_engagement} element={<ProtectedRoute component={<ActiveGroupCard />} />} />
          {/* <Route path={community_engagement} element={<ActiveGroupCard />} /> */}
         
          
        </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer /></>
  );
}

export default App;
