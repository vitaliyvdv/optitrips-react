const Range = forwardRef((props, ref) => {
  const { className, children, title } = props;

  return (
    <div className={classNames("range", className)}>
      <div className='range-top d-flex mb-4'>
        {title && <div>{title}</div>}
        {children}
      </div>
      <div className='range-bottom'>
        <div ref={ref}></div>
      </div>
    </div>
  );
});

export default Range;
