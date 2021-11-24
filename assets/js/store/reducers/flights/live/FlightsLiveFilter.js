const initialState = {
  isActive: false,
  sort: {
    sortType: "", // carrier, duration, outboundarrivetime, outbounddeparttime, inboundarrivetime, inbounddeparttime, price
    sortOrder: "" // 'asc' or 'desc'
  },
  filter: {
    duration: "", // Filter for maximum duration in minutes. Integer between 0 and 1800
    includeCarriers: [],
    excludeCarriers: [],
    stops: "",
    outboundDepartTime: "", // acceptable values are M, A, E,
    outboundDepartStartTime: "", // hh:mm
    outboundDepartEndTime: "", // hh:mm
    inboundDepartTime: "", // acceptable values are M, A, E,
    inboundDepartStartTime: "", // hh:mm
    inboundDepartEndTime: "" // hh:mm
  },
  page: {
    pageIndex: 0,
    pageSize: 10
  }
};

const FlightsLiveFilter = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_INIT":
      return { ...state, isActive: action.isActive };
    case "FILTER_STOPS":
      return { ...state, filter: { ...state.filter, stops: action.stops } };
    case "FILTER_INCLUDE_CARRIERS_ADD":
      return {
        ...state,
        filter: {
          ...state.filter,
          includeCarriers: [...state.filter.includeCarriers, action.carriers]
        }
      };
    case "FILTER_INCLUDE_CARRIERS_REMOVE":
      return {
        ...state,
        filter: {
          ...state.filter,
          includeCarriers: [...state.filter.includeCarriers.filter(item => item !== action.index)]
        }
      };
    case "FILTER_OUTBOUND_INTERVAL_TIME":
      return {
        ...state,
        filter: {
          ...state.filter,
          outboundDepartStartTime: action.start,
          outboundDepartEndTime: action.end
        }
      };
    case "FILTER_INBOUND_INTERVAL_TIME":
      return {
        ...state,
        filter: {
          ...state.filter,
          inboundDepartStartTime: action.start,
          inboundDepartEndTime: action.end
        }
      };
    case "FILTER_DURATION":
      return {
        ...state,
        filter: {
          ...state.filter,
          duration: action.duration
        }
      };
    case "SORT_TYPE":
      return {
        ...state,
        sort: {
          ...state.sort,
          sortType: action.sortType
        }
      };
    case "SORT_ORDER":
      return {
        ...state,
        sort: {
          ...state.sort,
          sortOrder: action.sortOrder
        }
      };
    case "PAGE_SIZE":
      return {
        ...state,
        page: {
          ...state.page,
          pageSize: action.pageSize
        }
      };
    default:
      return state;
  }
};

export default FlightsLiveFilter;
