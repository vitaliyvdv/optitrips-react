const initialState = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  current: {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
  }
};

function setBreakpoints(state) {
  const breakpoints = state.breakpoints;
  switch (true) {
    case window.matchMedia("(min-width:" + Math.round(breakpoints.xl) + "px)").matches:
      return {
        ...state,
        current: {
          ...state.current,
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: true
        }
      };
      break;
    case window.matchMedia("(max-width:" + Math.round(breakpoints.xl) + "px) and (min-width:" + breakpoints.lg + "px)")
      .matches:
      return {
        ...state,
        current: {
          ...state.current,
          xs: false,
          sm: false,
          md: false,
          lg: true,
          xl: false
        }
      };
      break;
    case window.matchMedia("(max-width:" + Math.round(breakpoints.lg) + "px) and (min-width:" + breakpoints.md + "px)")
      .matches:
      return {
        ...state,
        current: {
          ...state.current,
          xs: false,
          sm: false,
          md: true,
          lg: false,
          xl: false
        }
      };
      break;
    case window.matchMedia("(max-width:" + Math.round(breakpoints.md) + "px) and (min-width:" + breakpoints.sm + "px)")
      .matches:
      return {
        ...state,
        current: {
          ...state.current,
          xs: false,
          sm: true,
          md: false,
          lg: false,
          xl: false
        }
      };
      break;
    case window.matchMedia("(max-width:" + Math.round(breakpoints.sm) + "px) and (min-width:" + breakpoints.xs + "px)")
      .matches:
      return {
        ...state,
        current: {
          ...state.current,
          xs: true,
          sm: false,
          md: false,
          lg: false,
          xl: false
        }
      };
      break;
  }
}

const Breakpoints = (state = initialState, action) => {
  switch (action.type) {
    case "BREAKPOINTS":
      return setBreakpoints(state);
    default:
      return state;
  }
};

export default Breakpoints;
