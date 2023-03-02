const YoutubeEmbed = ({ url }) => {
  // Split real url or just end charac

  return (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${url}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default YoutubeEmbed;
