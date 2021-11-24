import { minBy, get, size } from "lodash";

import Button from "js/components/foundation/Button";
import Price from "js/components/foundation/Price";

const ResultsDeals = ({ item, Currencies }) => {
  let price = get(minBy(item.PricingOptions, "Price"), "Price");
  let amount = size(item.PricingOptions);

  return (
    <div className='itinerary-deals d-flex flex-column align-items-center p-4'>
      {amount > 1 && (
        <dl className='itinerary-deals--amount d-flex mb-1'>
          <dt className='m-0'>Deals:</dt>
          <dd className='m-0 ml-1'>{amount}</dd>
        </dl>
      )}
      <div className='itinerary-deals--price d-flex align-items-center mb-4'>
        {amount > 1 && <div className='text-lowercase'>From</div>}
        <Price
          className={classNames({ "ml-1": amount > 1 })}
          value={price}
          symbol={Currencies.Symbol}
          SymbolOnLeft={Currencies.SymbolOnLeft}
          SpaceBetweenAmountAndSymbol={Currencies.SpaceBetweenAmountAndSymbol}
          DecimalDigits={Currencies.DecimalDigits}
          DecimalSeparator={Currencies.DecimalSeparator}
          ThousandsSeparator={Currencies.ThousandsSeparator}
        />
      </div>
      <Button uppercase raised type='button' value='Select' onClick={() => {}} />
    </div>
  );
};

export default ResultsDeals;
