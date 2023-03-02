import { parseYoutubeUrl } from "./YoutubeEmbed.func";

const YoutubeEmbed = ({ url }) => {
  return (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${parseYoutubeUrl(url)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default YoutubeEmbed;
