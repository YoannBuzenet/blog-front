import { useCustomizedStyle } from "../../style/card.js";

const CardImageString = ({ image }) => {
  const classes = useCustomizedStyle()();

  return (
    <div>
      <img src={image} alt="Galler Image" className={classes.image} />
      <p className={classes.lightText}>{image}</p>
    </div>
  );
};

export default CardImageString;
