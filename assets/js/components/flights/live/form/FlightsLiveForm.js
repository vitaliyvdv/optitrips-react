import Button from "js/components/foundation/Button";
import FlightsLiveDirection from "./FlightsLiveDirection";
import FlightsLiveDestination from "./FlightsLiveDestination";
import FlightsLiveDateDepart from "./FlightsLiveDateDepart";
import FlightsLiveDateReturn from "./FlightsLiveDateReturn";
import FlightsLivePassengers from "./FlightsLivePassengers";
import FlightsLiveClass from "./FlightsLiveClass";

import { useHistory } from "react-router-dom";

const FlightsLiveForm = props => {
  const {
    FlightsLiveResults,
    country,
    currency,
    locale,
    originPlace,
    destinationPlace,
    cabinClass,
    adults,
    children,
    infants,
    outbound,
    inbound,
    includeCarriers,
    excludeCarriers,
    groupPricing
  } = props;

  let history = useHistory();

  const getFlightsLiveResults = (
    country,
    currency,
    locale,
    originPlace,
    destinationPlace,
    outboundDate,
    inboundDate,
    cabinClass,
    adults,
    children,
    infants,
    includeCarriers,
    excludeCarriers,
    groupPricing,
    history
  ) => {
    FlightsLiveResults(
      country,
      currency,
      locale,
      originPlace,
      destinationPlace,
      outboundDate,
      inboundDate,
      cabinClass,
      adults,
      children,
      infants,
      includeCarriers,
      excludeCarriers,
      groupPricing,
      history
    );
  };

  return (
    <div className='search-flights py-5'>
      <div className='container d-flex justify-content-center py-md-10'>
        <div className='search-flights--form position-relative w-100'>
          <FlightsLiveDirection />
          <div className='search-flights--wrapper p-md-5 mb-4 mb-md-5'>
            <div className='search-flights--fieldset d-flex flex-wrap mb-md-0 mx-md-n2'>
              <FlightsLiveDestination />
              <div className='search-flights--date d-flex flex-wrap py-1 py-md-0'>
                <FlightsLiveDateDepart />
                <FlightsLiveDateReturn />
              </div>
              <div className='search-flights--passengers d-flex flex-wrap py-1 py-md-0'>
                <FlightsLivePassengers />
                <FlightsLiveClass />
              </div>
            </div>
          </div>
          <div className='search-flights--actions d-flex flex-wrap mx-n2 justify-content-end'>
            <div className='search-flights--actions-item px-2'>
              <Button
                uppercase
                raised
                size='md'
                className='w-100'
                value='Search'
                disabled={originPlace == "" || destinationPlace == "" || !String(destinationPlace).includes("-sky")}
                onClick={() =>
                  getFlightsLiveResults(
                    country,
                    currency,
                    locale,
                    originPlace,
                    destinationPlace,
                    outbound,
                    inbound,
                    cabinClass,
                    adults,
                    children,
                    infants,
                    includeCarriers,
                    excludeCarriers,
                    groupPricing,
                    history
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    country: state.Market.market.country,
    currency: state.Market.market.currency,
    locale: state.Market.market.locale,
    originPlace: state.FlightsLiveSearch.originPlace.current,
    destinationPlace: state.FlightsLiveSearch.destinationPlace.current,
    cabinClass: state.FlightsLiveSearch.cabinClass.current,
    adults: state.FlightsLiveSearch.passengers.adults.currentQuantity,
    children: state.FlightsLiveSearch.passengers.children.currentQuantity,
    infants: state.FlightsLiveSearch.passengers.infants.currentQuantity,
    outbound: state.FlightsLiveSearch.date.outbound.date,
    inbound: state.FlightsLiveSearch.date.inbound.date,
    includeCarriers: state.FlightsLiveSearch.carriers.include,
    excludeCarriers: state.FlightsLiveSearch.carriers.exclude,
    groupPricing: state.FlightsLiveSearch.groupPricing
  }),
  dispatch => ({
    FlightsLiveResults: (
      country,
      currency,
      locale,
      originPlace,
      destinationPlace,
      outboundDate,
      inboundDate,
      cabinClass,
      adults,
      children,
      infants,
      includeCarriers,
      excludeCarriers,
      groupPricing,
      history
    ) => {
      dispatch({
        type: "FLIGHTS_LIVE_RESULTS",
        country,
        currency,
        locale,
        originPlace,
        destinationPlace,
        outboundDate,
        inboundDate,
        cabinClass,
        adults,
        children,
        infants,
        includeCarriers,
        excludeCarriers,
        groupPricing,
        history
      });
    }
  })
)(FlightsLiveForm);
