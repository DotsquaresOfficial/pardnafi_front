import React, { useEffect } from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader'
import Footer from '../../Widgets/Footer'
import { useParams } from "react-router-dom";
import { useSetGroupDetailsMutation } from '../../../redux/groupApi';
import FullPageLoader from '../../loader/FullPageLoader';
const GroupDetails = () => {
  const { id } = useParams();

  const [setGroupDetails, { data, isLoading, error }] = useSetGroupDetailsMutation();
  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }

  useEffect(() => {
    if (!id) return;

    const fetchGroupDetails = async () => {
      try {

        setGroupDetails({ id })

        localStorage.setItem("groupId", id)

      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  }

  const formattedDate = new Date(data && data.data.createdAt).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  return (
    <>
      <>{isLoading ? <FullPageLoader /> : <><PageHeader title="Group Details" text="Group Details" data={data && data.data} />
        <section className='payment-method'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-9'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='upcoming-payment'>
                      <div className='payment-simble'>
                        <div className='up-box'>
                          <h2>£{data && data?.data?.upcomingPayments.amount
                          }</h2>
                        </div>
                        <div className='payment-date'>
                          <h3>Upcoming Payment</h3>
                          {/* <p>Date: 26-02-2025</p> */}
                        </div>
                      </div>
                      <div className='payment-card'>
                        <img src='/images/card-sp 1.svg' />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='upcoming-payment'>
                      <div className='payment-simble'>
                        <div className='up-box'>
                          <h2>£{data && data?.data?.lastPayment
                            .amount
                          }</h2>
                        </div>
                        <div className='payment-date'>
                          <h3>Last Payment</h3>
                          {/* <p>Date: 26-01-2025</p> */}
                        </div>
                      </div>
                      <div className='payment-card'>
                        <img src='/images/card-sp 2.svg' />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='upcoming-payment'>
                      <div className='payment-simble'>
                        <div className='up-box'>
                          <h2>£{data && data?.data?.penalties.amount
                          }</h2>
                        </div>
                        <div className='payment-date'>
                          <h3>Total Penalty</h3>
                          {/* <p>Date: 26-02-2025</p> */}
                        </div>
                      </div>
                      <div className='payment-card'>
                        <img src='/images/time-watch.svg' />
                      </div>
                    </div>
                  </div>


                </div>
                <div className='group-contrutbution'>
                  <ul>
                    <li> <strong>{data && data.data.isPublic ? "Public" : "Private"}  </strong>  </li>
                    <li> <span>IsDao: </span>{data && data.data.isDao ? "Yes" : "No"}    </li>


                    <li> <span>Contribution Amount Per Cycle: </span> £{data && data.data.frequencyPrice}</li>
                    <li> <span>Contribution Frequency: </span> {data && data.data.frequencyTime
                    } Days</li>
                     <li> <span>Payout frequency: </span> {data && data.data.duration} Days</li>
                    <li> <span>Group Size: </span> {data && data.data.groupSize} </li>

                   
                    <li> <span>Group Created By: </span>  {shortenAddress(data && data.data && data.data.owner)} {data && data.data && data.data.groupowner
                    }</li>
                    <li> <span>Created At: </span> {formattedDate}</li>
                  </ul>
                </div>
              </div>
              {/* <div className='col-md-3'>
              <div className='contr-graph'>
                <h2>Contributions </h2>
                <img src='/images/contr-graph.svg' />
                <div className='payment-tag'>
                  <div className='grah-details-tag inves'>
                    <h6>Total Investment</h6>
                  </div>
                  <div className='grah-details-tag rec'>
                    <h6>Total Received</h6>
                  </div>
                  <div className='grah-details-tag your-inves'>
                    <h6>Your Total Investment</h6>
                  </div>
                  <div className='grah-details-tag total-rec'>
                    <h6>Your Total Investment  Received</h6>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </section>
        <section class="active-usertable">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="user-datajoin">
                  <div class="member-user">
                    <h2>All Members</h2>

                  </div>
                  <div class="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Member Name</th>
                          <th>Wallet Address</th>
                          <th>Total Contribution</th>
                          <th>Email</th>
                          <th>Last Contribution</th>
                        </tr>
                      </thead>
                      <tbody>

                        {data && data.data.members.map((item, i) => {
                          return <tr>
                            <td>{item.name}</td>
                            <td>{shortenAddress(item?.memberAddress)}</td>
                            <td>£ {item?.contribution
                            }</td>
                            <td>{item?.
                              email
                            }</td>
                            <td>£ {item?.lastPayment
                            }</td>
                          </tr>
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section></>}</>






    </>
  )
}

export default GroupDetails
