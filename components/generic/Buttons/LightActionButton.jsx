import style from "../../../styles/generic/Button/LightActionButton.module.css";

const LightActionButton = ({
  handleClick,
  name,
  Svg,
  classToAdd = "classic",
}) => {
  return (
    <button className={`${style[classToAdd]} ${style.generic}`}>
      <p>{name}</p>
      <Svg />
    </button>
  );
};

export default LightActionButton;
