import SVG from "react-inlinesvg";
import PreloaderSvg from "svg/inline/preloader-white.svg";

const AppPreloader = props => {
  const { preloader } = props;

  return (
    <div
      className={classNames(
        "app-preloader position-fixed h-100 w-100 d-flex justify-content-center align-items-center",
        { active: preloader }
      )}
    >
      <div className='app-preloader--container position-relative'>
        <SVG className='position-absolute w-100 h-auto' src={PreloaderSvg} />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    preloader: state.AppSettings.settings.preloader
  }),
  dispatch => ({})
)(AppPreloader);
