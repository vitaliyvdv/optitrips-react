import ReactGA from "react-ga";

const GoogleAnalytics = page => {
  if (window.location.hostname.includes(process.env.APP_HOSTNAME)) {
    ReactGA.initialize("UA-166282822-1");
    ReactGA.pageview(page);
  }
};

export { GoogleAnalytics };
