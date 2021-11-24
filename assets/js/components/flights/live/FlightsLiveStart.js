import FlightsLiveForm from "js/components/flights/live/form/FlightsLiveForm";

const FlightsLiveStart = props => {
  return (
    <Fragment>
      <FlightsLiveForm />
    </Fragment>
  );
};

export default connect(
  state => ({}),
  dispatch => ({})
)(FlightsLiveStart);
