import axios from "axios";
import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllImages = async (
  sortBy = "createdAt",
  limit,
  tags,
  language
) => {
  let query = `?sortBy=${sortBy}`;
  if (limit) {
    query += `&limit=${limit}`;
  }
  if (tags) {
    query += `&tags=${tags}`;
  }
  if (language) {
    query += `&language=${language}`;
  }

  const resp = await axios.fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/images${query}`, getFetchConfig()
  );

  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


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

export const fetchAllImagesWithPathUpdated = async () => {
  const images = await getAllImages();
  const imagesPathUpdated = addCompletePathToImages(images);
  return imagesPathUpdated;
};

