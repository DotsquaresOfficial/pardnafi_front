import React, { useEffect } from 'react'
import PageHeader from '../../Widgets/PageHeader'
import { useSetMyGroupMutation } from '../../../redux/groupApi';
import { useAuth } from '../../../AuthContext';
import FullPageLoader from '../../loader/FullPageLoader';

const MyGroups = () => {
  const { walletAddress } = useAuth();
  const [setMyGroup, { data, isLoading, error }] = useSetMyGroupMutation();

  useEffect(() => {
    if (walletAddress) {
      setMyGroup({ groupOwnerAddress: walletAddress })
    }
  }, [walletAddress, setMyGroup]);

  console.log(data && data.data.length, "jkjij")
  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }
  return (
    <>
      {isLoading ? <FullPageLoader /> : (
        <>
          {isLoading ? (
            <FullPageLoader />
          ) : data?.data?.length > 0 ? (
            <>
              <PageHeader title="My Groups" text="My Groups" />
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
                        <div className="col-lg-4 mb-4" key={index}>
                          <div className="white-card pt-1">
                            <div className="wc-img">
                              <div className="img-content">
                                <h3>{group?.groupName}</h3>
                              </div>
                              <img src="/assets/images/mygroup.png" alt="" className="img-fluid" />
                            </div>
                            <div className="wc-content mb-3">
                              <div className="wc-price">
                                <h2>£{group?.frequencyPrice}</h2>
                                <span>Per {group?.frequencyTime} Days</span>
                              </div>
                            </div>
                            <div className="wc-list">
                              <ul>
                                <li>
                                  <strong>Address:</strong>
                                  <a
                                    href={`https://sepolia.basescan.org/address/${group?.groupAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
                                  >
                                    {shortAddress}
                                  </a>
                                </li>
                                <li>
                                  <strong>Created At:</strong>
                                  <span>{localTime}</span>
                                </li>
                                <li>
                                  <strong>Payout frequency:</strong>
                                  <span>{group?.duration} Days</span>
                                </li>
                                <li>
                                  <a href={`/group-details/${group?._id}`}>
                                    <span> More details</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <h4>No Groups</h4>
          )}


        </>
      )}



    </>
  )
}

export default MyGroups

