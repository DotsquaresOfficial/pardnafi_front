import React, { useEffect, useState } from 'react'
import Header from './Header'
import PageHeader from './PageHeader'
import Footer from './Footer'
import { Link } from "react-router-dom"
import { browse_groups, create_group, my_group, wallet_access } from '../constent/Routes'
import { useSetGroupAnalyticsMutation } from '../../redux/groupApi'
import { useAuth } from '../../AuthContext'
import { toast } from 'react-toastify'

const Dashboard = () => {

  const [setGroupAnalytics] = useSetGroupAnalyticsMutation();
  const [dashboardData, setDashboardData] = useState([])
  const { wallet_address } = useAuth()
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  console.log(dashboardData, "dashboardData==")

  useEffect(() => {
    groupAnalytics()
  }, [wallet_address])

  const groupAnalytics = async () => {
    setGroupAnalytics({ groupOwnerAddress: wallet_address }).then((result) => {

      if (result?.data
        ?.success) {
        setDashboardData(result.data?.data)


        //  setIsLoading(false);
        //  navigate(browse_groups)
      } else {
        //  setIsLoading(false);
        toast.error(result.data?.message);
      }
    });
  }

  return (
    <>

      <PageHeader title="Dashboard" text="Dashboard" />
      <section className="account padding-top padding-bottom sec-bg-color2 dash-sec">
        <div className='container'>
          <div className="row">
            <div className='col-md-3'>
              <a href={create_group}>
                <div
                  className='createnew-group'
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className='creategroup-img'>
                    <img src='/images/icon/add-icon.svg' alt='add' />
                  </div>
                  <h2>Create a New group</h2>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: '#f6f7f8',
                      backgroundImage: 'linear-gradient(90deg, #f6f7f8 25%, #e0e0e0 50%, #f6f7f8 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1s infinite linear',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                  ></div>
                </div>
              </a>
            </div>

            <div className='col-md-3'>
              <a href={browse_groups}>
                <div
                  className='createnew-group'
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className='creategroup-img'>
                    <img src='/images/icon/world.svg' alt='add' />
                  </div>
                  <h2>Browse Groups</h2>
                  <h1>{dashboardData.
                    browseGroups ? dashboardData.browseGroups : "0"}</h1>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: '#f6f7f8',
                      backgroundImage: 'linear-gradient(90deg, #f6f7f8 25%, #e0e0e0 50%, #f6f7f8 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1s infinite linear',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                  ></div>
                </div>
              </a>
            </div>

            <div className='col-md-3'>
            <a href={my_group}>
              <div
                className='createnew-group'
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div className='creategroup-img'>
                  <img src='/images/icon/user-active.svg' alt='add' />
                </div>
                <h2>Active Groups</h2>
                <h1>{dashboardData.activeGroups ?
                  dashboardData.activeGroups : "0"}</h1>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#f6f7f8',
                    backgroundImage: 'linear-gradient(90deg, #f6f7f8 25%, #e0e0e0 50%, #f6f7f8 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1s infinite linear',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                  }}
                ></div>
              </div> </a>
            </div>
            <div className='col-md-3'>
            <a href={my_group}>
              <div
                className='createnew-group'
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div className='creategroup-img'>
                  <img src='/images/icon/user-active.svg' alt='add' />
                </div>
                <h2>My Groups</h2>
                <h1>{dashboardData.createdGroups
                  ?
                  dashboardData.createdGroups
                  : "0"}</h1>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#f6f7f8',
                    backgroundImage: 'linear-gradient(90deg, #f6f7f8 25%, #e0e0e0 50%, #f6f7f8 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1s infinite linear',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                  }}
                ></div>
              </div></a>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Dashboard
