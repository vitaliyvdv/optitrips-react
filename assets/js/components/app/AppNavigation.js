import Drawer from "js/components/foundation/Drawer";
import AppMenu from "js/components/app/AppMenu";
import AppSettings from "js/components/app/AppSettings";

const AppNavigation = props => {
  const { breakpoint, mobileMenuIsOpen, stateMobileMenu } = props;

  const closeDrawer = () => {
    stateMobileMenu(false);
  };

  return (
    <div className='navigation flex-grow-0 flex-shrink-0 w-100'>
      {(breakpoint.xl || breakpoint.lg || breakpoint.md) && (
        <div className='navigation-top w-100'>
          <div className='container-fluid h-100'>
            <AppMenu />
          </div>
        </div>
      )}
      {(breakpoint.xs || breakpoint.sm) && (
        <Drawer className={classNames({ active: mobileMenuIsOpen })} title='Menu' close={closeDrawer}>
          <AppMenu />
          <AppSettings />
        </Drawer>
      )}
    </div>
  );
};

export default connect(
  state => ({
    breakpoint: state.Breakpoints.current,
    mobileMenuIsOpen: state.AppSettings.settings.mobileMenuIsOpen
  }),
  dispatch => ({
    stateMobileMenu: boolean => {
      dispatch({ type: "MOBILE_MENU_STATE", mobileMenu: boolean });
    }
  })
)(AppNavigation);
