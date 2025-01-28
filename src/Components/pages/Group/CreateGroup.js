import React, { useState } from 'react';
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import { Link } from 'react-router-dom'

import { InputValid } from '../../validations/InputValid';
import { toast } from 'react-toastify';
import { factoryContract, factoryContractAbi } from '../../constent';
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../../auth/web3auth';

const CreateGroup = () => {

    const [groupData, setGroupData] = useState({
        name: '',
        groupSize: 5,
        contribution: 100,
        frequency: 'Monthly',
        duration: 6,
        daoDepositSupport: false
    });
    const [groupDataErr, setGroupDataErr] = useState({
        name: '',
        groupSize: '',
        contribution: '',
        duration: '',
        daoDepositSupport: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;


        setGroupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


        let error = InputValid(name, value);
        setGroupDataErr((prevErr) => ({
            ...prevErr,
            [name]: error,
        }));
    };


    const handleDaoSupportChange = () => {
        setGroupData((prevData) => ({
            ...prevData,
            daoDepositSupport: !prevData.daoDepositSupport,
        }));
    };


    const handleCreateGroup = (e) => {
        e.preventDefault();

        for (let key in groupData) {
            let checkGroup = InputValid(key, groupData[key]);
            setGroupDataErr({ ...groupDataErr, [key]: checkGroup });
            if (checkGroup !== "") {
                return false;
            }
        }


        toast.success('Group Created: ' + JSON.stringify(groupData))
    };



    // ================contract integration=====================


    // address to send the token

//     const createGroup = async () => {
     
//     const provider=getWeb3AuthEVMInstance();
// const web3 = new Web3(provider.provider);
//         const data = new web3.eth.Contract(factoryContractAbi, factoryContract);

//         // const subscription = data.events.createGroup().send({_groupName,_paymentFrequency,_rules,_minimumContribution});

//         // subscription.on('data', console.log);
//     }


    return (
        <>
            <Header />
            <PageHeader title="Create Group" text="Create Group" />
            <section className="account padding-top padding-bottom sec-bg-color2">
                <div className="container">
                    <div
                        className="account__wrapper"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="account__content account__content--style1">
                                    <div className="account__header">
                                        <h2>Create New Group</h2>
                                        <p>
                                            Join the community and start saving together.
                                        </p>
                                    </div>

                                    {/* <div className="account__social">
                    <Link scroll={false} href="" className="account__social-btn">
                      <span>
                        <img
                          src="/images/others/google.svg"
                          alt="google icon"
                        />
                      </span>
                      Continue with google
                    </Link>
                  </div> */}

                                    {/* <div className="account__divider account__divider--style1">
                    <span>or</span>
                  </div> */}

                                    <form

                                        className="account__form needs-validation"
                                        onSubmit={handleCreateGroup}
                                    >
                                        <div className="row g-4">
                                            <div className="col-12 col-md-6">
                                                <div>
                                                    <label htmlFor="first-name" className="form-label">
                                                        Group Name
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="Group Name"
                                                        placeholder="Group Name"
                                                        name="name"
                                                        value={groupData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {groupDataErr.name && <span style={{ color: 'red' }}>{groupDataErr.name}</span>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div>
                                                    <label htmlFor="last-name-options" className="form-label">
                                                        Group Size (5 - 20 members)
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="groupSize"
                                                        value={groupData.groupSize}
                                                        onChange={handleChange}
                                                        min="5"
                                                        max="20"
                                                        placeholder="Group Size (5 - 20 members)"
                                                    />

                                                </div> {groupDataErr.groupSize && <span style={{ color: 'red' }}>{groupDataErr.groupSize}</span>}
                                            </div>

                                            <div className="col-12">
                                                <div>
                                                    <label htmlFor="account-email" className="form-label">
                                                        Contribution Amount per Cycle (£)
                                                    </label>
                                                    <input

                                                        className="form-control"
                                                        id="account-email"
                                                        placeholder="Contribution Amount per Cycle (£)"
                                                        type="text"
                                                        name="contribution"
                                                        value={groupData.contribution}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {groupDataErr.contribution && <span style={{ color: 'red' }}>{groupDataErr.contribution}</span>}
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-pass" className="form-label">
                                                        Payout Frequency
                                                    </label>

                                                    <select
                                                        className="form-select" aria-label="Default select example"
                                                        name="frequency"
                                                        value={groupData.frequency}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Weekly">Weekly</option>
                                                        <option value="Bi-weekly">Bi-weekly</option>
                                                        <option value="Monthly">Monthly</option>
                                                    </select>


                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-cpass" className="form-label">
                                                        Group Duration (months)
                                                    </label>
                                                    {/* <select className="form-control" id="last-name-options">
                          <option value="Doe">Doe</option>
                          <option value="Smith">Smith</option>
                        </select> */}
                                                    <select
                                                        className="form-select" aria-label="Default select example"
                                                        name="duration"
                                                        value={groupData.duration}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="3">3 Months</option>
                                                        <option value="6">6 Months</option>
                                                        <option value="12">12 Months</option>
                                                    </select>

                                                    {groupDataErr.duration && <span style={{ color: 'red' }}>{groupDataErr.duration}</span>}

                                                </div>

                                            </div>
                                            <div className="account__check">
                                                <div className="account__check-remember">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        value=""
                                                        id="terms-check"

                                                        checked={groupData.daoDepositSupport}
                                                        onChange={handleDaoSupportChange}
                                                    />
                                                    <label htmlFor="terms-check" className="form-check-label">
                                                        Enable DAO Deposit Support
                                                    </label>

                                                </div>

                                                {groupDataErr.daoDepositSupport && <span style={{ color: 'red' }}>{groupDataErr.daoDepositSupport}</span>}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                                        // onClick={handleCreateGroup}
                                        >
                                            Create Group
                                        </button>
                                    </form>

                                    {/* <div className="account__switch">
                    <p>
                      Don’t have an account yet? <Link to="/">Login</Link>
                    </p>
                  </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account__shape">
                    <span className="account__shape-item account__shape-item--1">
                        <img src="/images/contact/4.png" alt="shape-icon" />
                    </span>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default CreateGroup
