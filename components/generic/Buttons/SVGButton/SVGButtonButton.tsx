import style from "./SVGButton.module.scss";

type SVGButtonProps = {
  handleClick: () => void;
  name?: String;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  classToAdd?: string;
  svgTitle: String;
};

const SVGButton = ({
  handleClick,
  name,
  Svg,
  classToAdd = "classic",
  svgTitle,
}: SVGButtonProps) => {
  return (
    <button
      className={`${style[classToAdd]} ${style.container}`}
      onClick={handleClick}
    >
      <p>{name}</p>
      <Svg title={svgTitle} />
    </button>
  );
};

export default SVGButton;
