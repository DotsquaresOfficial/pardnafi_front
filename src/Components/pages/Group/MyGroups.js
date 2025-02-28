import React, { useEffect } from 'react'
import PageHeader from '../../Widgets/PageHeader'
import { useSetMyGroupMutation } from '../../../redux/groupApi';
import { useAuth } from '../../../AuthContext';


const MyGroups = () => {
  const { walletAddress } = useAuth();
  const [setMyGroup, { data, isLoading, error }] = useSetMyGroupMutation();

  useEffect(() => {
    if (walletAddress) {
      setMyGroup({ groupOwnerAddress: walletAddress })
    }
  }, [walletAddress, setMyGroup]);

  console.log(data && data, "jkjij")
  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }
  return (
    <>
      <PageHeader title="My Groups" text="My Groups" />
      {/* <a href={`/group-details/${item && item._id}`}></a> */}
      <section className="account padding-top padding-bottom sec-bg-color2">
        <div className='container'>
          <div className='row'>
            {data && data?.data?.map((group, index) => {
              const createdAt = group.createdAt
                ;
              const localTime = new Date(createdAt).toLocaleString();
              const shortAddress = shortenAddress(group?.groupAddress);
              return <div className='col-lg-4 mb-4'>
                <div className='white-card pt-1'>
                  <div className='wc-img'>
                    <div className='img-content'>
                      <h3>{group?.groupName}</h3>
                      {/* <p>
                      {group?.description} &nbsp;
                      <a href='javascript:void(0)'>Read More</a>
                    </p> */}
                    </div>
                    <img src='/assets/images/mygroup.png' alt='' className='img-fluid' />

                  </div>
                  <div className='wc-content mb-3'>
                    <div className='line-tages'>
                      {/* <p>:</p>
                      <p>Group Contribution Per Cycle:</p> */}
                    </div>
                    <div className='wc-price'>
                      <h2>£{(group?.frequencyPrice
                      )
                      }</h2>
                      <span>Per {(group?.
                        frequencyTime
                      )} Days</span>
                    </div>
                  </div>
                  <div className='wc-list'>
                    <ul>
                      <li>
                        <strong>Address:</strong>
                        <a
                          href={`https://sepolia.basescan.org/address/${group?.groupAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
                        >
                          {shortenAddress(group?.groupAddress)}
                        </a>
                      </li>
                      <li>
                        <strong>Created At:</strong>
                        <span>{localTime}</span>
                      </li>
                      <li>
                        <strong>Group Duration</strong>
                        <span>{group?.duration} Days</span>
                        
                      </li>
                      <li>
                        {/* <strong>More details</strong> */}
                       <a href={`/group-details/${group && group._id}`}><span> More details</span></a> 
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            })}


          </div>
        </div>


      </section>

    </>
  )
}

export default MyGroups

