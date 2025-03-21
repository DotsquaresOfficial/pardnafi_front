import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../auth/web3auth';
import { getAccounts } from '../auth/web3RPC';
import { factoryContract, factoryContractAbi, groupAbi } from '../constent';
import { toast } from 'react-toastify';
import { useSetGroupDetailsMutation } from '../../redux/groupApi';
import FullPageLoader from '../loader/FullPageLoader';


function GroupDetails({ item, index, selectedGroupId }) {
    const [isJoined, setIsJoined] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [setGroupDetails, { data, isLoading, error }] = useSetGroupDetailsMutation()
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

            const provider = getWeb3AuthEVMInstance();
            await provider.init();

            const web3 = new Web3(provider.provider);
            const contract = new web3.eth.Contract(factoryContractAbi, factoryContract);
            const accounts = await web3.eth.getAccounts();

            setWalletAddress(accounts[0])
            const transaction = contract.methods.isJoined(group_address, accounts);

            const isJoined = await transaction.call();



            setIsJoined(isJoined);
        } catch (error) {
            console.error("Error fetching groups list:", error);
        }
    };

    return (
        <> {isLoading ? <FullPageLoader /> : <>  <div
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
                <li> <div className='iss-public'> <i className="fa-solid fa-check"></i> <strong>IsPublic: </strong> </div>  <span>{item?.isPublic ? "Yes" : "No"}</span></li>
                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>IsDao: </strong></div> <span>{item?.isDao ? "Yes" : "No"}</span></li>
                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>Contribution Amount per Cycle: </strong></div> <span>£{item?.frequencyPrice}</span></li>
                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>Contribution Frequency: </strong></div> <span>{item?.frequencyTime} Days</span></li>
                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>Payout frequency: </strong></div> <span>{Number(item?.duration)}    Days</span></li>

                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>Group Size: </strong></div> <span>{item?.groupSize}</span></li>
                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>Group Created By: </strong></div> <a href={`https://sepolia.basescan.org/address/${item?.owner}`} target='_blank'><span>{item?.owner}</span></a></li>
                <li><div className='iss-public'><i className="fa-solid fa-check"></i> <strong>Created At: </strong></div> <span>{formattedDate}</span></li>

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
        </div></>}</>

    );
}

export default GroupDetails;
