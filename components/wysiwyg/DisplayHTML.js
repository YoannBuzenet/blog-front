import { serialize } from "../../../services/react-slate";

const DisplayHTML = ({ slateText }) => {
  function createMarkup() {
    return {
      __html: serialize({
        children: slateText,
      }),
    };
  }

  return (
    <p className="wysiwygDisplay" dangerouslySetInnerHTML={createMarkup()}></p>
  );
};

export default DisplayHTML;
