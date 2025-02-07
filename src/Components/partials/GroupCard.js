import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { group_details } from "../constent/Routes";
import { factoryContract, factoryContractAbi } from "../constent";

import Web3 from "web3";
import { getWeb3AuthEVMInstance } from "../auth/web3auth";
import { useGetGroupQuery } from "../../redux/groupApi"

const GroupCard = () => {
  const { data: record } = useGetGroupQuery();
  console.log(record, "hhh")
  const [selectedGroup, setSelectedGroup] = useState("public");
  const [pricingData, setPricingData] = useState([]);


  const [search, setSearch] = useState("");
  const [frequency, setFrequency] = useState("");
  const [minContribution, setMinContribution] = useState("");

  const filteredGroups = pricingData.filter((group) => {
    // return (
    //   group.name.toLowerCase().includes(search.toLowerCase()) &&
    //   (frequency ? group.frequency === frequency : true) &&
    //   (minContribution ? group.contribution >= parseFloat(minContribution) : true)
    // );
  });

  const publicGroupData = [
    {
      id: 1,
      title: "Basic",
      price: "$99/Monthly",
      details: [
        "Contribution: $100 per cycle",
        "Frequency: Monthly",
        "Duration: 12 Months",
        "Rules: No late payments",
      ],
    },
    {
      id: 2,
      title: "Standard",
      price: "$149/Monthly",
      details: [
        "Contribution: $200 per cycle",
        "Frequency: Weekly",
        "24/7 technical support",
        "Duration: 8 Months",
        "Rules: No late payments",
      ],
    },
    {
      id: 3,
      title: "Premium",
      price: "$199/Monthly",
      details: [
        "Contribution: $500 per cycle",
        "Frequency: Yearly",
        "Duration: 9 Months",
        "Rules: No late payments",
      ],
    },
  ];

  const privateGroupData = [
    {
      id: 1,
      title: "Starter",
      price: "$79/Monthly",
      details: [
        "Contribution: $80 per cycle",
        "Frequency: Monthly",
        "Duration: 10 Months",
        "Rules: No late payments",
      ],

    },
    {
      id: 2,
      title: "Advanced",
      price: "$129/Monthly",
      details: [
        "Contribution: $300 per cycle",
        "Frequency: Biweekly",
        "Duration: 6 Months",
        "Rules: Flexible payments",
      ],
    },
    {
      id: 3,
      title: "Pro",
      price: "$189/Monthly",
      details: [
        "Contribution: $400 per cycle",
        "Frequency: Monthly",
        "Duration: 7 Months",
        "Rules: Strict payments",
      ],
    },
    {
      id: 4,
      title: "Elite",
      price: "$249/Monthly",
      details: [
        "Contribution: $600 per cycle",
        "Frequency: Yearly",
        "Duration: 12 Months",
        "Rules: VIP Support Included",
      ],

    },
  ];

  // ================contract integration=====================
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
      } else {
        console.error("Ethereum provider not found. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await connectWallet();
      // await getGroupsList();
    };

    initialize();
  }, []);

  // const getGroupsList = async () => {
  //   try {
  //     const provider = getWeb3AuthEVMInstance();

  //     try {

  //       await provider.initModal();
  //       await provider.connect();
  //     } catch (error) {
  //       console.error("Web3Auth error:", error);
  //     }
  //     const web3 = new Web3(provider.provider);

  //     const contract = new web3.eth.Contract(factoryContractAbi, factoryContract);

  //     const symbol = await contract.methods.getGroupsList().call();
  //     setPricingData(symbol)


  //     console.log("Groups List:", symbol);
  //     return symbol;
  //   } catch (error) {
  //     console.error("Error fetching groups list:", error);
  //   }
  // };

  // useEffect(() => {
  //   getGroupsList();
  // }, []);


  useEffect(() => {
    if (selectedGroup === "public") {
      setPricingData(publicGroupData);
    } else {
      setPricingData(privateGroupData);
    }
  }, [selectedGroup]);

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
              <div className="savingciub-price">
                <ul className="mt-4">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((group, index) => (
                      <li key={index} className="p-2 border-b last:border-none">
                        <strong>{group.name}</strong> - {group.frequency} - ${group.contribution}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No groups found.</p>
                  )}
                </ul>
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

          {/* Pricing Cards */}
          <div className="pricing__wrapper">
            {/* <div className="row g-4 align-items-center">
              {pricingData.map((item) => (
                <div className="col-md-6 col-lg-4" key={item.id}>
                  <div className="pricing__item" data-aos="fade-up" data-aos-duration="1000">
                    <div className="pricing__item-inner">
                      <div className="pricing__item-content">

                        <div className="pricing__item-top">
                          <h6 className="mb-15">{item.title}</h6>
                          <h3 className="mb-25">{item.price}</h3>
                        </div>

                        <div className="pricing__item-middle">
                          <ul className="pricing__list">
                            {item.details.map((detail, index) => (
                              <><li className="pricing__list-item" key={index}>
                                <span>
                                  <img src="/images/icon/check.svg" alt="check" className="dark" />
                                </span>
                                {detail}
                              </li>

                              </>

                            ))}
                          </ul>
                        </div>
                       <div className="viewmore-details">
                       <Link to={group_details} className="">
                          View Details
                        </Link>
                       </div>


                        <div className="pricing__item-bottom">
                          <a href="#" className="trk-btn trk-btn--outline">
                            Join Group
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        <div id="service-details" className="service-details section">
          <div className="container">
            <div className="row gy-4 gy-lg-5">
              <div className="col-lg-4 d-none d-lg-block">
                <div className="service-box">
                  <h4>Services List</h4>
                  <div className="services-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {/* {record&&record.map((item)=>{
                    return<><a href="#" className="active" id="v-pills-one-tab" data-bs-toggle="pill" data-bs-target="#v-pills-one" type="button" role="tab" aria-controls="v-pills-one" aria-selected="true"><i className="fa-solid fa-arrow-right" />
                     <span>{item?.groupName}</span> </a></>
                   })}  */}

                    {record && record.map((item, index) => (
                      <a
                        key={item?.groupId}
                        href="#"
                        className={`nav-link ${index === 0 ? "active" : ""}`} // Activate first tab by default
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
                      </a>
                    ))}

                    {/* <a href="#" id="v-pills-two-tab" data-bs-toggle="pill" data-bs-target="#v-pills-two" type="button" role="tab" aria-controls="v-pills-two" aria-selected="false"><i class="fa-solid fa-arrow-right"></i><span>Group B</span></a>
                    <a href="#" id="v-pills-three-tab" data-bs-toggle="pill" data-bs-target="#v-pills-three" type="button" role="tab" aria-controls="v-pills-three" aria-selected="false"><i class="fa-solid fa-arrow-right"></i><span>Group c</span></a> */}

                  </div>
                </div>

              </div>
              <div className="col-lg-8 ps-lg-4">
                <div className="service-box d-block d-lg-none mb-4">
                  <h4>Serices List</h4>
                  <div className="services-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a href="#" className="active" id="v-pills-one-tab" data-bs-toggle="pill" data-bs-target="#v-pills-one" type="button" role="tab" aria-controls="v-pills-one" aria-selected="true"><i class="fa-solid fa-arrow-right"></i><span>Accounts Payables Services</span></a>
                    <a href="#" id="v-pills-two-tab" data-bs-toggle="pill" data-bs-target="#v-pills-two" type="button" role="tab" aria-controls="v-pills-two" aria-selected="false"><i class="fa-solid fa-arrow-right"></i><span>Accounts
                      Receivable Services</span></a>
                    <a href="#" id="v-pills-three-tab" data-bs-toggle="pill" data-bs-target="#v-pills-three" type="button" role="tab" aria-controls="v-pills-three" aria-selected="false"><i class="fa-solid fa-arrow-right"></i><span>Real Estate General Ledger Accounting Services</span></a>
                    {/* <a href="#"><i class="bi bi-arrow-right-circle"></i><span>Graphic Design</span></a>
                                  <a href="#"><i class="bi bi-arrow-right-circle"></i><span>Marketing</span></a> */}
                  </div>
                </div>{/* End Services List */}
                <div className="tab-content" id="v-pills-tabContent">

                  <div className="tab-content" id="v-pills-tabContent">
                    {record && record?.map((item, index) => (
                      <div
                        key={item?.groupId}
                        className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                        id={`v-pills-${index}`}
                        role="tabpanel"
                        aria-labelledby={`v-pills-${index}-tab`}
                      >
                        <img src={item?.groupImage || "/images/team/group-23.png"} alt={item?.groupName} className="img-fluid services-img" />
                        <h3 className="mb-3">{item?.groupName || "Group Name"}</h3>


                        <br />
                        <p><strong>Group Details :</strong></p>
                        <ul>

                          <li><i className="fa-solid fa-check"></i> <strong>Group Contribution Per Cycle : </strong> <span>{item?.frequencyPrice
                          }£</span></li>
                          <li><i className="fa-solid fa-check"></i> <strong>Group Payout Frequency : </strong> <span>{item?.frequencyTime
                          } Days</span></li>



                          <li><i className="fa-solid fa-check"></i> <strong>Group Duration : </strong> <span>{item?.
                            duration
                          } Months</span></li>
                          <li><i className="fa-solid fa-check"></i> <strong>Group Created By : </strong> <span>{item?.
                            owner
                          } </span></li>


                          <li><i className="fa-solid fa-check"></i> <strong>Max Group Members : </strong> <span>{item?.groupSize
                          }</span></li>

                          <li><i className="fa-solid fa-check"></i> <strong>Created At : </strong> <span>{new Date(item?.createdAt).toLocaleString()}</span></li>

                        </ul>

                        <p><strong>Group Members : </strong></p>
                        {item?.members?.length > 0 ? (
                          <ul>
                            {item?.members?.map((member, i) => (
                              <li key={i}><i className="fa-solid fa-user"></i> {member}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No members yet.</p>
                        )}

                        <p className="text-justify"> <strong>Group Rules : </strong>  {item?.description || "No description available."}</p>
                      </div>
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
