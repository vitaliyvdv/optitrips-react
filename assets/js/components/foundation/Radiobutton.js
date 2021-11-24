const Radiobutton = props => {
  const { value, name, checked, label, className, iconclassName, onChange } = props;

  function radiobuttonClick(e) {
    onChange(e);
  }

  let icon;
  if (checked) {
    icon = "radio_button_checked";
  } else {
    icon = "radio_button_unchecked";
  }

  return (
    <div className={classNames("radiobutton", className)}>
      <label className='radiobutton-item d-flex align-items-center position-relative m-0 p-0'>
        <input
          className='radiobutton-item--input position-absolute invisible'
          type='radio'
          value={value}
          name={name}
          checked={checked}
          onChange={radiobuttonClick}
        />
        <div className='radiobutton-item--icon d-flex align-items-center justify-content-center flex-shrink-0'>
          <i className={classNames("material-icons", iconclassName, { checked: checked })}>{icon}</i>
        </div>
        {label && <div className='radiobutton-item--label ml-1'>{label}</div>}
      </label>
    </div>
  );
};
export default Radiobutton;
