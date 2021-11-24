import Button from "js/components/foundation/Button";

const AppPagination = ({ className, buttonClassName, value, onClick }) => {
  function pagination() {
    onClick();
  }

  return (
    <div className={classNames("pagination d-flex", className)}>
      <Button
        uppercase
        raised
        className={classNames("pagination-button", buttonClassName)}
        type='button'
        value={value}
        onClick={pagination}
      />
    </div>
  );
};

export default AppPagination;
