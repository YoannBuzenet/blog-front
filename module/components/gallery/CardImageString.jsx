import { useCustomizedStyle } from "../../style/card.js";

const CardImageString = ({ image }) => {
  const classes = useCustomizedStyle()();

  return <img src={image} alt="Galler Image" className={classes.image} />;
};

export default CardImageString;
