import { useState, useEffect } from "react";

const Checkbox = props => {
  const [isChecked, checkboxState] = useState(false);

  function checkboxClick(event) {
    props.onChange(event);
    checkboxState(!isChecked);
  }

  const { className, value, name, checked, label, iconClass } = props;

  let icon;
  if (checked || isChecked) {
    icon = "check_box";
  } else {
    icon = "check_box_outline_blank";
  }

  return (
    <div className={classNames("checkbox", className)}>
      <label className='checkbox-item d-inline-flex align-items-center position-relative m-0 p-0'>
        <input
          className='checkbox-item--input position-absolute invisible'
          type='checkbox'
          value={value}
          name={name}
          checked={checked || isChecked}
          onChange={checkboxClick}
        />
        <div className='checkbox-item--icon d-flex align-items-center justify-content-center flex-shrink-0'>
          <i className={classNames("material-icons", iconClass, { checked: checked || isChecked })}>{icon}</i>
        </div>
        {label && <div className='checkbox-item--label ml-1'>{label}</div>}
      </label>
    </div>
  );
};

export default Checkbox;
