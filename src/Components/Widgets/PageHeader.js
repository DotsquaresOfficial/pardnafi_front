import { Link } from "react-router-dom";


const PageHeader = ({ title, text }) => {

  return (
    <>
      <section className="header-slider">
        <div className="container">
          <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
            <h2>{title}</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1"><img src="/images/header/2.png"
              alt="shape-icon" /></span>
          </div>
        </div>
      </section>

      <section className="details-grouppage">
        <div className="container">

        </div>
      </section>



    </>
  );
};

export default PageHeader;
