import { useState, useEffect, useRef } from "react";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import { format, set, getTime } from "date-fns";

import Range from "js/components/foundation/Range";

const DurationRange = ({ className, title, timeMin, timeMax, change }) => {
  const [from, setFrom] = useState(timeMin);
  const [to, setTo] = useState(timeMax);
  const [duration, setDuration] = useState(timeMax);
  const rangeRef = useRef(null);

  const sliderChange = value => {
    change(value);
  };

  const timeConvert = n => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + " h " + rminutes + " min";
  };

  useEffect(() => {
    const timerange = rangeRef.current;

    noUiSlider.create(timerange, {
      start: timeMax,
      range: {
        min: timeMin,
        max: timeMax
      },
      step: 30,
      connect: [true, false],
      tooltips: [
        wNumb({
          edit: function (value) {
            return timeConvert(value);
          }
        })
      ]
    });

    timerange.noUiSlider.on("update", function (values, handle) {
      setDuration(String(+values[0]));
    });

    timerange.noUiSlider.on("change", function (values, handle) {
      sliderChange(String(+values[0]));
    });
  }, []);

  return (
    <Range className={className} title={title} ref={rangeRef}>
      <div>{timeConvert(timeMin)}</div>
      {duration > timeMin && (
        <Fragment>
          <div>-</div>
          <div>{timeConvert(duration)}</div>
        </Fragment>
      )}
    </Range>
  );
};

export default DurationRange;
