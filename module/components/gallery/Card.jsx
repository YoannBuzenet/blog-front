import CardImageObject from "./CardImageObject";
import CardImageString from "./CardImageString";

const Card = ({ image }) => {
  // We want the gallery to be able to display simple URLS as well as objects
  let CompoToUse;

  if (typeof image === "string") {
    CompoToUse = CardImageString;
  } else if (typeof image === "object") {
    CompoToUse = CardImageObject;
  } else {
    console.error(
      "Image received can not be processed in the gallery card. Please check the format."
    );
  }

  console.log("compoToUse", CompoToUse);

  return (
    <div>
      <CompoToUse image={image} />
    </div>
  );
};

export default Card;
