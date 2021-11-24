import { useState, useEffect } from "react";

const Input = forwardRef((props, ref) => {
  const [isFocus, inputState] = useState(false);

  const {
    className,
    type,
    isLabel,
    label,
    placeholder,
    name,
    value,
    id,
    readonly,
    disabled,
    leadingIcon,
    leadingIconClass,
    trailingIcon,
    trailingIconClass,
    trailingButtonClass,
    onInput,
    onKeyup,
    onClick,
    trailingIconClick
  } = props;

  const inputEvent = event => {
    onInput(event);
  };

  const focusEvent = event => {
    inputState(true);
  };

  const onBlurEvent = () => {
    inputState(false);
  };

  const keyupEvent = () => {
    onKeyup();
  };

  const clickEvent = event => {
    onClick(event);
  };

  const trailingIconAction = () => {
    trailingIconClick();
  };

  return (
    <div className={classNames("text-field", className, { focus: isFocus })}>
      <label className='d-flex w-100 m-0 h-100'>
        {leadingIcon && (
          <div className='text-field--icon d-flex justify-content-center align-items-center flex-shrink-0'>
            <i className={classNames("material-icons", leadingIconClass, { focus: isFocus })}>{leadingIcon}</i>
          </div>
        )}
        <div
          className={classNames("text-field--container position-relative d-flex align-items-center w-100 h-100", {
            focus: isFocus
          })}
        >
          <div className='d-flex align-items-center w-100 h-100'>
            {isLabel == "true" && label && (
              <div className={classNames("text-field--label mr-1 flex-shrink-0", { focus: isFocus })}>{label}</div>
            )}
            <input
              className={classNames("text-field--input d-flex align-items-center w-100 text-truncate px-0 py-1", {
                "pl-4": !leadingIcon
              })}
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              autoComplete='off'
              value={value}
              onInput={inputEvent}
              onFocus={focusEvent}
              onKeyUp={keyupEvent}
              onClick={clickEvent}
              onBlur={onBlurEvent}
              readOnly={readonly == "true"}
              disabled={disabled}
              ref={ref}
            />
          </div>
          {trailingIcon && (
            <div
              className={classNames(
                "text-field--btn d-flex align-items-center justify-content-center p-0 flex-shrink-0",
                trailingButtonClass
              )}
              onClick={trailingIconAction}
            >
              <i className={classNames("material-icons", trailingIconClass)}>{trailingIcon}</i>
            </div>
          )}
        </div>
      </label>
    </div>
  );
});

export default Input;
