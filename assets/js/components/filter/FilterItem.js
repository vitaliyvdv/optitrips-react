import { useState, useEffect } from "react";
import Velocity from "velocity-animate";

const FilterItem = props => {
  const { title, open, children } = props;
  const [isOpen, setIsOpen] = useState(open);

  let filterItemBody = React.createRef();

  useEffect(() => {
    if (isOpen) {
      Velocity(filterItemBody, "slideDown", {
        duration: 0,
        easing: "ease-in"
      });
    } else {
      Velocity(filterItemBody, "slideUp", {
        duration: 0,
        easing: "ease-out"
      });
    }
  }, []);

  const filterItemToggle = () => {
    if (!isOpen) {
      Velocity(filterItemBody, "slideDown", {
        duration: 400,
        easing: "ease-in"
      });
      setIsOpen(true);
    } else {
      Velocity(filterItemBody, "slideUp", {
        duration: 400,
        easing: "ease-out"
      });
      setIsOpen(false);
    }
  };

  return (
    <div className='filter-item mb-5'>
      <button
        type='button'
        className='filter-item--header d-flex align-items-center justify-content-between w-100 p-0'
        onClick={filterItemToggle}
      >
        <div className='filter-item--header-title'>{title}</div>
        <div
          className={classNames("filter-item--header-icon d-flex align-items-center justify-content-center", {
            active: isOpen
          })}
        >
          <i className='material-icons md-dark'>expand_more</i>
        </div>
      </button>
      <div className={classNames("filter-item--body py-1", { hidden: !isOpen })} ref={filterItemBody}>
        {children}
      </div>
    </div>
  );
};

export default FilterItem;
