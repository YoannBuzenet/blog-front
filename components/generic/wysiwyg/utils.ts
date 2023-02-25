import {
  PageState,
  ReactSlateElement,
} from "../../back_office/posts/ManageStateContainer/types";

export const createEmptyField = (): ReactSlateElement[] => {
  return [
    {
      type: "paragraph",
      align: "center",
      children: [{ text: "", type: "paragraph", align: "center" }],
    },
  ];
};

export const createBlankPage = (): PageState => ({
  id: null,
  url: "",
  content: createEmptyField(),
  title: createEmptyField(),
  metaDescription: createEmptyField(),
  shortDescription: createEmptyField(),
  mainImageUrl: createEmptyField(),
  createdAt: null,
  isOutOfPostFeed: null,
  isPublished: null,
  isScoop: null,
  language: "en-US",
  updatedAt: null,
  UserId: null,
  Sibling: [],
});

module.exports = { createEmptyField, createBlankPage };
