import Button from "js/components/foundation/Button";

const FlightsPassengersCounter = props => {
  const {
    className,
    value,
    decrease,
    increase,
    disabledDecrease,
    disabledIncrease,
    title,
    titleDecrease,
    titleIncrease
  } = props;

  const clickDecrease = e => {
    decrease(e);
  };

  const clickIncrease = e => {
    increase(e);
  };

  return (
    <section
      className={classNames(
        "passengers-block d-flex align-items-center justify-content-between w-auto mr-n2",
        className
      )}
    >
      {title && <h3 className='passengers-block--title w-100 m-0 pr-3'>{title}</h3>}
      <div className='passengers-block--counter d-flex align-items-center flex-shrink-0'>
        <Button
          link
          className='passengers-block--button'
          title={titleDecrease}
          icon='remove_circle'
          onClick={clickDecrease}
          disabled={disabledDecrease}
        />
        <input className='passengers-block--input text-center' type='text' value={value} readOnly />
        <Button
          link
          className='passengers-block--button'
          title={titleIncrease}
          icon='add_circle'
          onClick={clickIncrease}
          disabled={disabledIncrease}
        />
      </div>
    </section>
  );
};

export default FlightsPassengersCounter;
