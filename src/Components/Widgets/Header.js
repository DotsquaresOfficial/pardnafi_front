import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from 'react-router-dom';
import { change_password, register } from "../constent/Routes";
import { useAuth } from "../../AuthContext";
import { getWalletServicesPluginInstance, getWeb3AuthEVMInstance } from "../auth/web3auth";
import Web3 from "web3";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

function Header({ headerClass = null }) {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);


  const { logout, connectWallet, login, authenticated, walletAddress, walletBalance, provider } = useAuth();
  const changeImage = useCallback((themeMode = 'light') => {
    const icon = document.querySelector('#btnSwitch img');

    if (themeMode === "dark") {
      icon.src = 'images/icon/sun.svg';
      var images = document.querySelectorAll('img.dark');
      for (var i = 0; i < images.length; i++) {
        var oldSrc = images[i].src;
        oldSrc = oldSrc.replace("-dark.", ".");
        var oldIndex = oldSrc.lastIndexOf(".");
        var baseName = oldSrc.slice(0, oldIndex);
        var extension = oldSrc.slice(oldIndex);
        var newSrc = baseName + "-dark" + extension;
        images[i].src = newSrc;
      }
    } else {
      icon.src = 'images/icon/moon.svg';
      var images = document.querySelectorAll('img.dark');
      for (var i = 0; i < images.length; i++) {
        var oldSrc = images[i].src;
        var newSrc = oldSrc.replace("-dark.", ".");
        images[i].src = newSrc;
      }
    }
  }, []);

  // ================contract ====================

  const handleLogout = async () => {
    localStorage.clear();
    await logout();
  }

  function switchThemeByUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }

  // useEffect(() => {
  //   switchThemeByUrl();
  //   const theme = localStorage.getItem('theme');
  //   updateThemeColor(theme || 'light');
  // }, [location, updateThemeColor]);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  useEffect(() => {
    setScrollTop(window.scrollY);
  }, [scrollTop]);

  const isSticky = () => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 250 ? header.classList.add('header-fixed', 'fadeInUp') : header.classList.remove('header-fixed', 'fadeInUp');
  };

  // function closeAllMenus() {
  //   let elements = document.querySelectorAll(".menu-item-has-children.open");
  //   elements.forEach((item) => {
  //     item.classList.remove('open');
  //     item.querySelector('.submenu').style.display = 'none';
  //   });
  // }

  const toggleMenu = () => {
    setMenu(!menu);
    // closeAllMenus();
  };

  // function toggleActive(event) {
  //   event.preventDefault();
  //   const mediaQuery = window.matchMedia('(max-width: 991px)');
  //   if (mediaQuery.matches) {
  //     event.currentTarget.parentElement.classList.toggle('open');
  //     const submenu = event.currentTarget.nextElementSibling;
  //     submenu.style.display = submenu.style.display === 'none' ? "block" : 'none';
  //   }
  // }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const substr = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) : str;
  };

  return (
    <>


      <header className={`header-section ${headerClass ? headerClass : 'bg-color-3'}`} onScroll={isSticky}>
        <div className="header-bottom">
          <div className="container-fluid">
            <div className="header-wrapper">
              <div className="logo">
                <a href={register}>
                  <img className="dark" src="/images/logo/logo.svg" alt="logo" />
                </a>
              </div>
              <div className="menu-area">
                <ul id="menu" className={`menu menu--style1 ${menu ? 'active' : ''}`}>
                  <li className="megamenu menu-item-has-children">
                    <a href="/dashboard">Home</a>

                  </li>
                  {/* <li className="menu-item-has-children">
                    <a href="/services">How PardnaFi Works</a>

                  </li> */}
                  <li className="menu-item-has-children">
                    <Link scroll={false} href="/#0">Who is PardnaFi for</Link>

                  </li>

                  <li className="menu-item-has-children">
                    <Link scroll={false} href="/#0"> Learning Hub</Link>
                  </li>

                </ul>
                <div class="for-m">
                  {authenticated ? <div className="wallet-connect">
                    {
                      !isWalletLoading ? <div className="wallet-img" onClick={async () => {
                        debugger;
                        try {
                          setIsWalletLoading(true);
                          await getWalletServicesPluginInstance().showWalletUi({
                            show: true,
                          });
                          setIsWalletLoading(false);
                        } catch (ex) {
                          setIsWalletLoading(false);
                          toast.error("Failed to load the wallet. Please try again later");
                        }
                      }}>
                        <img src="/images/header/wallet.svg" className="img-fluid" alt="wallet" />
                      </div> : (
                        <div style={{
                          padding: '10px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <CircularProgress size={16} />
                          <span style={{
                            fontSize: '14px',
                            marginLeft: '8px'
                          }}>
                          </span>
                        </div>
                      )
                    }
                    <div className="wallet-img">
                      <h6>
                        {walletBalance === null || walletBalance === undefined ? (
                          <div
                            style={{
                              background: '#f6f7f8',
                              backgroundImage: 'linear-gradient(45deg, #f6f7f8 25%,rgba(224, 224, 224, 0.4) 50%, #f6f7f8 75%)',
                              backgroundSize: '200% 100%',
                              animation: 'shimmer 1.8s infinite linear',
                              height: '20px', // Adjust the height
                              width: '100%', // Adjust the width as needed
                              borderRadius: '4px', // Optional rounded corners
                            }}
                          ></div>
                        ) : (
                          `${Number(walletBalance).toFixed(4)} ETH`
                        )}
                      </h6>
                      <h2>
                        {walletAddress === null || walletAddress === undefined ? (
                          <div
                            style={{
                              marginTop: '6px',
                              background: '#f6f7f8',
                              backgroundImage: 'linear-gradient(45deg, #f6f7f8 25%,rgba(227, 227, 227, 0.4) 50%, #f6f7f8 75%)',
                              backgroundSize: '200% 100%',
                              animation: 'shimmer 2.7s infinite linear',
                              height: '20px', 
                              width: '100%', 
                              borderRadius: '4px', 
                            }}
                          ></div>
                        ) : (
                          walletAddress
                        )}
                      </h2>
                    </div>

                  </div> : ""}
                  <div className="user-dropdown">
                    {authenticated ? <div class="dropdown">
                      <button class="btn dropdown-toggle" type="button" style={{ background: 'none', border: 'none' }} data-bs-toggle="dropdown" aria-expanded="false">
                        <img alt="user" class="img-fluid" src="/images/header/user.jpg" />
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/user-profile"  >User Profile</a></li>
                        <li><a className="dropdown-item" href={change_password}>Change Password</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                      </ul>
                    </div> : ""}


                  </div>

                  {authenticated ? <div class="user-dropdown notification-data">
                    <div class="dropdown">
                      <button class="btn" type="button" style={{ background: 'none', border: 'none' }}>
                        <a class="nav-link" href="#contact"><i class="fa-regular fa-bell"></i></a>
                      </button>
                    </div>
                  </div> : ""}


                  <div className="header-action">
                    <div className="menu-area">
                      {!authenticated ? <div className="header-btn">
                        <a href={register} className="trk-btn trk-btn--border trk-join">

                          <span>JOIN US</span>
                        </a>
                      </div> : ""}

                      {/* <!-- toggle icons --> */}
                      <div className={menu ? "header-bar d-lg-none header-bar--style1 active" : "header-bar d-lg-none header-bar--style1"} onClick={() => toggleMenu()}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
