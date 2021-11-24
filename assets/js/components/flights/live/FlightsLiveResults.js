import FlightsLiveFilter from "js/components/flights/live/FlightsLiveFilter";
import AppPagination from "js/components/app/AppPagination";
import ResultsItinerary from "js/components/flights/live/results/ResultsItinerary";
import FlightsLiveSort from "js/components/flights/live/FlightsLiveSort";

const FlightsLiveResults = ({ getFlightsResults, Currencies, setPagination, pageSize }) => {
  const pagination = () => {
    let count = pageSize + 10;
    setPagination(count);
  };

  return (
    <div className='container-fluid py-6'>
      <div className='flights-results row'>
        <aside className='flights-results--filter col-3'>
          <FlightsLiveFilter />
        </aside>
        <div className='flights-results--container col-9'>
          {getFlightsResults.Itineraries.length > 0 && <FlightsLiveSort />}
          <div className='flights-results--list'>
            {getFlightsResults.Itineraries.length > 0 ? (
              <Fragment>
                {getFlightsResults.Itineraries.map((item, index) => (
                  <ResultsItinerary
                    key={index.toString()}
                    data={getFlightsResults}
                    item={item}
                    Currencies={Currencies}
                  />
                ))}
              </Fragment>
            ) : (
              <div>No results, sorry</div>
            )}
          </div>
          {getFlightsResults.Itineraries.length >= pageSize && (
            <AppPagination className='justify-content-center mt-5' value='Show more' onClick={pagination} />
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    getFlightsResults: state.FlightsLiveResults.data.data,
    Currencies: state.FlightsLiveResults.data.data.Currencies[0],
    pageSize: state.FlightsLiveFilter.page.pageSize
  }),
  dispatch => ({
    setPagination: value => {
      dispatch({ type: "PAGE_SIZE", pageSize: value });
    }
  })
)(FlightsLiveResults);
