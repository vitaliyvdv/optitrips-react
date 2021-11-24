import LazyLoad from "react-lazyload";

import Duration from "js/components/foundation/Duration";
import ResultsTime from "js/components/flights/live/results/ResultsTime";
import ResultsDate from "js/components/flights/live/results/ResultsDate";
import { Fragment } from "react";

const ResultsLegRoute = ({ data, time, value }) => {
  return (
    <div className='itinerary-leg--info-route'>
      <div className='itinerary-leg--info-route--time'>
        <ResultsTime value={time} />
      </div>
      {data.Places.filter(place => place.Id == value).map((place, index) => (
        <Fragment key={index.toString()}>
          <div className='itinerary-leg--info-route--code'>{place.Code}</div>
          <div className='itinerary-leg--info-route--place'>{place.Name}</div>
        </Fragment>
      ))}
    </div>
  );
};

const ResultsLeg = ({ data, leg, onClick, title }) => {
  const elementClick = e => {
    onClick(e);
  };

  return (
    <div className='itinerary-leg' onClick={elementClick}>
      {title && (
        <dl className='itinerary-leg--title m-0 mb-3'>
          <dt>{`${title}: `}</dt>
          <dd>
            <ResultsDate value={leg.Departure} />
          </dd>
        </dl>
      )}

      <div className='itinerary-leg--content'>
        <div className='itinerary-leg--logo'>
          {leg.Carriers.map((carriers, index) => (
            <Fragment key={index.toString()}>
              {data.Carriers.filter(carrier => carrier.Id == carriers).map((carrier, index) => (
                <figure className='itinerary-leg--img d-block m-0 position-relative' key={index.toString()}>
                  <LazyLoad>
                    <img
                      className='position-absolute w-100'
                      src={carrier.ImageUrl}
                      alt={carrier.Name}
                      title={carrier.Name}
                    />
                  </LazyLoad>
                </figure>
              ))}
            </Fragment>
          ))}
        </div>

        <div className='itinerary-leg--info'>
          <ResultsLegRoute time={leg.Departure} data={data} value={leg.OriginStation} />
          <div className='itinerary-leg--stops'>
            <div className='itinerary-leg--stops-duration'>
              <Duration value={leg.Duration} />
            </div>
            <ul className='itinerary-leg--stops-line list-unstyled d-flex justify-content-between align-items-center p-0 m-0'>
              <li className='invisible'></li>
              {leg.Stops.map((stops, index) => (
                <li key={index.toString()}></li>
              ))}
              <li className='invisible'></li>
            </ul>
            <div className='itinerary-leg--stops-text'>
              {leg.Stops.length > 0 ? (
                <dl>
                  <dt>Stops: {leg.Stops.length + " "}</dt>
                  <dd className='text-uppercase'>
                    (
                    {leg.Stops.map((stops, index) => (
                      <Fragment key={index.toString()}>
                        {data.Places.filter(place => place.Id == stops).map((stop, index) => (
                          <span key={index.toString()} title={stop.Name + ", " + stop.Type}>
                            {stop.Code}
                          </span>
                        ))}
                        {leg.Stops.length != Number(index) + 1 ? ", " : ""}
                      </Fragment>
                    ))}
                    )
                  </dd>
                </dl>
              ) : (
                <span>Direct</span>
              )}
            </div>
          </div>
          <ResultsLegRoute time={leg.Arrival} data={data} value={leg.DestinationStation} />
        </div>
      </div>
    </div>
  );
};

export default ResultsLeg;
