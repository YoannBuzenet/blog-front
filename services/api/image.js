import axios from "axios";
import { JSONParseAllProps } from "../utils";

export const getAllImages = async (sort = "createdAt") => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/images?sort=${sort}`
  );

  const parsedResp = JSONParseAllProps(resp.data);

  return parsedResp;
};

const addCompletePathToImages = (arrayOfImages) => {
  return arrayOfImages.map((image) => {
    // If the image is hosted on an external website, we keep the current url. Otherwise, we add the api url.
    const pathUpdated = image.path.includes("https")
      ? image.path
      : process.env.NEXT_PUBLIC_API_URL + "/" + image.path;

    return {
      ...image,
      src: pathUpdated,
    };
  });
};

const fetchAllImagesWithPathUpdated = async () => {
  const images = await getAllImages();
  const imagesPathUpdated = addCompletePathToImages(images);
  return imagesPathUpdated;
};

module.exports = {
  getAllImages,
  fetchAllImagesWithPathUpdated,
};
