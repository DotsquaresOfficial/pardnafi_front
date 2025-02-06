import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { group_details } from "../constent/Routes";
import { factoryContract, factoryContractAbi } from "../constent";

import Web3 from "web3";
import { getWeb3AuthEVMInstance } from "../auth/web3auth";
import {useGetGroupQuery} from "../../redux/groupApi"

const GroupCard = () => {
  const { data: record } = useGetGroupQuery();
  console.log(record,"data====")
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
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Select Group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="public">Public Group</option>
              <option value="private">Private Group</option>
            </select>
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
                    <a href="#" className="active" id="v-pills-one-tab" data-bs-toggle="pill" data-bs-target="#v-pills-one" type="button" role="tab" aria-controls="v-pills-one" aria-selected="true"><i className="fa-solid fa-arrow-right" />
                      <span>Group A</span></a>

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
                  
                  <div className="tab-pane fade show active" id="v-pills-one" role="tabpanel" aria-labelledby="v-pills-one-tab">
                    <img src="/images/team/group-23.png" alt className="img-fluid services-img" />
                    <h3 className="mb-3">Accounts Payables Services</h3>
                    <p className="text-justify">
                      An Accounts Payable Specialist is responsible for managing various key financial processes within the company. This
                      includes invoice and utility entry, ensuring accurate input of supplier invoices and utility bills for timely payments.
                      They also handle utility payments, ensuring that all utility-related bills are processed on time.
                    </p>
                   
                    
                    <br />
                    <p><strong>We provide Accounts Payable services for a wide range of clients, including:</strong></p>
                    <ul>
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Property Owners and Landlords:</strong>
                          <span>
                            Streamlining the processing of utility bills, vendor invoices, and maintaining accurate payment records for properties.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Real Estate Developers:</strong>
                          <span>
                            Managing complex payables related to construction, materials, and contractor services to ensure timely and accurate
                            payments.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Property Management Companies:</strong>
                          <span>
                            Handling recurring expenses, vendor reconciliations, and timely utility payments for properties under management.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Commercial Enterprises:</strong>
                          <span>
                            Assisting businesses with invoice entry, vendor management, and reconciliation to ensure smooth cash flow and maintain
                            vendor relationships.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Financial Institutions and Banks:</strong>
                          <span>
                            Ensuring that all payables, including utility bills and operational costs, are managed accurately for efficient
                            financial reporting.
                          </span>
                        </p>
                      </li>
                     
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Consulting and Legal Firms:</strong>
                          <span>
                            Managing payables for professional services, office supplies, and operational expenses to support business continuity.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <p>
                          <strong>Healthcare Providers:</strong>
                          <span>
                            Ensuring timely payment of vendor invoices, medical supplies, and services while maintaining accurate financial records.
                          </span>
                        </p>
                      </li>
                    </ul>
                    <p>
                      <strong>
                        We offer customized accounts payable solutions to streamline processes, reduce errors, and maintain vendor relations for
                        organizations across various industries.
                      </strong>
                    </p>
                  </div>
                  <div className="tab-pane fade" id="v-pills-two" role="tabpanel" aria-labelledby="v-pills-two-tab">
                    <img src="/images/team/group-23.png" alt className="img-fluid services-img" />
                    <h3 className="mb-3">Accounts Receivable Services</h3>
                    <p className="text-justify">
                      We provide comprehensive Accounts Receivable services to help businesses manage their incoming payments efficiently and
                      maintain a healthy cash flow. Our services include invoice generation and delivery, ensuring accurate billing and timely
                      distribution to clients. We handle payment tracking, following up on outstanding invoices to reduce delays and improve
                      collection rates. Our team also manages customer reconciliations, ensuring all payments are correctly applied to
                      outstanding balances and resolving any discrepancies promptly.
                    </p>
                    <p className="text-justify">
                      We assist with credit management, assessing the
                      creditworthiness of customers and setting appropriate credit limits to mitigate risk. Additionally, our services include
                      generating aged receivables reports, helping businesses stay on top of overdue payments and prioritize collections.
                      Through deposit posting and bank reconciliations, we ensure that all payments are accurately recorded and reconciled
                      with bank statements. We support businesses in optimizing their cash flow, reducing bad debt, and improving the overall
                      efficiency of their receivables process.
                    </p>
                    <br />
                    <p><strong>We provide Accounts Receivable services for a variety of industries, including:</strong></p>
                    <ul>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Property Owners and Landlords:</strong>
                          <span>
                            Managing rent collection, tenant invoicing, and timely follow-ups to ensure consistent cash flow.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Real Estate Developers:</strong>
                          <span>
                            Handling receivables related to project sales, deposits, and progress payments from buyers and clients.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Property Management Companies:</strong>
                          <span>
                            Overseeing tenant payments, maintaining accurate records, and managing outstanding balances for managed properties.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Commercial Enterprises:</strong>
                          <span>
                            Assisting businesses with invoicing, collections, and ensuring the timely receipt of payments for goods and services
                            rendered.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Financial Institutions and Banks:</strong>
                          <span>
                            Managing loan repayments, fees, and maintaining accurate records of customer receivables.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Consulting and Legal Firms:</strong>
                          <span>
                            Ensuring timely collection of fees for services rendered while maintaining strong client relationships.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Healthcare Providers:</strong>
                          <span>
                            Handling patient billing, insurance claims, and ensuring that payments are received promptly for services provided.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                          <strong>Manufacturers and Distributors:</strong>
                          <span>
                            Overseeing collections for product sales, ensuring smooth cash flow, and minimizing outstanding invoices.
                          </span>
                        </p>
                      </li>
                    </ul>
                    <p>
                      <strong>
                        We offer tailored Accounts Receivable services to help businesses efficiently manage collections, improve cash flow,
                        and minimize payment delays across various sectors.
                      </strong>
                    </p>
                  </div>
                  <div className="tab-pane fade" id="v-pills-three" role="tabpanel" aria-labelledby="v-pills-three-tab">
                    <img src="/images/team/group-23.png" alt className="img-fluid services-img" />
                    <h3 className="mb-3">Real Estate General Ledger Accounting Services</h3>
                    <p className="text-justify">
                      Our <strong>Property Accounts Services</strong> ensure financial precision and accuracy through a range of specialized accounting
                      processes. We guarantee <strong>Financial Month-End Precision</strong>, meticulously closing the books and providing detailed
                      financial reports. <strong>Bank Reconciliations</strong> are handled seamlessly, ensuring that all transactions match the company’s
                      records. Our team also offers <strong>Insurance Amortization Expertise</strong>, ensuring insurance costs are properly allocated over
                      the coverage period. With <strong>Journal Entry Virtuosity</strong>, we record all financial transactions with care, and provide
                      in-depth <strong>GL Analysis and Reconciliation</strong> to ensure the general ledger is always up to date and accurate.
                    </p>
                    <p className="text-justify">
                      We manage
                      <strong>Monthly Reserve Management</strong>, setting aside necessary funds for upcoming expenses and contingencies. Our services also
                      include <strong>Efficient Funds Transfer</strong>, optimizing cash flow by ensuring funds are transferred promptly and efficiently.
                      At year-end, we ensure <strong>Year-End Closure Excellence</strong>, completing all necessary processes to prepare for financial
                      year-end audits. Additionally, we provide <strong>Audit Support Excellence</strong>, assisting in audit preparation and offering
                      transparency in financial reporting. These services provide property owners and managers with complete, reliable, and
                      timely financial oversight.
                    </p>
                    <br />
                    <p><strong>We provide **Property Accounts Services** for a variety of clients, including:</strong></p>
                    <ul>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Property Owners and Landlords:</strong>
                          <span>
                            Offering comprehensive accounting support to manage rental income, expenses, and financial reporting.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Real Estate Developers:</strong>
                          <span>
                            Assisting with project financials, including budgeting, cost tracking, and monthly closing.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Property Management Companies:</strong>
                          <span>
                            Streamlining financial processes such as rent collection, bank reconciliations, and expense management.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Real Estate Investment Firms:</strong>
                          <span>
                            Managing financial reporting for property portfolios and ensuring accurate general ledger entries.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Commercial Real Estate Firms:</strong>
                          <span>
                            Providing tailored accounting services for large property holdings and complex transactions.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Construction Companies:</strong>
                          <span>
                            Overseeing financials related to construction projects, including monthly reserves and journal entries.
                          </span>
                        </p>
                      </li>
                      <li>
                        <i className="bi bi-check-circle" />
                        <p>
                          <strong>Real Estate Funds:</strong>
                          <span>
                            Supporting with audit preparation, year-end closure, and financial performance analysis for investment portfolios.
                          </span>
                        </p>
                      </li>
                    </ul>
                    <p>
                      <strong>
                        We offer customized accounting services designed to optimize financial operations and ensure accuracy across the real
                        estate industry.
                      </strong>
                    </p>
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
