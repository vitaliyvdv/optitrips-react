import Button from "js/components/foundation/Button";

const Drawer = props => {
  const { className, title, children, close } = props;

  const closeDrawer = e => {
    close(e);
  };

  return (
    <div className={classNames("drawer position-fixed w-100 h-100 pr-8", className)} onClick={closeDrawer}>
      <div
        className='drawer-block d-flex flex-column h-100'
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className='drawer-header d-flex flex-grow-0 flex-shrink-0 align-items-center justify-content-between px-4'>
          <h2 className='h6 text-truncate mb-0'>{title}</h2>
          <Button
            size='sm'
            color='transparent'
            className='btn-drawer flex-shrink-0 my-0 mr-n2'
            icon='close'
            onClick={closeDrawer}
          />
        </div>
        <div className='drawer-body flex-grow-1 flex-shrink-1'>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
