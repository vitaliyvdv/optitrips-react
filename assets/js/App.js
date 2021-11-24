import { useState, useEffect } from "react";

import AppFooter from "js/components/app/AppFooter";
import AppHeader from "js/components/app/AppHeader";
import AppNavigation from "js/components/app/AppNavigation";
import AppPreloader from "js/components/app/AppPreloader";
import AppSnackbar from "js/components/app/AppSnackbar";
import AppStart from "js/components/app/AppStart";
import AppLocale from "js/components/app/AppLocale";
import AppCountry from "js/components/app/AppCountry";
import AppCurrency from "js/components/app/AppCurrency";
import Routes from "js/Routes";

import { GoogleAnalytics } from "js/google-analytics";

const App = props => {
  const { breakpoint, setBreakpoints } = props;

  useEffect(() => {
    GoogleAnalytics(window.location.pathname);
  }, []);

  useEffect(() => {
    setBreakpoints();
    const windowResize = () => setBreakpoints();
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, [breakpoint.xs, breakpoint.sm, breakpoint.md, breakpoint.lg, breakpoint.xl]);

  return (
    <Fragment>
      <div className='wrapper d-flex flex-column h-100 w-100 position-relative'>
        <AppHeader />
        <AppNavigation />
        <main className='main flex-grow-1 flex-shrink-0'>
          <Routes />
        </main>
        <aside className='aside flex-grow-0 flex-shrink-0'>
          <AppLocale />
          <AppCountry />
          <AppCurrency />
        </aside>
        <AppFooter />
        <AppPreloader />
        <AppSnackbar />
        <AppStart />
      </div>
    </Fragment>
  );
};

export default withRouter(
  connect(
    state => ({
      breakpoint: state.Breakpoints.current
    }),
    dispatch => ({
      setBreakpoints: () => {
        dispatch({ type: "BREAKPOINTS" });
      }
    })
  )(App)
);
