import { AppUsedLanguage } from "../../../types/types";
import { NewSibling } from "../SiblingSelector/SiblingSelector";

export type ReactSlateElement = {
  type: "paragraph" | "block-quote";
  align: string;
  text?: string;
  children?: ReactSlateElement[];
};

export type PageState = {
  id: number;
  Sibling: (PageState | NewSibling)[];
  UserId: number;
  content: ReactSlateElement[];
  createdAt: string;
  updatedAt: string;
  isOutOfPostFeed: boolean;
  isPublished: boolean;
  isScoop: boolean;
  language: AppUsedLanguage;
  mainImageUrl: ReactSlateElement[];
  metaDescription: ReactSlateElement[];
  shortDescription: ReactSlateElement[];
  title: ReactSlateElement[];
  PostSiblings?: [
    {
      PostId: number;
      SiblingId: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
};
