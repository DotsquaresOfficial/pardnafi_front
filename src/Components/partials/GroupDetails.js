import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { getWeb3AuthEVMInstance } from '../auth/web3auth';
import { getAccounts } from '../auth/web3RPC';
import { factoryContract, factoryContractAbi } from '../constent';

function GroupDetails({ item, index, selectedGroupId }) {
    const [isJoined, setIsJoined] = useState(null);

    useEffect(() => {
        
        if (selectedGroupId === item?.groupId) {
            handleJoinGroup(item?.groupAddress);
        }
    }, [selectedGroupId]);

   
    const handleJoinGroup = async (group_address) => {
        try {
            console.log("call00")
            const provider = getWeb3AuthEVMInstance();
            console.log("call1")
            // await provider.initModal();
            console.log("call2")
            // await provider.connect();
            console.log("call3")
            const web3 = new Web3(provider);
            const contract = new web3.eth.Contract(factoryContractAbi, factoryContract);
            const address = await getAccounts(provider);

            const transaction = contract.methods.isJoined(group_address, address);
            console.log(transaction,"transaction===")
            const isJoined = await transaction.call();
console.log(isJoined,"isJoined==")
            

            setIsJoined(isJoined);
        } catch (error) {
            console.error("Error fetching groups list:", error);
        }
    };

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
                <li><i className="fa-solid fa-check"></i> <strong>Group Contribution Per Cycle: </strong> <span>{item?.frequencyPrice}£</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Group Payout Frequency: </strong> <span>{item?.frequencyTime} Days</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Group Duration: </strong> <span>{item?.duration} Months</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Group Created By: </strong> <span>{item?.owner}</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Max Group Members: </strong> <span>{item?.groupSize}</span></li>
                <li><i className="fa-solid fa-check"></i> <strong>Created At: </strong> <span>{new Date(item?.createdAt).toLocaleString()}</span></li>
            </ul>

            <p><strong>Group Members:</strong></p>
            {item?.members?.length > 0 ? (
                <ul>
                    {item?.members?.map((member, i) => (
                        <li key={i}><i className="fa-solid fa-user"></i> {member}</li>
                    ))}
                </ul>
            ) : (
                <p>No members yet.</p>
            )}

            <p className="text-justify"><strong>Group Rules: </strong>{item?.description || "No description available."}</p>
            <button className="trk-btn trk-btn--border trk-btn--primary d-block mt-4">{isJoined ? "Already Joined" : "Join Group"}</button>
        </div>
    );
}

export default GroupDetails;
