import { useState, useEffect } from "react";
import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import Input from "js/components/foundation/Input";

const FlightsPassengersCounter = loadable(() => import("js/components/flights/live/form/FlightsPassengersCounter"));

import workerPassengers from "js/webworkers/flights/passengers.worker.js";
const worker_Passengers = new workerPassengers();

import workerIncrease from "js/webworkers/increase.worker.js";
const worker_Increase = new workerIncrease();

import workerDecrease from "js/webworkers/decrease.worker.js";
const worker_Decrease = new workerDecrease();

const FlightsLivePassengers = props => {
  const {
    totalQuantity,
    passengers,
    setPassengersPopup,
    setsetPassengersQty,
    setPassengersAdults,
    setPassengersChildren,
    setPassengersInfants,
    initPassengers
  } = props;

  const [tempAdults, setTempAdults] = useState(passengers.adults.currentQuantity);
  const [tempChildren, setTempChildren] = useState(passengers.children.currentQuantity);
  const [tempInfants, setTempInfants] = useState(passengers.infants.currentQuantity);

  useEffect(() => {
    worker_Passengers.onmessage = e => {
      setsetPassengersQty(e.data);
    };
    worker_Passengers.postMessage({
      adults: passengers.adults.currentQuantity,
      children: passengers.children.currentQuantity,
      infants: passengers.infants.currentQuantity
    });
  }, [passengers.adults.currentQuantity, passengers.children.currentQuantity, passengers.infants.currentQuantity]);

  const statePassengers = boolean => {
    setPassengersPopup(boolean);
  };

  const resetPassengers = () => {
    setTempAdults(passengers.adults.currentQuantity);
    setTempChildren(passengers.children.currentQuantity);
    setTempInfants(passengers.infants.currentQuantity);
  };

  const adultsQtyIncrease = value => {
    worker_Increase.onmessage = e => {
      setTempAdults(e.data);
    };
    worker_Increase.postMessage(value);
  };

  const adultsQtyDecrease = value => {
    worker_Decrease.onmessage = e => {
      setTempAdults(e.data);
    };
    worker_Decrease.postMessage(value);
  };

  const childrenQtyIncrease = value => {
    worker_Increase.onmessage = e => {
      setTempChildren(e.data);
    };
    worker_Increase.postMessage(value);
  };

  const childrenQtyDecrease = value => {
    worker_Decrease.onmessage = e => {
      setTempChildren(e.data);
    };
    worker_Decrease.postMessage(value);
  };

  const infantsQtyIncrease = value => {
    worker_Increase.onmessage = e => {
      setTempInfants(e.data);
    };
    worker_Increase.postMessage(value);
  };

  const infantsQtyDecrease = value => {
    worker_Decrease.onmessage = e => {
      setTempInfants(e.data);
    };
    worker_Decrease.postMessage(value);
  };

  const setPassengers = () => {
    setPassengersAdults(tempAdults);
    setPassengersChildren(tempChildren);
    setPassengersInfants(tempInfants);
    statePassengers(false);
  };

  return (
    <div className='search-flights--passengers-item px-md-2'>
      <Input
        className='mb-0'
        readonly='true'
        isLabel='true'
        label='Travellers:'
        value={passengers.totalQuantity}
        leadingIcon='person'
        leadingIconClass='md-dark'
        trailingIcon='arrow_drop_down'
        onClick={() => {
          statePassengers(true);
          initPassengers(true);
        }}
        trailingIconClick={() => {
          statePassengers(true);
        }}
      />

      <Dialog
        active={passengers.isOpen}
        className={classNames("passengers")}
        title='Travellers'
        dialogClass=''
        closeDialog={() => {
          statePassengers(false);
          resetPassengers();
        }}
        dialogAction={<Button link uppercase value='Save' onClick={setPassengers} />}
      >
        {passengers.isInit && (
          <div className='d-flex py-2'>
            <div className='flef-grow-0'>
              <FlightsPassengersCounter
                title='Adults'
                className='mb-3'
                titleDecrease='Decrease number of adults'
                titleIncrease='Increase number of adults'
                decrease={() => {
                  adultsQtyDecrease(tempAdults);
                }}
                increase={() => {
                  adultsQtyIncrease(tempAdults);
                }}
                value={tempAdults}
                disabledDecrease={tempAdults == 1}
                disabledIncrease={tempAdults === passengers.adults.maxQuantity}
              />
              <FlightsPassengersCounter
                title='Children'
                className='mb-3'
                titleDecrease='Decrease number of children'
                titleIncrease='Increase number of children'
                decrease={() => {
                  childrenQtyDecrease(tempChildren);
                }}
                increase={() => {
                  childrenQtyIncrease(tempChildren);
                }}
                value={tempChildren}
                disabledDecrease={tempChildren == 0}
                disabledIncrease={tempChildren === passengers.children.maxQuantity}
              />
              <FlightsPassengersCounter
                title='Infants'
                titleDecrease='Decrease number of infants'
                titleIncrease='Increase number of infants'
                decrease={() => {
                  infantsQtyDecrease(tempInfants);
                }}
                increase={() => {
                  infantsQtyIncrease(tempInfants);
                }}
                value={tempInfants}
                disabledDecrease={tempInfants == 0}
                disabledIncrease={tempInfants === passengers.infants.maxQuantity}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default connect(
  state => ({
    passengers: state.FlightsLiveSearch.passengers
  }),
  dispatch => ({
    initPassengers: boolean => {
      dispatch({ type: "PASSENGERS_IS_INIT", isInit: boolean });
    },
    setPassengersPopup: boolean => {
      dispatch({ type: "PASSENGERS_IS_OPEN", isOpen: boolean });
    },
    setsetPassengersQty: value => {
      dispatch({ type: "PASSENGERS_TOTAL_QUANTITY", totalQuantity: value });
    },
    setPassengersAdults: value => {
      dispatch({ type: "PASSENGERS_ADULTS_QUANTITY", currentQuantity: value });
    },
    setPassengersChildren: value => {
      dispatch({ type: "PASSENGERS_CHILDREN_QUANTITY", currentQuantity: value });
    },
    setPassengersInfants: value => {
      dispatch({ type: "PASSENGERS_INFANTS_QUANTITY", currentQuantity: value });
    }
  })
)(FlightsLivePassengers);
