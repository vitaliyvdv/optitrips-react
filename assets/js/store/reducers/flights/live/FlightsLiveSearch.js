import { format, addDays } from "date-fns";

const initialState = {
  direction: {
    isOpen: false,
    current: 0
  },
  originPlace: {
    isInit: false,
    isOpen: false,
    current: "",
    fullName: ""
  },
  destinationPlace: {
    isInit: false,
    isOpen: false,
    current: "",
    fullName: ""
  },
  cabinClass: {
    isOpen: false,
    current: "Economy"
  },
  passengers: {
    isInit: false,
    isOpen: false,
    totalQuantity: 0,
    adults: {
      currentQuantity: 1,
      maxQuantity: 8
    },
    children: {
      currentQuantity: 0,
      maxQuantity: 8
    },
    infants: {
      currentQuantity: 0,
      maxQuantity: 8
    }
  },
  date: {
    outbound: {
      isInit: false,
      isOpen: false,
      date: format(addDays(new Date(), 5), "yyyy-MM-dd")
    },
    inbound: {
      isInit: false,
      isOpen: false,
      date: format(addDays(new Date(), 12), "yyyy-MM-dd")
    }
  },
  carriers: {
    include: "",
    exclude: ""
  },
  groupPricing: false
};

const FlightsLiveSearch = (state = initialState, action) => {
  switch (action.type) {
    case "DIRECTION_STATE":
      return { ...state, direction: { ...state.direction, isOpen: action.state } };

    case "DIRECTION_CURRENT":
      return { ...state, direction: { ...state.direction, current: action.current } };

    case "CABIN_CLASS_STATE":
      return { ...state, cabinClass: { ...state.cabinClass, isOpen: action.state } };

    case "CABIN_CLASS_CURRENT":
      return { ...state, cabinClass: { ...state.cabinClass, current: action.current } };

    case "ORIGIN_PLACE_IS_INIT":
      return { ...state, originPlace: { ...state.originPlace, isInit: action.isInit } };

    case "ORIGIN_PLACE_IS_OPEN":
      return { ...state, originPlace: { ...state.originPlace, isOpen: action.isOpen } };

    case "ORIGIN_PLACE_CURRENT":
      return { ...state, originPlace: { ...state.originPlace, current: action.current } };

    case "ORIGIN_PLACE_FULL_NAME":
      return { ...state, originPlace: { ...state.originPlace, fullName: action.fullName } };

    case "DESTINATION_PLACE_IS_INIT":
      return { ...state, destinationPlace: { ...state.destinationPlace, isInit: action.isInit } };

    case "DESTINATION_PLACE_IS_OPEN":
      return { ...state, destinationPlace: { ...state.destinationPlace, isOpen: action.isOpen } };

    case "DESTINATION_PLACE_CURRENT":
      return { ...state, destinationPlace: { ...state.destinationPlace, current: action.current } };

    case "DESTINATION_PLACE_FULL_NAME":
      return { ...state, destinationPlace: { ...state.destinationPlace, fullName: action.fullName } };

    case "PASSENGERS_IS_INIT":
      return { ...state, passengers: { ...state.passengers, isInit: action.isInit } };

    case "PASSENGERS_IS_OPEN":
      return { ...state, passengers: { ...state.passengers, isOpen: action.isOpen } };

    case "PASSENGERS_TOTAL_QUANTITY":
      return { ...state, passengers: { ...state.passengers, totalQuantity: action.totalQuantity } };

    case "PASSENGERS_ADULTS_QUANTITY":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          adults: { ...state.passengers.adults, currentQuantity: action.currentQuantity }
        }
      };

    case "PASSENGERS_CHILDREN_QUANTITY":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          children: { ...state.passengers.children, currentQuantity: action.currentQuantity }
        }
      };

    case "PASSENGERS_INFANTS_QUANTITY":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          infants: { ...state.passengers.infants, currentQuantity: action.currentQuantity }
        }
      };

    case "OUTBOUND_DATE_IS_INIT":
      return { ...state, date: { ...state.date, outbound: { ...state.date.outbound, isInit: action.isInit } } };

    case "OUTBOUND_DATE_IS_OPEN":
      return { ...state, date: { ...state.date, outbound: { ...state.date.outbound, isOpen: action.isOpen } } };

    case "OUTBOUND_DATE":
      return {
        ...state,
        date: { ...state.date, outbound: { ...state.date.outbound, date: action.date } }
      };

    case "INBOUND_DATE_IS_INIT":
      return { ...state, date: { ...state.date, inbound: { ...state.date.inbound, isInit: action.isInit } } };

    case "INBOUND_DATE_IS_OPEN":
      return { ...state, date: { ...state.date, inbound: { ...state.date.inbound, isOpen: action.isOpen } } };

    case "INBOUND_DATE":
      return {
        ...state,
        date: { ...state.date, inbound: { ...state.date.inbound, date: action.date } }
      };

    default:
      return state;
  }
};

export default FlightsLiveSearch;
