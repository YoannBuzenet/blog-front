import { useCustomizedStyle } from "../../style/card";

const CardImageObject = ({ image }) => {
  const classes = useCustomizedStyle()();

  return (
    <div>
      <img src={image.src} alt={image.name} className={classes.image} />
      <p>{image.name}</p>
      {image.credits && <p>{image.credits}</p>}
    </div>
  );
};

export default CardImageObject;
