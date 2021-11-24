import Button from "js/components/foundation/Button";

const Dialog = forwardRef((props, ref) => {
  const {
    className,
    dialogClass,
    header,
    title,
    dialogInput,
    dialogAction,
    children,
    closeDialog,
    fullscreen,
    active
  } = props;

  const stateDialog = event => {
    closeDialog(event);
  };

  return (
    <Fragment>
      {!fullscreen ? (
        <section
          className={classNames("dialog position-fixed w-100 h-100", className, { active: active })}
          onClick={stateDialog}
        >
          <div className='container-fluid h-100'>
            <div className='dialog-container h-100 row align-items-center justify-content-center mx-0 p-0 py-sm-4 py-md-5'>
              <div
                className={classNames("dialog-block d-flex flex-column px-0 overflow-hidden w-100 mh-100", dialogClass)}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {header === undefined && header !== "true" && (
                  <div className='dialog-block--header d-flex align-items-center justify-content-between flex-grow-0 flex-shrink-0 py-2 px-4 pl-md-5'>
                    <h2 className='h6 text-truncate mb-0'>{title}</h2>
                    <Button
                      size='sm'
                      color='transparent'
                      icon='close'
                      className='flex-shrink-0 my-0 mr-n2 d-sm-none'
                      onClick={closeDialog}
                    />
                  </div>
                )}
                {dialogInput}
                <div className='dialog-block--body position-relative flex-grow-1 flex-shrink-1 px-4 px-md-5' ref={ref}>
                  {children}
                </div>
                <footer className='dialog-block--footer d-flex align-items-center justify-content-end flex-grow-0 flex-shrink-0 py-2 pl-5 pr-2'>
                  <Button link uppercase value='Cancel' onClick={closeDialog} />
                  {dialogAction}
                </footer>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={classNames("dialog-fullscreen position-fixed w-100 h-100", className, { active: active })}>
          <div className='d-flex flex-column h-100'>
            <div className='dialog-fullscreen--header flex-grow-0 flex-shrink-0'>
              <div className='container-fluid h-100'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Button
                      size='sm'
                      color='transparent'
                      icon='close'
                      className='flex-shrink-0 my-0 ml-n2 mr-5'
                      onClick={closeDialog}
                    />
                    <h2 className='h6 text-truncate mb-0'>{title}</h2>
                  </div>
                  <div className='d-flex align-items-center'>
                    <Button link uppercase value='Cancel' onClick={closeDialog} />
                    {dialogAction}
                  </div>
                </div>
              </div>
            </div>
            <div className='dialog-fullscreen--body flex-grow-1 flex-shrink-1' ref={ref}>
              <div className='container-fluid'>{children}</div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
});

export default Dialog;
