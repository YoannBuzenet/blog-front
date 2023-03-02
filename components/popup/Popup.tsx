type PopupProps = {
  index: number;
};

const Popup = ({ index }: PopupProps) => {
  const idPopUp = `popup-${index}`;

  return (
    <div className={`${idPopUp}`}>
      <style jsx>{`
        .${idPopUp} {
          background-color: red;
        }
      `}</style>
      Je suis un pop up
    </div>
  );
};

export default Popup;
