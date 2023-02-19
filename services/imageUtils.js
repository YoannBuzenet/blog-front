const { parseSlateFormatSimple } = require("./react-slate");

const previewImageUrl = (imageUrl) => {
  const imageUrlCleaned = parseSlateFormatSimple(imageUrl);
  if (imageUrlCleaned && imageUrlCleaned.includes("http")) {
    return imageUrlCleaned;
  } else {
    return `${process.env.NEXT_PUBLIC_API_URL}/${parseSlateFormatSimple(
      imageUrl
    )}`;
  }
};

module.exports = { previewImageUrl };
