import { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../auth/web3auth';
import { groupAbi } from "../constent";
import { toast } from "react-toastify";
import CircularProgress from "./CircularProgress";
import { add_member } from "../constent/Routes";
import ConfirmationPopup from "../partials/modal/ConfirmationPopup";
import ConfirmationModal from "../modal/ConfirmationModal";
import FullPageLoader from "../loader/FullPageLoader";
import { useAuth } from "../../AuthContext";


const PageHeader = ({ title, text, data }) => {
  const { walletBalance } = useAuth();
  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }
  const [showModalView, setShowModalView] = useState(false);
  const [show, setShow] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const showPopup = () => { setIsOpen(true) };
  const closePopup = () => setIsOpen(false);

  // ================for confirmation join group =========
  const [isLoading, setIsLoading] = useState(null);
  const showConfirmationPopup = () => { setShow(true) };

  const handleJoin = async () => {
    await joinGroupHandler()
    setShow(false);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // const joinGroupHandler = async () => {
  //   setIsLoading(true);
  //   const provider = getWeb3AuthEVMInstance();

  //   const web3 = new Web3(provider.provider);
  //   const contract = new web3.eth.Contract(groupAbi, data?.groupAddress);
  //   const accounts = await web3.eth.getAccounts();
  //   const transaction = contract.methods.joinGroup(

  //   );

  //   transaction.send({ from: accounts[0] })
  //     .on('transactionHash', function (hash) {
  //       console.log(hash, "hash\========")

  //       const datas = {

  //       };

  //     })
  //     .on('receipt', function (receipt) {
  //       toast.success("Join successfully")
  //       setIsLoading(false);

  //       window.location.reload()



  //     })
  //     .on('error', function (error) {
  //       setIsLoading(false);
  //       console.error("Transaction failed=========", error);
  //       toast.error(error.message);
  //     });

  // }
  const joinGroupHandler = async () => {
    try {
      setIsLoading(true);
      const provider = getWeb3AuthEVMInstance();
      const web3 = new Web3(provider.provider);
      const contract = new web3.eth.Contract(groupAbi, data?.groupAddress);
      const accounts = await web3.eth.getAccounts();

      const transaction = contract.methods.joinGroup();


      const gasEstimate = await transaction.estimateGas({ from: accounts[0] });
      if (walletBalance === null || walletBalance < 0.01) {
        setIsLoading(false);
        toast.error("insufficient balance, Please topup your wallet.");
        return;
      }

      transaction.send({ from: accounts[0], gas: gasEstimate })
        .on("transactionHash", function (hash) {
          console.log(hash, "Transaction Hash");
        })
        .on("receipt", function (receipt) {
          toast.success("Joined successfully");
          setIsLoading(false);
          window.location.reload();
        })
        .on("error", function (error) {
          setIsLoading(false);

          if (error.message.includes("insufficient funds")) {
            toast.error("You have insufficient funds to complete this transaction.");
          } else {
            toast.error(error.message);
          }
        });

    } catch (error) {
      setIsLoading(false);
      console.error("Error joining group:", error);
      if (error.message.includes("insufficient funds")) {
        toast.error("You have insufficient funds to join this group.");
      } else {
        toast.error(error.message);
      }
    }
  };


  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [data?.description]);

  console.log(data?.description.length, "jjj")
  return (

    <>
      <>{isLoading ? <FullPageLoader /> : <> <section className="header-slider">
        <div className="container">
          <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
            <div className="joined-user-graph">
              <div className="group-details-title">
                <h2>{
                 title === "Group Details"? data?.groupName : title
                }</h2>

                {title === "Group Details" && (
                  <>

                    <p style={{ whiteSpace: "pre-line" }}>
                      {isTruncated ? truncateText(data?.description, 200) : data?.description}
                      
                    {data?.description.length >= 200 && (
                      <a
                        href="#"
                        onClick={() => setShowModalView(true)}

                      >
                        View More
                      </a>
                    )}
                    </p>



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

                   <div className="group-descrption-popup"> <Modal show={showModalView} onHide={() => setShowModalView(false)} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Group Description</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p style={{ whiteSpace: "pre-line" }}>{data?.description}</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalView(false)}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </div></>
                )}
              </div>

              <div className="user-status-graph">
                {title == "Group Details" ? <><CircularProgress value={data && data.members.length
                } total={data && data.groupSize} />
                  <div className="join-userdata"><a href="#" className="trk-btn trk-btn--border trk-join">

                    <span onClick={!data?.isJoined ? showConfirmationPopup : ""}>{data?.isJoined ? "Already Joined" : "Join Group"}</span>

                  </a>
                    <a href={add_member} className="trk-btn trk-btn--border trk-join">
                      <span onClick={() => (!data?.isOwner) ? showPopup : ""}>{"Group Settings"}</span>
                    </a></div> </> : ""}
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
        </section></>}</>


      <ConfirmationModal
        show={show}
        handleClose={() => setShow(false)}
        handleConfirm={handleJoin}
        title="Group Join Confirmation"
        message="Are you sure you want to Join this Group?"
      />


    </>
  );
};

export default PageHeader;
