import CardImageObject from "./CardImageObject";
import CardImageString from "./CardImageString";
import { useCustomizedStyle } from "../../style/card.js";
import { useState } from "react";

const Card = ({ image, selectedImages, setSelectedImages }) => {
  const classes = useCustomizedStyle()();

  const [idCard, setIdCard] = useState(null);

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

  const isSelected = selectedImages.includes(idCard);

  return (
    <div
      onClick={(e) => setSelectedImages(idCard)}
      className={classes.cardContainer}
    >
      <CompoToUse
        image={image}
        idCard={idCard}
        setIdCard={setIdCard}
        isSelected={isSelected}
      />
    </div>
  );
};

export default Card;
