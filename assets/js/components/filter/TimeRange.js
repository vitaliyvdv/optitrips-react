import { useState, useEffect, useRef } from "react";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import { format, set, getTime } from "date-fns";

import Range from "js/components/foundation/Range";

const TimeRange = ({ className, title, valueFrom, valueTo, change }) => {
  const [from, setFrom] = useState(valueFrom);
  const [to, setTo] = useState(valueTo);
  const rangeRef = useRef(null);

  const sliderChange = (from, to) => {
    change(from, to);
  };

  useEffect(() => {
    const timestamp = (hours, minutes) => {
      let setDate = set(new Date(), { hours: hours, minutes: minutes, seconds: 0, milliseconds: 0 });
      let result = getTime(setDate);
      return result;
    };

    let timerange = rangeRef.current;
    let timeMin = timestamp(0, 0);
    let timeMax = timestamp(23, 59);

    noUiSlider.create(timerange, {
      start: [timeMin, timeMax],
      range: {
        min: timeMin,
        max: timeMax
      },
      step: 30 * 60 * 1000,
      connect: true,
      tooltips: [
        wNumb({
          edit: function (value) {
            return format(+value, "HH:mm");
          }
        }),
        wNumb({
          edit: function (value) {
            return format(+value, "HH:mm");
          }
        })
      ]
    });

    timerange.noUiSlider.on("update", function (values, handle) {
      setFrom(String(format(+values[0], "HH:mm")));
      setTo(String(format(+values[1], "HH:mm")));
    });

    timerange.noUiSlider.on("change", function (values, handle) {
      sliderChange(String(format(+values[0], "HH:mm")), String(format(+values[1], "HH:mm")));
    });
  }, []);

  return (
    <Range className={className} title={title} to={to} ref={rangeRef}>
      <div>{from}</div>
      <div>-</div>
      <div>{to}</div>
    </Range>
  );
};

export default TimeRange;
