import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PageHeader = ({ title, text, data }) => {

  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }
  const [showModal, setShowModal] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);

  // Function to shorten the description to 3 lines
  const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (

    <>
      <section className="header-slider">
        <div className="container">
          <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
            <div className="joined-user-graph">
              <div className="group-details-title">
                <h2>{title}</h2>
                {/* {title === "Group Details" ? <><p>{data?.description
                } </p>
                  <div className="address-hyperlink">
                    <h6><span>Address :</span> {shortenAddress(data?.groupAddress)}</h6>
                  </div></> : ""} */}
                   {title === "Group Details" && (
                <>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {isTruncated ? truncateText(data?.description, 200) : data?.description}
                    </p>

                    {data?.description.length > 120 && (
                        <Button 
                            variant="link" 
                            onClick={() => setShowModal(true)} 
                            style={{ padding: 0, textDecoration: "underline", color: "#fff" }}
                        >
                            View More
                        </Button>
                    )}

                    <div className="address-hyperlink">
                        <h6>
                            <span>Address :</span> {shortenAddress(data?.groupAddress)}
                        </h6>
                    </div>

                    {/* React Bootstrap Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Group Description</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{ whiteSpace: "pre-line" }}>{data?.description}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
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
