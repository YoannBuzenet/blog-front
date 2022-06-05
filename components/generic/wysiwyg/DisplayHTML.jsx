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
  console.log("test", content);

  return <div className="wysiwygDisplay" dangerouslySetInnerHTML={content} />;
};

export default DisplayHTML;
