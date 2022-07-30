import { useCustomizedStyle } from "../../style/card";

const CardImageObject = ({ image }) => {
  const classes = useCustomizedStyle()();

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
