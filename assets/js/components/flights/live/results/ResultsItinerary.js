import { useState, useEffect, useRef, Fragment } from "react";
import Velocity from "velocity-animate";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";

import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import ResultsLeg from "js/components/flights/live/results/ResultsLeg";
import ResultsDeals from "js/components/flights/live/results/ResultsDeals";
import Price from "js/components/foundation/Price";
import ResultsTime from "js/components/flights/live/results/ResultsTime";
import Duration from "js/components/foundation/Duration";

const DetailsItem = ({ children, className }) => {
  return <section className={classNames("itinerary-details--item", className)}>{children}</section>;
};

const DetailsRoutes = ({ className, children, state }) => {
  const routesRef = useRef(null);

  useEffect(() => {
    if (state) {
      Velocity(routesRef.current, "slideDown", {
        duration: 400,
        easing: "ease-in"
      });
    } else {
      Velocity(routesRef.current, "slideUp", {
        duration: 400,
        easing: "ease-out"
      });
    }
  }, [state]);

  return (
    <div className={classNames("itinerary-details--routes", className)} ref={routesRef}>
      {children}
    </div>
  );
};

const DetailsSegment = ({ data, leg }) => {
  return (
    <div className='itinerary-details--segment'>
      {leg.SegmentIds.map((segments, index) => (
        <Fragment key={index.toString()}>
          {data.Segments.filter(segment => segment.Id == segments).map((segment, index) => (
            <Fragment key={index.toString()}>
              <dl className='d-flex'>
                <dt>
                  Departure:
                  <ResultsTime value={segment.DepartureDateTime} />
                </dt>
                {data.Places.filter(place => place.Id == segment.OriginStation).map((place, index) => (
                  <dd key={index.toString()}>{place.Code + " " + place.Name}</dd>
                ))}
              </dl>
              <dl className='d-flex'>
                <dt>
                  Arrival:
                  <ResultsTime value={segment.ArrivalDateTime} />
                </dt>
                {data.Places.filter(place => place.Id == segment.DestinationStation).map((place, index) => (
                  <dd key={index.toString()}>{place.Code + " " + place.Name}</dd>
                ))}
              </dl>
              <dl className='d-flex'>
                <dt>Duration: </dt>
                <dd>
                  <Duration value={segment.Duration} />
                </dd>
              </dl>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

const DetailsDeals = ({ item, data, Currencies, isOpen, scrollContainer }) => {
  useEffect(() => {
    if (isOpen) {
      const listener = () => {
        forceCheck();
      };

      listener();

      scrollContainer.addEventListener("scroll", listener, false);
      return () => {
        scrollContainer.removeEventListener("scroll", listener, false);
      };
    }
  }, [isOpen]);

  const goTo = url => {
    window.open(url, "_blank");
  };

  const agentDescr = value => {
    let descr;
    switch (value) {
      case "Airline":
        descr = "Airline";
        break;
      case "TravelAgent":
        descr = "Travel Agent";
        break;
    }
    return descr;
  };

  return (
    <div className='itinerary-details--deals mt-7'>
      {item.PricingOptions.map((price, index) => (
        <section className='itinerary-details--deals-item d-flex align-items-center mb-4' key={index.toString()}>
          {data.Agents.filter(agent => agent.Id == price.Agents).map((agent, index) => (
            <Fragment key={index.toString()}>
              <div className='itinerary-details--deals-img position-relative flex-shrink-0 mr-7'>
                <LazyLoad>
                  <img className='position-absolute w-100' src={agent.ImageUrl} alt={agent.Name} />
                </LazyLoad>
                {agent.Type === "Airline" && <div className='itinerary-details--deals-label'>Airline</div>}
              </div>
              <div className='itinerary-details--deals-content w-100'>
                <div className='itinerary-details--deals-title mb-1'>{agent.Name}</div>
                <div className='itinerary-details--deals-descr'>{agentDescr(agent.Type)}</div>
              </div>
            </Fragment>
          ))}
          <div className='itinerary-details--deals-price d-flex justify-content-center mx-5'>
            <Price
              value={price.Price}
              symbol={Currencies.Symbol}
              SymbolOnLeft={Currencies.SymbolOnLeft}
              SpaceBetweenAmountAndSymbol={Currencies.SpaceBetweenAmountAndSymbol}
              DecimalDigits={Currencies.DecimalDigits}
              DecimalSeparator={Currencies.DecimalSeparator}
              ThousandsSeparator={Currencies.ThousandsSeparator}
            />
          </div>
          <div className='itinerary-details--deals-action flex-shrink-0'>
            <Button
              uppercase
              raised
              size='sm'
              type='button'
              value='Select'
              onClick={() => {
                goTo(price.DeeplinkUrl);
              }}
            />
          </div>
        </section>
      ))}
    </div>
  );
};

const ResultsItinerary = ({ className, data, item, Currencies }) => {
  const [details, setDetails] = useState(false);
  const [stateOutbound, setStateOutbound] = useState(false);
  const [stateInbound, setStateInbound] = useState(false);
  const dialogBody = useRef(null);

  const itineraryPopup = () => {
    setDetails(!details);
  };

  const toggleOutbound = () => {
    setStateOutbound(!stateOutbound);
  };

  const toggleInbound = () => {
    setStateInbound(!stateInbound);
  };

  return (
    <Fragment>
      <section className={classNames("itinerary", className)} onClick={itineraryPopup}>
        <div className='itinerary-legs'>
          {data.Legs.filter(leg => leg.Id === item.OutboundLegId).map((leg, index) => (
            <ResultsLeg key={index.toString()} data={data} leg={leg} onClick={() => {}} title='Outbound' />
          ))}
          {data.Legs.filter(leg => leg.Id === item.InboundLegId).map((leg, index) => (
            <ResultsLeg key={index.toString()} data={data} leg={leg} onClick={() => {}} title='Return' />
          ))}
        </div>
        <ResultsDeals data={data} item={item} Currencies={Currencies} />
      </section>
      <Dialog
        active={details}
        className={classNames("itinerary-details")}
        title='Details'
        dialogClass='mw-100'
        closeDialog={itineraryPopup}
        ref={dialogBody}
      >
        <div className='itinerary-details--body pt-6'>
          <DetailsItem className='mb-5'>
            {data.Legs.filter(leg => leg.Id === item.OutboundLegId).map((leg, index) => (
              <ResultsLeg key={index.toString()} data={data} leg={leg} onClick={toggleOutbound} title='Outbound' />
            ))}
            <DetailsRoutes state={stateOutbound}>
              {data.Legs.filter(leg => leg.Id === item.OutboundLegId).map((leg, index) => (
                <DetailsSegment key={index.toString()} data={data} leg={leg} />
              ))}
            </DetailsRoutes>
          </DetailsItem>
          <DetailsItem>
            {data.Legs.filter(leg => leg.Id === item.InboundLegId).map((leg, index) => (
              <ResultsLeg key={index.toString()} data={data} leg={leg} onClick={toggleInbound} title='Return' />
            ))}
            <DetailsRoutes state={stateInbound}>
              {data.Legs.filter(leg => leg.Id === item.InboundLegId).map((leg, index) => (
                <DetailsSegment key={index.toString()} data={data} leg={leg} />
              ))}
            </DetailsRoutes>
          </DetailsItem>
          <DetailsDeals
            data={data}
            item={item}
            Currencies={Currencies}
            isOpen={details}
            scrollContainer={dialogBody.current}
          />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default ResultsItinerary;
