import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { group_details } from "../constent/Routes";
import { factoryContract, factoryContractAbi } from "../constent";

import Web3 from "web3";
import { getWeb3AuthEVMInstance } from "../auth/web3auth";
import { useGetGroupQuery } from "../../redux/groupApi"
import { getAccounts } from "../auth/web3RPC";
import GroupDetails from "./GroupDetails";
import { useAuth } from "../../AuthContext";

const GroupCard = () => {
  const { data: record } = useGetGroupQuery();
  const {connectWallet}= useAuth();
  const [selectedGroup, setSelectedGroup] = useState("public");
  const [pricingData, setPricingData] = useState([]);
  const [search, setSearch] = useState("");
  const [frequency, setFrequency] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(
    record?.length > 0 ? record[0]?.groupId : null
);

  // const filteredGroups = record.filter((group) => {
  //   // return (
  //   //   group.name.toLowerCase().includes(search.toLowerCase())
  //   // );
  // });
 



  // ================contract integration=====================
  // const connectWallet = async () => {
  //   try {
  //     if (window.ethereum) {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       console.log("Wallet connected");
  //     } else {
  //       console.error("Ethereum provider not found. Please install MetaMask.");
  //     }
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // };

  useEffect(() => {
    const initialize = async () => {
    //  await connectWallet();
      // await getGroupsList();
    };

    initialize();
    getUserWalletAddress()
  }, []);


  const getUserWalletAddress = async () => {
    try {

      await connectWallet()
      const provider = getWeb3AuthEVMInstance();
      try {
        const address = await getAccounts(provider);

        setWalletAddress(address)
      } catch (error) {
        console.log(error, "error")
      }
    } catch (error) {
      console.log(error, "error")
    }
  }




  // useEffect(() => {
  //   isJoinCheck();
  // }, []);


  // useEffect(() => {
  //   if (selectedGroup === "public") {
  //     setPricingData(publicGroupData);
  //   } else {
  //     setPricingData(privateGroupData);
  //   }
  // }, [selectedGroup]);



useEffect(() => {
    if (record?.length > 0) {
        setSelectedGroupId(record[0]?.groupId); // Set first item active by default
    }
}, [record]);

  const handleTabClick = (groupId) => {
    setSelectedGroupId(groupId);
  };

  return (
    <>
      <section className="pricing padding-top padding-bottom dash-sec">
        <div class="container">
          <div className="section-header ">
            {/* <h2 className="mb-15 mt-minus-5">Browse Group</h2> */}
            <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">

              <h2 className="text-xl font-bold mb-4">Search & Filter Groups</h2>
              <div className="saving-cost">
                <div className="search-filtersgroup">
                  <input
                    type="text"
                    placeholder="Search groups by name..."
                    className="w-full p-2 mb-2 border rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {/* Group Selector */}
          <div className="private-govermrnt">
            {/* <select
              className="form-select form-select-lg mb-3"
              aria-label="Select Group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="public">Public Group</option>
              <option value="private">Private Group</option>
            </select> */}
          </div>


          <div className="pricing__wrapper">

          </div>
        </div>

        <div id="service-details" className="service-details section">
          <div className="container">
            <div className="row gy-4 gy-lg-5">
              <div className="col-lg-4 d-none d-lg-block">
                <div className="service-box">
                  <h4>Services List</h4>
                  <div className="services-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">


                    {/* {record && record.map((item, index) => {
                      console.log()
                      return <> <a
                        key={item?.groupId}
                        href="#"
                        className={`nav-link ${index === 0 ? "active" : ""}`}
                        id={`v-pills-${index}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#v-pills-${index}`}
                        type="button"
                        role="tab"
                        aria-controls={`v-pills-${index}`}
                        aria-selected={index === 0 ? "true" : "false"}
                      >
                        <i className="fa-solid fa-arrow-right" />
                        <span>{item?.groupName}</span>
                      </a></>
                    }

                    )} */}

                    {record && record.filter((item) =>
    item.groupName.toLowerCase().includes(search.toLowerCase())
  ).map((item, index) => (
                      <a
                        key={item?.groupId}
                        href="#"
                        className={`nav-link ${selectedGroupId === item?.groupId ? "active" : ""}`}
                        id={`v-pills-${index}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#v-pills-${index}`}
                        type="button"
                        role="tab"
                        aria-controls={`v-pills-${index}`}
                        aria-selected={selectedGroupId === item?.groupId}
                        onClick={() => handleTabClick(item?.groupId)}
                      >
                        <i className="fa-solid fa-arrow-right" />
                        <span>{item?.groupName}</span>
                      </a>
                    ))}



                  </div>
                </div>

              </div>
              <div className="col-lg-8 ps-lg-4">

                <div className="tab-content" id="v-pills-tabContent">

                  <div className="tab-content" id="v-pills-tabContent">
                    {record && record.filter((item) =>
    item.groupName.toLowerCase().includes(search.toLowerCase())
  ).map((item, index) => (
                      <GroupDetails key={item?.groupId} item={item} index={index} selectedGroupId={selectedGroupId} />
                    ))}

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>



    </>
  )
}

export default GroupCard

