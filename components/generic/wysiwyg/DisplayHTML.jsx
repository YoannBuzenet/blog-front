import { serialize } from "../../../services/react-slate";

const DisplayHTML = ({ slateText }) => {
  function createMarkup() {
    return {
      __html: serialize({
        children: slateText,
      }),
    };
  }

  const content = createMarkup();

  return <div className="wysiwygDisplay" dangerouslySetInnerHTML={content} />;
};

export default DisplayHTML;
