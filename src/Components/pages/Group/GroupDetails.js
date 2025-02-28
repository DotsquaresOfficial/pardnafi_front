import React, { useEffect } from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader'
import Footer from '../../Widgets/Footer'
import { useParams } from "react-router-dom";
import { useSetGroupDetailsMutation } from '../../../redux/groupApi';
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
        // const response = await fetch(`https://your-api.com/groups/${id}`);
        // if (!response.ok) throw new Error("Failed to fetch group details");
        // const data = await response.json();

        // if (data.success) {
        //   setGroupDetails(data.data[0]); // Assuming the response contains an array
        // } else {
        //   throw new Error(data.message || "Error fetching group details");
        // }
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  console.log(data && data.data, "huihyuhy")

  const createdAt = data && data.data.createdAt
    ;
  const localTime = new Date(createdAt).toLocaleString();
  return (
    <>

      <PageHeader title="Group Details" text="Group Details" data={data && data.data} />
      <section className='payment-method'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-9'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='upcoming-payment'>
                    <div className='payment-simble'>
                      <div className='up-box'>
                        <h2>{data && data?.data?.upcomingPayments.amount
                        }£</h2>
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
                        <h2>{data && data?.data?.lastPayment
                          .amount
                        }£</h2>
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
                        <h2>{data && data?.data?.penalties.amount
                        }£</h2>
                      </div>
                      <div className='payment-date'>
                        <h3>Total Paneilty</h3>
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
                  <li> <span>Group Contribution Per Cycle: </span> {data && data.data.frequencyPrice}£</li>
                  <li> <span>Group Payout Frequency: </span> {data && data.data.frequencyTime
                  } Days</li>
                  <li> <span>Group Duration: </span> {data && data.data.duration} Days</li>
                  <li> <span>Group Created By: </span>  {shortenAddress(data && data.data && data.data.groupAddress)} {data && data.data && data.data.groupowner
                  }</li>
                  <li> <span>Created At: </span> {localTime}</li>
                </ul>
              </div>
            </div>
            <div className='col-md-3'>
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
            </div>
          </div>
        </div>
      </section>



    </>
  )
}

export default GroupDetails
