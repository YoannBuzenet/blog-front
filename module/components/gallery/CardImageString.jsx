import { useCustomizedStyle } from "../../style/card.js";
import crypto from "crypto";
import { useEffect } from "react";

const CardImageString = ({ image, idCard, setIdCard }) => {
  const classes = useCustomizedStyle()();

  // Creating id from image URL to keep track of it
  useEffect(() => {
    if (!idCard) {
      const hashedName = crypto.createHash("md5").update(image).digest("hex");
      setIdCard(hashedName);
    }
  }, []);

  console.log("mon id card", idCard);

  return (
    <div>
      <img src={image} alt="Gallery Image" className={classes.image} />
      <p className={`${classes.lightText} ${classes.infoText}`}>{image}</p>
    </div>
  );
};

export default CardImageString;
