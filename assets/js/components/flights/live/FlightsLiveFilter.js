import { useState, useEffect } from "react";

import Filters from "js/components/filter";
import FilterItem from "js/components/filter/FilterItem";
import Radiobutton from "js/components/foundation/Radiobutton";
import Checkbox from "js/components/foundation/Checkbox";
import TimeRange from "js/components/filter/TimeRange";
import DurationRange from "js/components/filter/DurationRange";

import Stops from "data/stops.json";

const FlightsLiveFilter = ({
  isActive,
  getFlightsResults,
  filter,
  sort,
  page,
  setStops,
  setIncludeCarriersAdd,
  setIncludeCarriersRemove,
  filterResults,
  session,
  initFilter,
  setOutboundDepartIntervalTime,
  setinboundDepartIntervalTime,
  setDuration
}) => {
  useEffect(() => {
    initFilter(true);
  }, []);

  useEffect(() => {
    if (isActive) {
      filterResults(
        session,
        sort.sortType,
        sort.sortOrder,
        filter.duration,
        filter.includeCarriers,
        filter.excludeCarriers,
        filter.stops,
        filter.outboundDepartTime,
        filter.outboundDepartStartTime,
        filter.outboundDepartEndTime,
        filter.inboundDepartTime,
        filter.inboundDepartStartTime,
        filter.inboundDepartEndTime,
        page.pageIndex,
        page.pageSize
      );
    }
  }, [filter, sort, page]);

  const filterStops = e => {
    if (e.target.checked) {
      setStops(e.target.value);
    } else {
      setStops("");
    }
  };

  const addCarriers = (e, index) => {
    if (filter.includeCarriers.indexOf(e.target.value) != -1) {
      setIncludeCarriersRemove(e.target.value);
    } else {
      setIncludeCarriersAdd(e.target.value);
    }
  };

  const setOutboundTime = (from, to) => {
    setOutboundDepartIntervalTime(from, to);
  };

  const setInboundTime = (from, to) => {
    setinboundDepartIntervalTime(from, to);
  };

  const minMax = (mathFunc, array, property) => {
    return Math[mathFunc].apply(
      array,
      array.map(function (item) {
        return item[property];
      })
    );
  };

  const duration = value => {
    setDuration(value);
  };

  return (
    <Filters>
      <FilterItem title='Stops' open={true}>
        {Stops.map((item, index) => (
          <Radiobutton
            key={index.toString()}
            className='my-1 ml-n2'
            name='stops'
            value={item.value}
            label={item.title}
            iconclassName='md-dark'
            checked={item.value == filter.stops}
            onChange={filterStops}
          />
        ))}
      </FilterItem>
      <FilterItem title='Departure times' open={true}>
        <TimeRange
          className='mt-2 mb-6'
          title='Outbound'
          valueFrom={filter.outboundDepartStartTime}
          valueTo={filter.outboundDepartEndTime}
          change={setOutboundTime}
        />
        <TimeRange
          className='mt-2 mb-6'
          title='Return'
          valueFrom={filter.inboundDepartStartTime}
          valueTo={filter.inboundDepartEndTime}
          change={setInboundTime}
        />
      </FilterItem>
      <FilterItem title='Journey duration' open={true}>
        <DurationRange
          className='mt-2'
          timeMin={minMax("min", getFlightsResults.Legs, "Duration")}
          timeMax={minMax("max", getFlightsResults.Legs, "Duration")}
          change={duration}
        />
      </FilterItem>
      {getFlightsResults.Carriers.length > 0 && (
        <FilterItem title='Carriers' open={true}>
          {[...getFlightsResults.Carriers]
            .sort((a, b) => (a.Name.localeCompare(b.Name) < b.Name.localeCompare(a.Name) ? -1 : 1))
            .map((item, index) => (
              <Checkbox
                key={index.toString()}
                className='my-1 ml-n2'
                name={item.Name}
                value={item.Code}
                label={item.Name}
                iconClass='md-dark'
                onChange={e => {
                  addCarriers(e, index);
                }}
              />
            ))}
        </FilterItem>
      )}
    </Filters>
  );
};

export default connect(
  state => ({
    isActive: state.FlightsLiveFilter.isActive,
    getFlightsResults: state.FlightsLiveResults.data.data,
    filter: state.FlightsLiveFilter.filter,
    sort: state.FlightsLiveFilter.sort,
    page: state.FlightsLiveFilter.page,
    session: state.FlightsLiveResults.sessionKey
  }),
  dispatch => ({
    initFilter: boolean => {
      dispatch({ type: "FILTER_INIT", isActive: boolean });
    },
    setStops: value => {
      dispatch({ type: "FILTER_STOPS", stops: value });
    },
    setIncludeCarriersAdd: value => {
      dispatch({ type: "FILTER_INCLUDE_CARRIERS_ADD", carriers: value });
    },
    setIncludeCarriersRemove: value => {
      dispatch({ type: "FILTER_INCLUDE_CARRIERS_REMOVE", index: value });
    },
    filterResults: (
      session,
      sortType,
      sortOrder,
      duration,
      includeCarriers,
      excludeCarriers,
      stops,
      outboundDepartTime,
      outboundDepartStartTime,
      outboundDepartEndTime,
      inboundDepartTime,
      inboundDepartStartTime,
      inboundDepartEndTime,
      pageIndex,
      pageSize
    ) => {
      dispatch({
        type: "FILTER_RESULTS",
        session: session,
        sortType: sortType,
        sortOrder: sortOrder,
        duration: duration,
        includeCarriers: includeCarriers,
        excludeCarriers: excludeCarriers,
        stops: stops,
        outboundDepartTime: outboundDepartTime,
        outboundDepartStartTime: outboundDepartStartTime,
        outboundDepartEndTime: outboundDepartEndTime,
        inboundDepartTime: inboundDepartTime,
        inboundDepartStartTime: inboundDepartStartTime,
        inboundDepartEndTime: inboundDepartEndTime,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
    },
    setOutboundDepartIntervalTime: (start, end) => {
      dispatch({ type: "FILTER_OUTBOUND_INTERVAL_TIME", start: start, end: end });
    },
    setinboundDepartIntervalTime: (start, end) => {
      dispatch({ type: "FILTER_INBOUND_INTERVAL_TIME", start: start, end: end });
    },
    setDuration: value => {
      dispatch({ type: "FILTER_DURATION", duration: value });
    }
  })
)(FlightsLiveFilter);
