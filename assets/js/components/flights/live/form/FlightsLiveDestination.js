import { useState, useEffect, useRef } from "react";

import Autocomplete from "js/components/foundation/Autocomplete";

const FlightsLivePlaces = loadable(() => import("js/components/flights/live/form/FlightsLivePlaces"));

import workerPlacesList from "js/webworkers/flights/placesList.worker.js";
const worker_PlacesList = new workerPlacesList();

const FlightsLiveDestination = props => {
  const {
    originPlace,
    destinationPlace,
    SET_originPlace_isOpen,
    SET_destinationPlace_isOpen,
    placesList,
    set_placesList,
    set_placesMatch,
    SET_originPlace_current,
    SET_originPlace_fullName,
    SET_destinationPlace_current,
    SET_destinationPlace_fullName,
    market,
    places,
    originPlace_isInit,
    destinationPlace_isInit
  } = props;

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    if (originPlace.isOpen) {
      fromRef.current.focus();
    }
  }, [originPlace.isOpen]);

  useEffect(() => {
    if (destinationPlace.isOpen) {
      toRef.current.focus();
    }
  }, [destinationPlace.isOpen]);

  const reset_placesList = () => {
    set_placesList([], "");
  };

  const autocompleteOriginPlace = boolean => {
    SET_originPlace_isOpen(boolean);
    if (!boolean) {
      reset_placesList();
    }
  };

  const autocompleteDestinationPlace = boolean => {
    SET_destinationPlace_isOpen(boolean);
    if (!boolean) {
      reset_placesList();
    }
  };

  const placesInit = e => {
    if (e.target.value) {
      worker_PlacesList.onmessage = e => {
        set_placesList(e.data.list, e.data.firstMatch);
      };
      worker_PlacesList.postMessage({
        country: market.country,
        currency: market.currency,
        locale: market.locale,
        query: e.target.value
      });
    } else {
      reset_placesList();
    }
  };

  const resetOriginPlace = () => {
    SET_originPlace_current("");
    SET_originPlace_fullName("");
    reset_placesList();
    fromRef.current.focus();
  };

  const resetDestinationPlace = () => {
    SET_destinationPlace_current("");
    SET_destinationPlace_fullName("");
    reset_placesList();
    toRef.current.focus();
  };

  const inputOriginPlace = e => {
    placesInit(e);
    if (e.target.value !== "") {
      SET_originPlace_fullName(e.target.value);
      SET_originPlace_current(places.firstMatch);
    } else {
      resetOriginPlace();
    }
  };

  const inputDestinationPlace = e => {
    placesInit(e);
    if (e.target.value !== "") {
      SET_destinationPlace_fullName(e.target.value);
      SET_destinationPlace_current(places.firstMatch);
    } else {
      resetDestinationPlace();
    }
  };

  const setOriginPlace = e => {
    SET_originPlace_current(e.target.value);
    SET_originPlace_fullName(e.target.dataset.title);
    autocompleteOriginPlace(false);
    set_placesList([]);
  };

  const setDestinationPlace = e => {
    SET_destinationPlace_current(e.target.value);
    SET_destinationPlace_fullName(e.target.dataset.title);
    autocompleteDestinationPlace(false);
    set_placesList([]);
  };

  return (
    <div className='search-flights--destinations d-flex flex-wrap py-1 py-md-0'>
      <div className='search-flights--destinations-item px-md-2 mb-md-4'>
        <Autocomplete
          label='From:'
          placeholder='Country, city or airport'
          leadingIcon='flight_takeoff'
          leadingIconClass='md-dark'
          active={originPlace.isOpen}
          value={originPlace.fullName}
          onClick={() => {
            autocompleteOriginPlace(true);
            originPlace_isInit(true);
          }}
          close={() => {
            autocompleteOriginPlace(false);
          }}
          onInput={inputOriginPlace}
          enter={() => {
            autocompleteOriginPlace(false);
          }}
          reset={resetOriginPlace}
          resetButton={originPlace.fullName}
          ref={fromRef}
        >
          {originPlace.isInit && <FlightsLivePlaces onClick={setOriginPlace} />}
        </Autocomplete>
      </div>
      <div className='search-flights--destinations-item px-md-2 mb-md-4'>
        <Autocomplete
          label='To:'
          placeholder='Country, city or airport'
          leadingIcon='flight_land'
          leadingIconClass='md-dark'
          active={destinationPlace.isOpen}
          value={destinationPlace.fullName}
          onClick={() => {
            autocompleteDestinationPlace(true);
            destinationPlace_isInit(true);
          }}
          close={() => {
            autocompleteDestinationPlace(false);
          }}
          onInput={inputDestinationPlace}
          enter={() => {
            autocompleteDestinationPlace(false);
          }}
          reset={resetDestinationPlace}
          resetButton={destinationPlace.fullName}
          ref={toRef}
        >
          {destinationPlace.isInit && <FlightsLivePlaces onClick={setDestinationPlace} />}
        </Autocomplete>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    originPlace: state.FlightsLiveSearch.originPlace,
    destinationPlace: state.FlightsLiveSearch.destinationPlace,
    places: state.FlightsLivePlaces.places,
    market: state.Market.market
  }),
  dispatch => ({
    originPlace_isInit: boolean => {
      dispatch({ type: "ORIGIN_PLACE_IS_INIT", isInit: boolean });
    },
    SET_originPlace_isOpen: boolean => {
      dispatch({ type: "ORIGIN_PLACE_IS_OPEN", isOpen: boolean });
    },
    SET_originPlace_current: value => {
      dispatch({ type: "ORIGIN_PLACE_CURRENT", current: value });
    },
    SET_originPlace_fullName: value => {
      dispatch({ type: "ORIGIN_PLACE_FULL_NAME", fullName: value });
    },
    destinationPlace_isInit: boolean => {
      dispatch({ type: "DESTINATION_PLACE_IS_INIT", isInit: boolean });
    },
    SET_destinationPlace_isOpen: boolean => {
      dispatch({ type: "DESTINATION_PLACE_IS_OPEN", isOpen: boolean });
    },
    SET_destinationPlace_current: value => {
      dispatch({ type: "DESTINATION_PLACE_CURRENT", current: value });
    },
    SET_destinationPlace_fullName: value => {
      dispatch({ type: "DESTINATION_PLACE_FULL_NAME", fullName: value });
    },
    set_placesList: (list, match) => {
      dispatch({ type: "PLACES_LIST", list: list, firstMatch: match });
    }
  })
)(FlightsLiveDestination);
