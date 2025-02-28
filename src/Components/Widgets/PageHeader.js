import { Link } from "react-router-dom";


const PageHeader = ({ title, text, data }) => {

  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }

  return (

    <>
      <section className="header-slider">
        <div className="container">
          <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
            <div className="joined-user-graph">
              <div className="group-details-title">
                <h2>{title}</h2>
                {title === "Group Details" ? <><p>{data?.description
                } </p>
                  <div className="address-hyperlink">
                    <h6><span>Address :</span> {shortenAddress(data?.groupAddress)}</h6>
                  </div></> : ""}
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
