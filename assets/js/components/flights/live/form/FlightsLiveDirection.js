import { useState, useEffect } from "react";

import Direction from "data/route.json";
import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import ListRadioButton from "js/components/foundation/ListRadioButton";
import Radiobutton from "js/components/foundation/Radiobutton";

import workerFlightsRoute from "js/webworkers/flights/routeLabel.worker.js";
const worker_FlightsRoute = new workerFlightsRoute();

const Icon = props => {
  const value = props.value;
  const current = props.current;
  if (value == current) {
    return <i className='material-icons'>radio_button_checked</i>;
  } else {
    return <i className='material-icons'>radio_button_unchecked</i>;
  }
};

const FlightsLiveDirection = props => {
  const { breakpoint, direction, setStateDirection, setCurrentDirection } = props;
  const [currentDirectionLabel, setcurrentDirectionLabel] = useState("");

  useEffect(() => {
    worker_FlightsRoute.onmessage = e => {
      setcurrentDirectionLabel(e.data);
    };
    worker_FlightsRoute.postMessage({ list: Direction, current: direction.current });
  }, [direction.current]);

  const stateDirection = boolean => {
    setStateDirection(boolean);
  };

  const setDirection = e => {
    setCurrentDirection(e.target.value);
    setStateDirection(false);
  };

  return (
    <div className='search-flights--route d-flex align-items-center mb-3 mb-md-4 ml-md-n2'>
      {(breakpoint.xl || breakpoint.lg || breakpoint.md) &&
        Direction.map((item, index) => (
          <Radiobutton
            key={index.toString()}
            name='route'
            className='my-0 mr-3'
            iconclassName='md-dark'
            label={item.title}
            value={item.value}
            onChange={setDirection}
            checked={item.value == direction.current}
          />
        ))}

      {(breakpoint.sm || breakpoint.xs) && (
        <Fragment>
          <Button
            className='btn-sm btn-dropdown dropdown-light flex-shrink-0 mx-0 px-0 font-weight-normal'
            value={currentDirectionLabel}
            trailingIcon='arrow_drop_down'
            onClick={() => {
              stateDirection(true);
            }}
          />
          <Dialog
            active={direction.isOpen}
            className={classNames("flight-direction")}
            title='Direction'
            dialogClass=''
            closeDialog={() => {
              stateDirection(false);
            }}
          >
            <div className='buttons-list'>
              {Direction.map((item, index) => (
                <label
                  key={index.toString()}
                  className={classNames("buttons-list--item d-flex align-items-center position-relative mb-0 px-4", {
                    active: item.value == direction.current
                  })}
                >
                  <input
                    type='radio'
                    name='route'
                    className='position-absolute invisible'
                    value={item.value}
                    checked={item.value == direction.current}
                    onChange={setDirection}
                  />
                  <Icon value={item.value} current={direction.current} />
                  <div className='buttons-list--item-label text-truncate'>{item.title}</div>
                </label>
              ))}
            </div>
          </Dialog>
        </Fragment>
      )}
    </div>
  );
};

export default connect(
  state => ({
    breakpoint: state.Breakpoints.current,
    direction: state.FlightsLiveSearch.direction
  }),
  dispatch => ({
    setStateDirection: boolean => {
      dispatch({ type: "DIRECTION_STATE", state: boolean });
    },
    setCurrentDirection: value => {
      dispatch({ type: "DIRECTION_CURRENT", current: value });
    }
  })
)(FlightsLiveDirection);
