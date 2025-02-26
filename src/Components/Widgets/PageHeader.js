import { Link } from "react-router-dom";


const PageHeader = ({ title, text }) => {

  return (
    <>
      <section className="header-slider">
        <div className="container">
          <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
            <div className="joined-user-graph">
            <div className="group-details-title">
            <h2>{title}</h2>
            <p>Group Description: Creative Minds is a group of passionate individuals who come 
          together to explore and share ideas, collaborate on projects, and inspire each other
          in a fun and supportive environment. Whether you're a writer, artist, designer, 
          or someone with a creative spirit, this group is for you. </p>
          <div className="address-hyperlink">
           <h6><span>Address :</span> 0xd3...kgh9</h6>
          </div>
          </div>

          <div className="user-status-graph">

          </div>

          </div>
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
