import { Outlet } from "react-router-dom";
import Header from "../Components/Widgets/Header";
import Footer from "../Components/Widgets/Footer";


const Layout = ({ children }) => {
    return (
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  };

export default Layout;
