import { format, parseISO } from "date-fns";

const ResultsTime = ({ value }) => {
  return <Fragment>{format(parseISO(value), "HH:mm")}</Fragment>;
};

export default ResultsTime;
