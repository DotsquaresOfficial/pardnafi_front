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
import FullPageLoader from "../loader/FullPageLoader";

const GroupCard = () => {
  // const { data: record, isLoading } = useGetGroupQuery();
  const { connectWallet } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState("public");
  const [pricingData, setPricingData] = useState([]);
  const [search, setSearch] = useState("");
  const [frequency, setFrequency] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const  record = [
    {
      "createdAt": "2025-03-06T05:42:17.751Z",
      "createdBy": "67c6e44c3add8fc048eef349",
      "description": "this is description",
      "duration": 30,
      "frequencyPrice": "10.0",
      "frequencyTime": 30,
      "groupAddress": "0xCa447A0F9721697ec1DAA415Bf77fE832f31612C",
      "groupId": "c436fd21-698a-41ee-af9d-0a9d0e592d3b",
      "groupImage": "https://img.freepik.com/free-vector/diverse-group-people-savings-concept-illustration_53876-26826.jpg",
      "groupName": "Ram",
      "groupSize": "5",
      "invites": [
        {
          "_id": "67c93b13217e5be8e72b8934",
          "memberId": "67c93763217e5be8e72b88ba"
        }
      ],
      "isDaoSupported": true,
      "isDeleted": false,
      "isPublic": true,
      "members": [],
      "owner": "0x34C9E7B953b1c864cB4Bf6A9E5E5a159aDb5B8F9",
      "txHash": "0x55674157f0228b5ef6e0fa1b28872d51ff22d41136e936b4535fa5951ee8fb93",
      "updatedAt": "2025-03-06T06:05:07.489Z",
      "__v": 1,
      "_id": "67c935b9217e5be8e72b8888"
    },  {
      "createdAt": "2025-03-06T05:42:17.751Z",
      "createdBy": "67c6e44c3add8fc048eef349",
      "description": "this is description",
      "duration": 30,
      "frequencyPrice": "10.0",
      "frequencyTime": 30,
      "groupAddress": "0xCa447A0F9721697ec1DAA415Bf77fE832f31612C",
      "groupId": "c436fd21-698a-41ee-af9d-0a9d0e592d3b",
      "groupImage": "https://img.freepik.com/free-vector/diverse-group-people-savings-concept-illustration_53876-26826.jpg",
      "groupName": "krishan",
      "groupSize": "5",
      "invites": [
        {
          "_id": "67c93b13217e5be8e72b8934",
          "memberId": "67c93763217e5be8e72b88ba"
        }
      ],
      "isDaoSupported": true,
      "isDeleted": false,
      "isPublic": true,
      "members": [],
      "owner": "0x34C9E7B953b1c864cB4Bf6A9E5E5a159aDb5B8F9",
      "txHash": "0x55674157f0228b5ef6e0fa1b28872d51ff22d41136e936b4535fa5951ee8fb93",
      "updatedAt": "2025-03-06T06:05:07.489Z",
      "__v": 1,
      "_id": "67c935b9217e5be8e72b8888"
    },
 
  ]
  const [selectedGroupId, setSelectedGroupId] = useState(
    record?.length > 0 ? record[0]?.groupId : null
  );


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


  useEffect(() => {
    if (record?.length > 0) {
      setSelectedGroupId(record[0]?.groupId); 
    }
  }, [record]);

  const handleTabClick = (groupId) => {
    setSelectedGroupId(groupId);
  };

  return (
    <>
      {/* {isLoading ? <FullPageLoader /> :  */}
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
                  <h4>Groups List</h4>
                  <div className="services-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">



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
                    {record && record?.filter((item) =>
                      item?.groupName.toLowerCase().includes(search.toLowerCase())
                    ).map((item, index) => (
                      <GroupDetails item={item} index={index} selectedGroupId={selectedGroupId} />
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

