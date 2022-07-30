import { useEffect } from "react";
import { useCustomizedStyle } from "../../style/card";
import crypto from "crypto";

const CardImageObject = ({ image, idCard, setIdCard }) => {
  const classes = useCustomizedStyle()();

  // Creating id from image URL to keep track of it
  useEffect(() => {
    if (!idCard) {
      const hashedName = crypto
        .createHash("md5")
        .update(image.name)
        .digest("hex");
      setIdCard(hashedName);
    }
  }, []);

  return (
    <div>
      <img src={image.src} alt={image.name} className={classes.image} />
      <div className={classes.infoContainer}>
        <p>{image.name}</p>
        {image.credits && (
          <p className={classes.lightText}>
            <span>&nbsp;| </span>
            {image.credits}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardImageObject;
