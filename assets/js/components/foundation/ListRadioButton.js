const ListRadioButton = props => {
  const { value, name, checked, label, className, onChange } = props;

  const radiobuttonClick = e => {
    onChange(e);
  };

  let icon;
  if (checked) {
    icon = "radio_button_checked";
  } else {
    icon = "radio_button_unchecked";
  }

  return (
    <label
      className={classNames("buttons-list--item d-flex align-items-center position-relative mb-0 px-4", className)}
    >
      <input
        className='position-absolute invisible'
        type='radio'
        value={value}
        name={name}
        checked={checked}
        onChange={radiobuttonClick}
      />
      <i className='material-icons'>{icon}</i>
      <div className='buttons-list--item-label text-truncate'>{label}</div>
    </label>
  );
};

export default ListRadioButton;
