import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../auth/web3auth';
import { factoryContract, factoryContractAbi, groupAbi } from "../constent";
import { toast } from "react-toastify";

const PageHeader = ({ title, text, data }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isJoined, setIsJoined] = useState(null);
  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }
  const [showModal, setShowModal] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

 
  useEffect(() => {

    handleJoinGroup();

  }, []);
  const handleJoinGroup = async () => {
    try {
     
      const provider = getWeb3AuthEVMInstance();
      await provider.init();

      const web3 = new Web3(provider.provider);
      const contract = new web3.eth.Contract(factoryContractAbi, factoryContract);
      // Get user's accounts
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts,"accounts")
      setWalletAddress(accounts[0])
      const transaction = contract.methods.isJoined(data?.groupAddress, accounts[0]);

      const isJoined = await transaction.call();
      // console.log("call111=============")
      // console.log(isJoined, "isJoined==")

      setIsJoined(isJoined);
    } catch (error) {
      console.error("Error fetching groups list:", error);
    }
  };

  const joinGroupHandler = async () => {

    const provider = getWeb3AuthEVMInstance();
    // console.log("call1")
    // // await provider.initModal();
    // console.log("call2")
    // // await provider.connect();
    // console.log("call3")
    const web3 = new Web3(provider.provider);
    const contract = new web3.eth.Contract(groupAbi, data?.groupAddress);
    const accounts = await web3.eth.getAccounts();

    setWalletAddress(accounts[0])
    const transaction = contract.methods.joinGroup(

    );
    // getUserWalletBalanceAndAccount

    transaction.send({ from: walletAddress })
      .on('transactionHash', function (hash) {
        console.log(hash, "hash\========")

        const datas = {

        };

        // setGroup(datas).then((result) => {

        //     if (result?.data
        //         ?.success) {
        //         toast.success(result.data?.message);

        //         // navigate(browse_groups)
        //     } else {
        //         toast.error(result.data?.message);
        //     }
        // });
      })
      .on('receipt', function (receipt) {

        console.log("Transaction successful", receipt);
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
              {title === "Group Details" && ( <a href="#" className="trk-btn trk-btn--border trk-join">

                 <span onClick={() => isJoined ? joinGroupHandler() : ""}>{data.isJoined ? "Already Joined" : "Join Group"}</span>
                </a>)}
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
