import wNumb from "wnumb";

const Price = props => {
  const {
    className,
    value,
    SymbolOnLeft,
    symbol,
    SpaceBetweenAmountAndSymbol,
    DecimalDigits,
    DecimalSeparator,
    ThousandsSeparator
  } = props;

  const setPrefix = () => {
    if (SymbolOnLeft) {
      if (SpaceBetweenAmountAndSymbol) {
        return symbol + " ";
      } else {
        return symbol;
      }
    } else {
      return "";
    }
  };

  const setSuffix = () => {
    if (!SymbolOnLeft) {
      if (SpaceBetweenAmountAndSymbol) {
        return " " + symbol;
      } else {
        return symbol;
      }
    } else {
      return "";
    }
  };

  const priceFormat = wNumb({
    decimals: DecimalDigits,
    mark: DecimalSeparator,
    thousand: ThousandsSeparator,
    prefix: setPrefix(),
    suffix: setSuffix()
  });

  return <div className={classNames("price", className)}>{priceFormat.to(value)}</div>;
};

export default Price;
