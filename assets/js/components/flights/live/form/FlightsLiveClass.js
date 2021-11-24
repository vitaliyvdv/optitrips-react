import { useState, useEffect } from "react";
import Dialog from "js/components/foundation/Dialog";
import Input from "js/components/foundation/Input";

import Cabin from "data/cabin.json";
import workerFlightsCabinClass from "js/webworkers/flights/cabinClassLabel.worker.js";
const worker_FlightsCabinClass = new workerFlightsCabinClass();

const Icon = props => {
  const value = props.value;
  const current = props.current;
  if (value == current) {
    return <i className='material-icons'>radio_button_checked</i>;
  } else {
    return <i className='material-icons'>radio_button_unchecked</i>;
  }
};

const FlightsLiveClass = props => {
  const { breakpoint, cabinClass, setStateCabinClass, setCurrentCabinClass } = props;
  const [currentCabinClassLabel, setCurrentCabinClassLabel] = useState("");

  useEffect(() => {
    worker_FlightsCabinClass.onmessage = e => {
      setCurrentCabinClassLabel(e.data);
    };
    worker_FlightsCabinClass.postMessage({ list: Cabin, current: cabinClass.current });
  }, [cabinClass.current]);

  const stateCabinClass = boolean => {
    setStateCabinClass(boolean);
  };

  const setCabinClass = e => {
    setCurrentCabinClass(e.target.value);
    setStateCabinClass(false);
  };

  return (
    <div className='search-flights--passengers-item px-md-2'>
      <Input
        className='mb-0'
        readonly='true'
        isLabel='false'
        label='Cabin Class:'
        value={currentCabinClassLabel}
        leadingIcon='event_seat'
        leadingIconClass='md-dark'
        trailingIcon='arrow_drop_down'
        onClick={() => {
          stateCabinClass(true);
        }}
        trailingIconAction={() => {}}
      />
      <Dialog
        active={cabinClass.isOpen}
        className={classNames("cabin-class")}
        title='Cabin Class'
        dialogClass=''
        closeDialog={() => {
          stateCabinClass(false);
        }}
      >
        <div className='buttons-list'>
          {Cabin.map((item, index) => (
            <label
              key={index.toString()}
              className={classNames("buttons-list--item d-flex align-items-center position-relative mb-0 px-4", {
                active: item.value == cabinClass.current
              })}
            >
              <input
                type='radio'
                name='currency'
                className='position-absolute invisible'
                value={item.value}
                checked={item.value == cabinClass.current}
                onChange={setCabinClass}
              />
              <Icon value={item.value} current={cabinClass.current} />
              <div className='buttons-list--item-label text-truncate'>{item.name}</div>
            </label>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default connect(
  state => ({
    breakpoint: state.Breakpoints.current,
    cabinClass: state.FlightsLiveSearch.cabinClass
  }),
  dispatch => ({
    setStateCabinClass: boolean => {
      dispatch({ type: "CABIN_CLASS_STATE", state: boolean });
    },
    setCurrentCabinClass: value => {
      dispatch({ type: "CABIN_CLASS_CURRENT", current: value });
    }
  })
)(FlightsLiveClass);
