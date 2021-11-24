import { useState, useEffect } from "react";
const DatePicker = loadable(() => import("react-datepicker"));
import Dialog from "js/components/foundation/Dialog";
import Input from "js/components/foundation/Input";

import { format, isAfter } from "date-fns";

const FlightsLiveDateDepart = props => {
  const {
    outboundDate,
    inboundDate,
    setOutboundDatePopup,
    datepicker,
    setOutboundDate,
    setInboundDate,
    initDatePicker
  } = props;

  let date = outboundDate.date;

  const [formatDate, setFormatDate] = useState(date);

  useEffect(() => {
    setFormatDate(format(new Date(date), datepicker.dateFormat));
  }, [datepicker.dateFormat, date]);

  const stateOutboundCalendar = boolean => {
    setOutboundDatePopup(boolean);
  };

  const setDates = date => {
    setOutboundDate(format(date, "yyyy-MM-dd"));
    if (isAfter(date, new Date(inboundDate.date))) {
      setInboundDate(format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <div className='search-flights--date-item px-md-2 mb-md-4 mb-lg-0'>
      <Input
        className='mb-0'
        isLabel='true'
        label='Depart:'
        readonly='true'
        value={formatDate}
        leadingIcon='date_range'
        leadingIconClass='md-dark'
        onClick={() => {
          stateOutboundCalendar(true);
          initDatePicker(true);
        }}
      />
      <Dialog
        active={outboundDate.isOpen}
        className={classNames("calendar")}
        title='Depart'
        dialogClass=''
        closeDialog={() => {
          stateOutboundCalendar(false);
        }}
      >
        {outboundDate.isInit && (
          <DatePicker
            selected={new Date(date)}
            minDate={new Date()}
            locale={datepicker.lang}
            dateFormat={datepicker.dateFormat}
            onChange={date => {
              stateOutboundCalendar(false);
              setDates(date);
            }}
            inline
          />
        )}
      </Dialog>
    </div>
  );
};

export default connect(
  state => ({
    outboundDate: state.FlightsLiveSearch.date.outbound,
    inboundDate: state.FlightsLiveSearch.date.inbound,
    datepicker: state.Datepicker.datepicker
  }),
  dispatch => ({
    initDatePicker: boolean => {
      dispatch({ type: "OUTBOUND_DATE_IS_INIT", isInit: boolean });
    },
    setOutboundDatePopup: boolean => {
      dispatch({ type: "OUTBOUND_DATE_IS_OPEN", isOpen: boolean });
    },
    setOutboundDate: date => {
      dispatch({ type: "OUTBOUND_DATE", date: date });
    },
    setInboundDate: date => {
      dispatch({ type: "INBOUND_DATE", date: date });
    }
  })
)(FlightsLiveDateDepart);
