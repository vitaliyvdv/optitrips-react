import { useState, useEffect } from "react";
const DatePicker = loadable(() => import("react-datepicker"));
import Dialog from "js/components/foundation/Dialog";
import Input from "js/components/foundation/Input";

import { format, isBefore, addDays } from "date-fns";

const FlightsLiveDateReturn = props => {
  const {
    inboundDate,
    outboundDate,
    setInboundDatePopup,
    datepicker,
    setOutboundDate,
    setInboundDate,
    direction,
    initDatePicker
  } = props;

  let date = inboundDate.date;

  const [formatDate, setFormatDate] = useState(date);

  useEffect(() => {
    if (date !== "") {
      setFormatDate(format(new Date(date), datepicker.dateFormat));
    }
  }, [datepicker.dateFormat, date]);

  useEffect(() => {
    if (direction == 1) {
      setInboundDate("");
      setFormatDate("");
    } else {
      if (date == "") {
        setInboundDate(format(addDays(new Date(), 12), "yyyy-MM-dd"));
      }
    }
  }, [direction]);

  let selectedDate;
  if (date !== "") {
    selectedDate = new Date(date);
  } else {
    selectedDate = new Date();
  }

  const stateInboundCalendar = boolean => {
    setInboundDatePopup(boolean);
  };

  const setDates = date => {
    setInboundDate(format(date, "yyyy-MM-dd"));
    if (isBefore(date, new Date(outboundDate.date))) {
      setOutboundDate(format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <div className='search-flights--date-item px-md-2 mb-md-4 mb-lg-0'>
      <Input
        className='mb-0'
        isLabel='true'
        label='Return:'
        readonly='true'
        disabled={direction == 1}
        value={formatDate}
        placeholder={direction == 1 ? "One way" : ""}
        leadingIcon={direction == 1 ? "event_busy" : "date_range"}
        leadingIconClass='md-dark'
        onClick={() => {
          stateInboundCalendar(true);
          initDatePicker(true);
        }}
      />
      {direction != 1 && (
        <Dialog
          active={inboundDate.isOpen}
          className={classNames("calendar")}
          title='Return'
          dialogClass=''
          closeDialog={() => {
            stateInboundCalendar(false);
          }}
        >
          {inboundDate.isInit && (
            <DatePicker
              selected={selectedDate}
              minDate={new Date()}
              locale={datepicker.lang}
              dateFormat={datepicker.dateFormat}
              onChange={date => {
                stateInboundCalendar(false);
                setDates(date);
              }}
              inline
            />
          )}
        </Dialog>
      )}
    </div>
  );
};

export default connect(
  state => ({
    inboundDate: state.FlightsLiveSearch.date.inbound,
    outboundDate: state.FlightsLiveSearch.date.outbound,
    datepicker: state.Datepicker.datepicker,
    direction: state.FlightsLiveSearch.direction.current
  }),
  dispatch => ({
    initDatePicker: boolean => {
      dispatch({ type: "INBOUND_DATE_IS_INIT", isInit: boolean });
    },
    setInboundDatePopup: boolean => {
      dispatch({ type: "INBOUND_DATE_IS_OPEN", isOpen: boolean });
    },
    setOutboundDate: date => {
      dispatch({ type: "OUTBOUND_DATE", date: date });
    },
    setInboundDate: date => {
      dispatch({ type: "INBOUND_DATE", date: date });
    }
  })
)(FlightsLiveDateReturn);
