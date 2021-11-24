import SVG from "react-inlinesvg";
import PreloaderSvg from "svg/inline/preloader-white.svg";

const AppStart = props => {
  const { startScreen } = props;

  return (
    <div
      className={classNames("app-start position-fixed d-flex justify-content-center align-items-center w-100 vh-100", {
        active: startScreen
      })}
    >
      <div className='app-start--block d-flex flex-column align-items-center'>
        <div className='app-start--preloader position-relative '>
          <SVG className='position-absolute w-100 h-auto' src={PreloaderSvg} />
        </div>
        <div className='app-start--logo mt-4 h5'>Optitrips</div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    startScreen: state.AppSettings.settings.startScreen
  }),
  dispatch => ({})
)(AppStart);
