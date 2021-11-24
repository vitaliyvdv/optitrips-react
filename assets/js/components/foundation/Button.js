const Button = props => {
  const {
    color,
    icon,
    iconbutton,
    trailingIcon,
    value,
    className,
    type,
    iconclassName,
    trailingIconclassName,
    disabled,
    primary,
    raised,
    uppercase,
    outline,
    size,
    floating,
    link,
    ...rest
  } = props;

  function buttonClick(event) {
    props.onClick(event);
  }

  let classnames = classNames(
    `btn d-inline-flex flex-shrink-0 align-items-center btn-${color} btn-${size} py-0`,
    {
      "btn-link": link,
      "btn-raised": raised,
      "text-uppercase": uppercase,
      "btn-outline": outline,
      "btn-icon position-relative": icon && !value,
      "rounded-circle": floating,
      "px-5": !(icon && !value) && size == "lg" && !link,
      "px-4": ((!(icon && !value) && size == "md") || (icon && !value && size == "lg")) && !link,
      "px-3": ((!(icon && !value) && size == "sm") || (icon && !value && size == "md")) && !link,
      "px-2": (icon && !value && size == "sm" && !link) || link
    },
    className
  );

  return (
    <button type={type} className={classnames} onClick={buttonClick} disabled={disabled} {...rest}>
      {icon && <i className={classNames("material-icons", iconclassName)}>{icon}</i>}
      {value && <div className='btn-value'>{value}</div>}
      {trailingIcon && <i className={classNames("material-icons", trailingIconclassName)}>{trailingIcon}</i>}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["primary", "secondary", "silver", "transparent"])
};

Button.defaultProps = {
  size: "md",
  color: "primary"
};

export default Button;
