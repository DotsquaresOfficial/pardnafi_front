import React, { useState, useEffect } from 'react';
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import { factoryContract, factoryContractAbi } from '../../constent';
import Web3 from 'web3';
import { GroupValidation } from '../../validations/GroupValidation';
import { useSetGroupMutation } from "../../../redux/groupApi";
import { CircularProgress } from '@mui/material';
import { browse_groups } from '../../constent/Routes';
import { useAuth } from '../../../AuthContext';

const CreateGroup = () => {
    const { walletAddress, walletBalance, provider } = useAuth()
    const [setGroup] = useSetGroupMutation();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [groupData, setGroupData] = useState({
        name: '',
        groupSize: '',
        contribution: '',
        frequency: '30',
        duration: '',
        description: "",
        daoDepositSupport: false,
        isPublic: false
    });
    const [groupDataErr, setGroupDataErr] = useState({
        name: '',
        groupSize: '',
        contribution: '',
        frequency: '',
        duration: '',
        description: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;


        setGroupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


        let error = GroupValidation(name, value);

        setGroupDataErr((prevErr) => ({
            ...prevErr,
            [name]: error,
        }));
    };
    const handleKeyDown = (event) => {
        if (event.key === " " || event.keyCode === 32) {
            event.preventDefault();
        }
    };

    const handleDaoSupportChange = () => {
        setGroupData((prevData) => {
            return {
                ...prevData,
                daoDepositSupport: !prevData.daoDepositSupport, // Toggle value
            };
        });
    };
    const handleIsPublicChange = () => {
        setGroupData((prevData) => {
            return {
                ...prevData,
                isPublic: !prevData.isPublic, // Toggle value
            };
        });
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        let errors = {};
        let hasError = false;

        for (let key in groupData) {
            if (key === "daoDepositSupport") continue;

            let checkGroup = GroupValidation(key, groupData[key]);
            errors[key] = checkGroup;

            if (checkGroup) {
                hasError = true;
            }
        }


        setGroupDataErr(errors);

        if (hasError) {
            return;
        }



        try {
            await createGroups();
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };



    const createGroups = async () => {


        if (!provider) {
            toast.success("provider not ready, please wait...");
        }

        try {

            const web3 = new Web3(provider);
            const data = new web3.eth.Contract(factoryContractAbi, factoryContract);
            const uniqueId = uuidv4();

            if (groupData.frequency === "Monthly") {
                groupData.frequency = 30
            } else if (groupData.frequency === "Weekly") {
                groupData.frequency = 7
            } else if (groupData.frequency === "Bi-weekly") {
                groupData.frequency = 14
            }

            setIsLoading(true);
            const groupdurationInseconds = Number(groupData.duration) * 24 * 60 * 60*30;
            const groupfrequencyInseconds = Number(groupData.frequency) * 24 * 60 * 60;
            const transaction = data.methods.createGroup(
                String(groupData.name),
                groupfrequencyInseconds.toString(),
                String("panely are applicable"),
                web3.utils.toWei(groupData.contribution.toString(), "ether"),
                groupData.groupSize.toString(),
                groupdurationInseconds.toString(),
                Boolean(groupData.daoDepositSupport),
                Boolean(true), "0x2ca55E00C6c9CA06890aa0cE53050A48FDCA07F2",
                uniqueId,

            );

            if (walletBalance === null || walletBalance < 0.01) {
                setIsLoading(false);
                toast.error("insufficient balance, Please topup your wallet.");
                return;
            }

            transaction.send({ from: walletAddress })
                .on('transactionHash', function (hash) {
                    setIsLoading(true);

                    const datas = {
                        groupName: groupData.name,
                        description: groupData.description,
                        txHash: hash,
                        groupId: uniqueId,

                    };

                    setGroup(datas).then((result) => {

                        if (result?.data
                            ?.success) {
                            toast.success(result.data?.message);
                            setGroupData({
                                name: '',
                                groupSize: 0,
                                contribution: 0,
                                frequency: '',
                                duration: 0,
                                daoDepositSupport: false
                            });
                            setIsLoading(false);
                            navigate(browse_groups)
                        } else {
                            setIsLoading(false);
                            toast.error(result.data?.message);
                        }
                    });
                })
                .on('receipt', function (receipt) {
                    setIsLoading(false);
                    console.log("Transaction successful", receipt);
                })
                .on('error', function (error) {
                    setIsLoading(false);
                    console.error("Transaction failed=========", error);
                    toast.error(error.message);
                });

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
            console.log(error, "error==========");
        }
    };


    return (
        <>

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
                                                        // onKeyDown={handleKeyDown}
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
                                                        onKeyPress={(event) => {
                                                            const input = event.target.value + event.key; // Get the current input + new keypress
                                                            if (!/^\d{1,2}$/.test(input)) {
                                                                event.preventDefault(); // Block input if it's not a 1-2 digit number
                                                            }
                                                        }}

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
                                                        onKeyDown={handleKeyDown}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {groupDataErr.contribution && <span style={{ color: 'red' }}>{groupDataErr.contribution}</span>}
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-pass" className="form-label">
                                                        Contribution Frequency
                                                    </label>

                                                    {/* <select
                                                        className="form-select" aria-label="Default select example"
                                                        name="frequency"
                                                        value={groupData.frequency}
                                                        onChange={handleChange}
                                                    >

                                                        <option value="Weekly">Weekly</option>
                                                        <option value="Bi-weekly">Bi-weekly</option>
                                                        <option value="Monthly">Monthly</option>
                                                    </select> */}
                                                    <input

                                                        className="form-control"
                                                        id="account-email"
                                                        placeholder="Contribution Amount frequency"
                                                        type="text"
                                                        name="frequency"
                                                        value={groupData.frequency}
                                                        onKeyDown={handleKeyDown}
                                                        onChange={handleChange}
                                                    />
                                                    {groupDataErr.frequency && <span style={{ color: 'red' }}>{groupDataErr.frequency}</span>}


                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-cpass" className="form-label">
                                                        Group Duration (months)
                                                    </label>
                                                    <select
                                                        className="form-select" aria-label="Default select example"
                                                        name="duration"
                                                        value={groupData.duration}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Duration</option>
                                                        <option value="3">3 Months</option>
                                                        <option value="6">6 Months</option>
                                                        <option value="12">12 Months</option>
                                                    </select>

                                                    {groupDataErr.duration && <span style={{ color: 'red' }}>{groupDataErr.duration}</span>}

                                                </div>

                                            </div>

                                            <div className="col-12">
                                                <div>
                                                    <label htmlFor="account-email" className="form-label">
                                                        Group Description
                                                    </label>
                                                    <textarea

                                                        className="form-control"
                                                        id="account-email"
                                                        placeholder="Description"
                                                        type="text"
                                                        name="description"
                                                        value={groupData.description}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {groupDataErr.description && <span style={{ color: 'red' }}>{groupDataErr.description}</span>}
                                            </div>

                                            {/* <div className="account__check"> */}
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

                                                {/* </div> */}

                                                {/* { {groupDataErr.daoDepositSupport && <span style={{ color: 'red' }}>{groupDataErr.daoDepositSupport}</span>} } */}
                                            </div>
                                            <div className="account__check">
                                                <div className="account__check-remember">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        value=""
                                                        id="terms-check"
                                                        checked={groupData.isPublic}
                                                        onChange={handleIsPublicChange}
                                                    />
                                                    <label htmlFor="terms-check" className="form-check-label">
                                                        IsPublic
                                                    </label>

                                                </div>

                                                {/* { {groupDataErr.daoDepositSupport && <span style={{ color: 'red' }}>{groupDataErr.daoDepositSupport}</span>} } */}
                                            </div>
                                        </div>


                                        {!isLoading ? <button
                                            type="submit"
                                            className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                                        // onClick={handleCreateGroup}
                                        >
                                            Create Group
                                        </button> :
                                            (
                                                <div style={{
                                                    display: 'flex',
                                                    padding: '20px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}>
                                                    <CircularProgress size={25} />
                                                    <span style={{
                                                        fontSize: '14px',
                                                        marginLeft: '8px'
                                                    }}>
                                                    </span>
                                                </div>
                                            )}
                                    </form>
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

        </>
    )
}

export default CreateGroup
