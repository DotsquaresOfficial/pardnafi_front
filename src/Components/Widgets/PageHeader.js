import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../auth/web3auth';
import { groupAbi } from "../constent";
import { toast } from "react-toastify";
import CircularProgress from "./CircularProgress";
import { add_member } from "../constent/Routes";
import ConfirmationPopup from "../partials/modal/ConfirmationPopup";


const PageHeader = ({ title, text, data }) => {

  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }
  const [showModal, setShowModal] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const showPopup = () => { setIsOpen(true) };
  const closePopup = () => setIsOpen(false);


  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const joinGroupHandler = async () => {
    debugger;
    const provider = getWeb3AuthEVMInstance();

    const web3 = new Web3(provider.provider);
    const contract = new web3.eth.Contract(groupAbi, data?.groupAddress);
    const accounts = await web3.eth.getAccounts();
    const transaction = contract.methods.joinGroup(

    );

    transaction.send({ from: accounts[0] })
      .on('transactionHash', function (hash) {
        console.log(hash, "hash\========")

        const datas = {

        };

      })
      .on('receipt', function (receipt) {
        toast.success("Join successfully")
        setTimeout(() => {
          window.location.reload()
        }, 1500);


      })
      .on('error', function (error) {
        console.error("Transaction failed=========", error);
        toast.error(error.message);
      });

  }
  return (

    <>
      <section className="header-slider">
        <div className="container">
          <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
            <div className="joined-user-graph">
              <div className="group-details-title">
                <h2>{title}</h2>

                {title === "Group Details" && (
                  <>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {isTruncated ? truncateText(data?.description, 200) : data?.description}
                    </p>


                    {data?.description.length > 120 && (
                      <Button
                        variant="link"
                        onClick={() => setShowModal(true)}
                       
                      >
                        View More
                      </Button>
                    )}

                    <div className="address-hyperlink">
                      <h6>

                        <span>Address :</span> <a href={`https://sepolia.basescan.org/address/${data?.groupAddress}`} target="_blank">{shortenAddress(data?.groupAddress)}</a>
                      </h6> <br />

                    </div>
                    <div className="address-hyperlink">
                      <h6>


                        <span >Transaction Hash :</span> <a href={`https://sepolia.basescan.org/tx/${data?.txHash}`} target="_blank">{shortenAddress(data?.txHash)}</a>
                      </h6>
                    </div>

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
                {/* 70% filled */}

                {title == "Group Details" ? <><CircularProgress value={data && data.members.length
                } total={data && data.groupSize} />
                  <div className="join-userdata"><a href="#" className="trk-btn trk-btn--border trk-join">

                    <span onClick={() => (!data?.isJoined) ? showPopup : ""}>{data?.isJoined ? "Already Joined" : "Join Group"}</span>

                  </a>
                    {data?.isOwner && <a href={add_member} className="trk-btn trk-btn--border trk-join">

                      <span onClick={() => (!data?.isOwner) ? showPopup : ""}>{data?.isOwner
                        && "Group Management"}</span>
                    </a>}</div> </> : ""}
              </div>

            </div>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1"><img src="/images/header/2.png"
              alt="shape-icon" /></span>
          </div>
        </div>
      </section>
      {isOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Are you sure?</h2>
                        <p>Do you really want to proceed?</p>
                        <div className="popup-buttons">
                            <button className="confirm-btn" onClick={joinGroupHandler}>Yes</button>
                            <button className="cancel-btn" onClick={closePopup}>No</button>
                        </div>
                    </div>
                </div>
            )}
      <section className="details-grouppage">
        <div className="container">

        </div>
      </section>




    </>
  );
};

export default PageHeader;
