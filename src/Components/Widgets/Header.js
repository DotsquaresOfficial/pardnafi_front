import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

function Header({ headerClass = null }) {
    const [menu, setMenu] = useState(false);
    const [show, setShow] = useState(false);
    const location = useLocation(); // React Router hook to access location
    const [scrollTop, setScrollTop] = useState(0);
  
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
  
    // const updateThemeColor = useCallback((themeMode = 'light') => {
    //   const colorSwitcher = document.getElementById('btnSwitch');
    //   document.documentElement.setAttribute('data-bs-theme', themeMode);
    //   localStorage.setItem('theme', themeMode);
  
    //   if (themeMode === 'dark') {
    //     colorSwitcher.classList.add('dark-switcher');
    //   } else {
    //     colorSwitcher.classList.remove('dark-switcher');
    //   }
  
    //   changeImage(themeMode);
    // }, [changeImage]);
  
    // const toggleTheme = () => {
    //   const theme = localStorage.getItem('theme');
    //   if (theme && theme === 'dark') {
    //     updateThemeColor('light');
    //   } else {
    //     updateThemeColor('dark');
    //   }
    // };
  
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
        {/* Light/Dark switch */}
        {/* <div className="lightdark-switch" onClick={toggleTheme}>
          <span className="switch-btn" id="btnSwitch">
            <Image
              width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}
              src="images/icon/moon.svg"
              alt="light-dark-switchbtn"
              className="swtich-icon"
            />
          </span>
        </div> */}
  
        <header className={ `header-section ${headerClass ? headerClass:'bg-color-3'}`} onScroll={isSticky}>
      <div className="header-bottom">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo">
                <Link to="/">
                  <img className="dark" src="/images/logo/logo.svg" alt="logo" />
                </Link>
              </div>
              <div className="menu-area">
                  <ul id="menu" className={ `menu menu--style1 ${menu ? 'active' : ''}`}>
                    <li className="megamenu menu-item-has-children">
                      <Link scroll={false} href="/#0">Home </Link>
                </li>
                    <li className="menu-item-has-children">
                      <Link href="/services">How PardnaFi Works</Link>
                    
                    </li>
                    <li className="menu-item-has-children">
                      <Link scroll={false} href="/#0">Who is PardnaFi for</Link>
                    
                    </li>

                    <li className="menu-item-has-children">
                      <Link scroll={false} href="/#0"> Learning Hub</Link>
                  

                    </li>
                  
                  </ul>
                  </div>
                  <div className="header-action">
                <div className="menu-area">
                  <div className="header-btn">
                    <Link to="/SignUp" className="trk-btn trk-btn--border trk-join">
                      <span>JOIN US</span>
                    </Link>
                  </div>

                  {/* <!-- toggle icons --> */}
                  <div className={menu?"header-bar d-lg-none header-bar--style1 active": "header-bar d-lg-none header-bar--style1" } onClick={()=>toggleMenu()}>
                    <span></span>
                    <span></span>
                    <span></span>
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
