const FlightsLivePlaces = props => {
  const { places, onClick } = props;

  const selectPlace = e => {
    onClick(e);
  };

  const showIcon = value => {
    let string = value.substring(0, value.indexOf("-"));
    switch (string.length) {
      case 2:
        return "public";
        break;
      case 3:
        return "local_airport";
        break;
      case 4:
        return "location_city";
        break;
    }
  };

  const showTitle = value => {
    let string = value.substring(0, value.indexOf("-"));
    if (string.length == 4) {
      return "";
    } else {
      return " (" + string + ")";
    }
  };

  return (
    <div className='buttons-list mx-n5'>
      {places.list.map((item, index) => (
        <label
          key={index.toString()}
          className='buttons-list--item two-line d-flex align-items-center position-relative mb-0 pl-5 pr-4'
        >
          <input
            type='radio'
            name='places'
            className='position-absolute invisible'
            value={item.PlaceId}
            title={item.PlaceName}
            data-title={item.PlaceName + showTitle(item.PlaceId)}
            onChange={selectPlace}
          />
          <i className='material-icons'>{showIcon(item.PlaceId)}</i>
          <div className='buttons-list--item-label text-truncate'>
            <div className='buttons-list--item-label--primary text-truncate'>
              {item.PlaceName + showTitle(item.PlaceId)}
            </div>
            <div className='buttons-list--item-label--secondary text-truncate'>
              {item.CountryName + " " + item.RegionId}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default connect(
  state => ({
    places: state.FlightsLivePlaces.places
  }),
  dispatch => ({})
)(FlightsLivePlaces);
