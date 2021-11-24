const Duration = props => {
  const { value } = props;

  const timeConvert = value => {
    let num = value;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    let duration = rhours + " h " + rminutes + " min";
    return String(duration);
  };

  return <Fragment>{timeConvert(value)}</Fragment>;
};

export default Duration;
