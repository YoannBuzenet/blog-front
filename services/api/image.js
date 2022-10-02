import axios from "axios";
import { JSONParseAllProps } from "../utils";

export const getAllImages = async (sortBy = "createdAt", limit, tags) => {
  let query = `?sortBy=${sortBy}`;
  if (limit) {
    query += `&limit=${limit}`;
  }
  if (tags) {
    query += `&tags=${tags}`;
  }

  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/images${query}`
  );

  const parsedResp = JSONParseAllProps(resp.data);

  return parsedResp;
};

const addCompletePathToImages = (arrayOfImages) => {
  return arrayOfImages.map((image) => {
    // If the image is hosted on an external website, we keep the current url. Otherwise, we add the api url.
    const pathUpdated = image.path.includes("https")
      ? image.path
      : process.env.NEXT_PUBLIC_API_URL + "/public/images/" + image.name;

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
