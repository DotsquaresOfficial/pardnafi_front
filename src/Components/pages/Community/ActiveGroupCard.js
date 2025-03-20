import React, { useEffect, useState } from 'react';
import PageHeader from '../../Widgets/PageHeader';
import { useSetMyGroupMutation } from '../../../redux/groupApi';
import { useAuth } from '../../../AuthContext';
import FullPageLoader from '../../loader/FullPageLoader';

const ActiveGroupCard = () => {

  const data = {
    data: [
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
      },
   
    ]
  }

  // const { walletAddress } = useAuth();
  // const [setMyGroup, { data, isLoading, error }] = useSetMyGroupMutation();
  //  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (!walletAddress) return;
  //   const fetchActiveGroup = async () => {
  //     setLoading(true);
  //     try {
  //         await setMyGroup({ groupOwnerAddress: walletAddress });
  //     } catch (error) {
  //         console.error("Error setting active group:", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  // fetchActiveGroup();
  // }, [walletAddress, setMyGroup]);

  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }


  //   if (isLoading || loading) {
  //     return <FullPageLoader />;
  // }


  return (
    <>
   
        <>
          <PageHeader title="Community Engagement Groups" text="Community Engagement Groups" />
          <section className="account sec-bg-color2">
            <div className="container">
              <div className="row">
                {data?.data?.map((group, index) => {
                  const createdAt = group.createdAt;
                  const localTime = new Date(createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  });
                  const shortAddress = shortenAddress(group?.groupAddress);

                  return (
                  <>
                  <section className='coummunity-groupchat'>
                    <div className='container'>
                      <div className='userstart-chatbox'>
                        <h2>PardnaFI Chat</h2>
                        <i class="fa-solid fa-right-from-bracket"></i>
                      </div>
                   <div className='row'>
                   <div className='col-md-4'>
                    <div className='chatuser-search'>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search" />
                    <div className='chatting'>
                      <div className='userchat-images'>
                      <img src='/images/time-watch.svg'></img>
                      </div>
                      <div className='username-heading'>
                     <h6>Common Group</h6>
                      </div>
                    </div>
                    </div>
                   <div>

                   </div>
                   </div>
                   <div className='col-md-8'>
                   <div className='chatwindow-private'>
                              <div className="offer-posting-timing">
                  <div className="offer-posting">
                  <span>Offer proposition</span>
                  <ul>
                  <li><strong> Proposed Amount: </strong> 10,000,000 kg</li>
                  
                  </ul>
                  </div>
                  <div className="head-ofc">
                  <span>2024-04-30 <br />12:36 pm</span>
                  </div>
                  </div>

                              <div className="reply-chatoffer">
              <div className="reply-chatoffer-content">
                <h2>Jane Smith</h2>
                <p>Head of Procurement</p>
              </div>
              <div className="reply-chatoffer-content">
              <img src='/images/time-watch.svg'></img>
              </div>    
            </div>

                  <div className="offer-posting-timing offer-promotiondata">
            <div className="offer-posting of-tyr">
              <span>Offer proposition</span>
              <ul>
                <li><strong> Proposed Amount: </strong> 10,000,000 kg</li>
                
              </ul>
            </div>
            <div className="head-ofc">
              <span>2024-04-30 <br />12:36 pm</span>
            </div>
          </div>


                   <div className='type-heresearch'>
                   <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search"></input>
                   </div>
                   </div>

                   </div>
                   </div>
                    </div>

                  </section>
                  </>
                  )
})}
            
              </div>
            </div>
          </section>
        </>
     
    </>
  );
};

export default ActiveGroupCard;
