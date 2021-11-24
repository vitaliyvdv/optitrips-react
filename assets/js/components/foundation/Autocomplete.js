import Dialog from "js/components/foundation/Dialog";
import Input from "js/components/foundation/Input";

const AutocompleteInput = forwardRef((props, ref) => {
  const { onClick, value, placeholder, label, leadingIcon, onChange, onKeyUp, resetButton } = props;

  const onClickEvent = () => {
    onClick();
  };

  const onChangeEvent = e => {
    onChange(e);
  };

  const pushEnter = e => {
    onKeyUp(e);
  };

  let visibility;

  if (resetButton) {
    visibility = "visible";
  } else {
    visibility = "invisible";
  }

  return (
    <label className='autocomplete-fieldset d-flex align-items-center flex-grow-0 flex-shrink-0'>
      {leadingIcon && (
        <div className='autocomplete-fieldset--icon d-flex justify-content-center align-items-center flex-shrink-0'>
          <i className='material-icons md-dark'>{leadingIcon}</i>
        </div>
      )}
      <div className='d-flex align-items-center w-100 h-100'>
        <div className='autocomplete-fieldset--label mr-1 flex-shrink-0'>{label}</div>
        <div className='autocomplete-fieldset--field w-100 h-100'>
          <input
            className='d-flex align-items-center w-100 h-100 text-truncate'
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChangeEvent}
            onKeyUp={pushEnter}
            ref={ref}
          />
        </div>
      </div>
      <button
        type='button'
        className={classNames(
          "autocomplete-fieldset--cancel d-flex justify-content-center align-items-center flex-shrink-0 mr-n2",
          visibility
        )}
        onClick={onClickEvent}
      >
        <i className='material-icons md-dark'>cancel</i>
      </button>
    </label>
  );
});

const Autocomplete = forwardRef((props, ref) => {
  const {
    active,
    label,
    placeholder,
    value,
    leadingIcon,
    leadingIconClass,
    onClick,
    close,
    reset,
    onInput,
    children,
    enter,
    resetButton
  } = props;

  const closeAutocomplete = () => {
    close();
  };

  const onClickEvent = e => {
    onClick(e);
  };

  const resetAutocomplete = () => {
    reset();
  };

  const onChangeEvent = e => {
    onInput(e);
  };

  const pushEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      enter();
    }
  };

  return (
    <div className='autocomplete'>
      <Input
        className='mb-0'
        type='text'
        isLabel='true'
        label={label}
        placeholder={placeholder}
        value={value}
        leadingIcon={leadingIcon}
        leadingIconClass={leadingIconClass}
        onClick={onClickEvent}
        onFocus={() => {}}
        readonly='true'
      />
      <Dialog
        active={active}
        header='false'
        dialogClass=''
        closeDialog={closeAutocomplete}
        dialogInput={
          <AutocompleteInput
            onClick={resetAutocomplete}
            placeholder={placeholder}
            label={label}
            leadingIcon={leadingIcon}
            onChange={onChangeEvent}
            onKeyUp={pushEnter}
            value={value}
            resetButton={resetButton}
            ref={ref}
          />
        }
      >
        {children}
      </Dialog>
    </div>
  );
});

export default Autocomplete;
