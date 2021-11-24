import Menu from "data/menu.json";

const MenuLink = props => {
  const { to, title } = props;

  const icon = value => {
    switch (value) {
      case "/":
        return "flight";
        break;
      case "/carhire":
        return "directions_car";
        break;
    }
  };

  return (
    <NavLink
      className='menu-item--link d-flex align-items-center px-2 px-md-0'
      exact
      strict
      to={to}
      activeClassName='active'
    >
      <i className='material-icons md-dark d-md-none mr-6 flex-shrink-0'>{icon(to)}</i>
      <div className='menu-item--title'>{title}</div>
    </NavLink>
  );
};

const AppMenu = props => {
  const { breakpoint, stateMobileMenu } = props;

  const goToPage = link => {
    if (breakpoint.sm || breakpoint.xs) {
      stateMobileMenu(false);
    }
  };

  return (
    <ul className='menu list-unstyled d-flex flex-wrap align-items-center py-2 py-md-0 my-0'>
      {Menu.map((item, index) => (
        <li className='menu-item mx-2 ml-md-0 mr-md-7' key={index.toString()} onClick={goToPage}>
          <MenuLink key={index.toString()} to={item.link} title={item.title} />
        </li>
      ))}
    </ul>
  );
};

export default connect(
  state => ({
    breakpoint: state.Breakpoints.current
  }),
  dispatch => ({
    stateMobileMenu: boolean => {
      dispatch({ type: "MOBILE_MENU_STATE", mobileMenu: boolean });
    }
  })
)(AppMenu);
