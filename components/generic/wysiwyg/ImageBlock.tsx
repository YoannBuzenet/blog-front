const ImageBlock = ({ attributes, element, children }) => {
  return (
    <div className="wysiwyg_ImageContainer">
      <div contentEditable={false} style={{ textAlign: "center" }}>
        {/* eslint-disable */}
        <img {...attributes} src={element.src} width="500px" />
        {/* eslint-enable */}
      </div>
      <div className="captionImage">{children}</div>
    </div>
  );
};

export default ImageBlock;
