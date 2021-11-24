import { format, parseISO } from "date-fns";

const ResultsDate = ({ value, datepicker }) => {
  return <Fragment>{format(parseISO(value), datepicker.dateFormat)}</Fragment>;
};

export default connect(state => ({
  datepicker: state.Datepicker.datepicker
}))(ResultsDate);
