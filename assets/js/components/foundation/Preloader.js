import SVG from "react-inlinesvg";
import PreloaderSvg from "svg/inline/preloader.svg";

const Preloader = () => {
  return (
    <div className='preloader d-flex justify-content-center'>
      <div className='preloader-icon position-relative flex-shrink-0'>
        <SVG className='position-absolute w-100 h-auto' src={PreloaderSvg} />
      </div>
    </div>
  );
};

export default Preloader;
