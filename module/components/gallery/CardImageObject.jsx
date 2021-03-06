import { useEffect } from "react";
import { useCustomizedStyle } from "../../style/card";
import crypto from "crypto";

const CardImageObject = ({ image, idCard, setIdCard, isSelected }) => {
  const classes = useCustomizedStyle()();

  // Creating id from image URL to keep track of it
  useEffect(() => {
    if (!idCard) {
      const hashedName = crypto
        .createHash("md5")
        .update(image.src)
        .digest("hex");
      setIdCard(hashedName);
    }
  }, []);

  return (
    <div
      className={
        isSelected ? classes.imageContainerSelected : classes.imageContainer
      }
    >
      <img src={image.src} alt={image.name} className={classes.image} />
      <div className={classes.infoContainer}>
        <p>{image.name}</p>
        {image.credits && (
          <p className={`${classes.lightText} ${classes.infoText}`}>
            <span>&nbsp;|&nbsp;</span>
            {image.credits}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardImageObject;
