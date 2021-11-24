import { useState, useEffect } from "react";

import Button from "js/components/foundation/Button";
import AppSettings from "js/components/app/AppSettings";

const AppHeader = props => {
  const { breakpoint, stateMobileMenu } = props;
  const [headerSticky, setHeaderSticky] = useState(true);

  function openMobileMenu() {
    stateMobileMenu(true);
  }

  useEffect(() => {
    const stickyCalc = value => {
      if (window.pageYOffset > Number(value)) {
        setHeaderSticky(true);
      } else {
        setHeaderSticky(false);
      }
    };

    let width = window.innerWidth;
    window.addEventListener("resize", function () {
      if (window.innerWidth == width) return;
      width = window.innerWidth;
      stickyCalc(5);
    });
    stickyCalc(5);
    window.addEventListener("scroll", function () {
      stickyCalc(5);
    });
  }, []);

  return (
    <header className={classNames("header position-fixed flex-grow-0 flex-shrink-0 w-100", { sticky: headerSticky })}>
      <div className='container-fluid h-100'>
        <div className='header-container d-flex align-items-center justify-content-md-between h-100'>
          <Button
            size='sm'
            color='transparent'
            type='button'
            className='btn-menu d-md-none ml-n2 mr-5'
            icon='menu'
            onClick={e => {
              e.stopPropagation();
              openMobileMenu();
            }}
          />
          <div className='logo'>
            <a className='logo-link' href='/'>
              OptiTrips
            </a>
          </div>
          {(breakpoint.xl || breakpoint.lg || breakpoint.md) && <AppSettings />}
        </div>
      </div>
    </header>
  );
};

export default connect(
  state => ({
    breakpoint: state.Breakpoints.current
  }),
  dispatch => ({
    stateMobileMenu: boolean => {
      dispatch({ type: "MOBILE_MENU_STATE", mobileMenu: boolean });
    }
  })
)(AppHeader);
