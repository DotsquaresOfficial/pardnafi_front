import { about_us, contact_us, dashboard, faq, sidebar } from "../constent/Routes";

const sideMenuList = [
  {
    id: 1,
    title: "Dashboard",
    route: dashboard,
    icon: "mdi mdi-home",
    is_show: "is_dashboard",
  },

  {
    id: 2,
    title: "FAQ",
    route: faq,
    icon: "mdi mdi-frequently-asked-questions",
    is_show: "is_promotion_banner",
  },





  {
    id: 3,
    title: "About Us",
    route: about_us,
    icon: "mdi mdi-menu-open",
    is_show: "is_promotion_banner",

  }, {
    id: 4,
    title: "Contact-us",
    route: contact_us,
    icon: "mdi mdi-menu-open",
    is_show: "is_promotion_banner",
  },






];
export default sideMenuList;
