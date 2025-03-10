import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../auth/web3auth';
import { getAccounts } from '../auth/web3RPC';
import { factoryContract, factoryContractAbi, groupAbi } from '../constent';
import { toast } from 'react-toastify';
import { useSetGroupDetailsMutation } from '../../redux/groupApi';


function GroupDetails({ item, index, selectedGroupId }) {
    const [isJoined, setIsJoined] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [setGroupDetails] = useSetGroupDetailsMutation()
    const formattedDate = new Date(item?.createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    useEffect(() => {

        if (selectedGroupId === item?.groupId) {
            handleJoinGroup(item?.groupAddress);
        }
    }, [selectedGroupId]);

    console.log(selectedGroupId, "selectedGroupId====")

    const handleJoinGroup = async (group_address) => {
        try {



            // console.log("call00=============")
            const provider = getWeb3AuthEVMInstance();
            await provider.init();
            // console.log("call1")
            // // await provider.initModal();
            // console.log("call2")
            // // await provider.connect();
            // console.log("call3")
            const web3 = new Web3(provider.provider);
            const contract = new web3.eth.Contract(factoryContractAbi, factoryContract);
            // Get user's accounts
            const accounts = await web3.eth.getAccounts();

            setWalletAddress(accounts[0])
            const transaction = contract.methods.isJoined(group_address, accounts);

            const isJoined = await transaction.call();



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
        const contract = new web3.eth.Contract(groupAbi, item?.groupAddress);

        const transaction = contract.methods.joinGroup(

        );


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
        <div
            key={item?.groupId}
            className={`tab-pane fade ${selectedGroupId === item?.groupId ? "show active" : ""}`}
            id={`v-pills-${index}`}
            role="tabpanel"
            aria-labelledby={`v-pills-${index}-tab`}
        >
            <img src={item?.groupImage || "/images/team/group-23.png"} alt={item?.groupName} className="img-fluid services-img" />
            <h3 className="mb-3">{item?.groupName || "Group Name"}</h3>

            <br />
            <p><strong>Group Details :</strong></p>
            <ul>
                <li><i className="fa-solid fa-check"></i> <strong>Contribution Amount per Cycle: </strong> &nbsp;<span>£{item?.frequencyPrice}</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Contribution Frequency (Days): </strong>&nbsp; <span>{item?.frequencyTime} Days</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Payout frequency (Days): </strong> &nbsp;<span>{Number(item?.duration)}    Days</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Group Created By: </strong> &nbsp;<span>{item?.owner}</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Group Size: </strong>&nbsp; <span>{item?.groupSize}</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Created At: </strong>&nbsp; <span>{formattedDate}</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>IsPublic: </strong>&nbsp; <span>{item?.isPublic?"Yes":"No"}</span></li>
                
            </ul>

            {/* <p><strong>Group Members:</strong></p>
            {item?.members?.length > 0 ? (
                <ul>
                    {item?.members?.map((member, i) => (
                        <li key={i}><i className="fa-solid fa-user"></i> {member}</li>
                    ))}
                </ul>
            ) : (
                <p>No members yet.</p>
            )} */}

            <p className="text-justify"><strong>Group Rules: </strong>&nbsp;{item?.description || "No description available."}</p>
            {/* <button className="trk-btn trk-btn--border trk-btn--primary d-block mt-4" onClick={() => isJoined ?joinGroupHandler():""}>{isJoined ? "Already Joined" : "Join Group"}</button> */}
            <a href={`/group-details/${item && item._id}`}><button className="trk-btn trk-btn--border trk-btn--primary d-block mt-4" >More Details</button></a>
        </div>
    );
}

export default GroupDetails;
