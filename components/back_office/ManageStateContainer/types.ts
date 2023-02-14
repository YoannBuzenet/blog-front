import { NewSibling } from "../SiblingSelector/SiblingSelector";

export type ReactSlateElement = {
    type : "paragraph" | "block-quote";
    align : string;
    children : ReactSlateElement[]
}

export type PageState = {
    Sibling : (PageState & NewSibling)[]; 
    UserId : number;
    content : ReactSlateElement[]
    createdAt : string;
    updatedAt : string;
    id: number;
    isOutOfPostFeed : boolean;
    isPublished : boolean;
    isScoop : boolean;
    language : "en-US" | "fr-FR";
    mainImageUrl : ReactSlateElement;
    metaDescription : ReactSlateElement;
    shortDescription : ReactSlateElement;
    title : ReactSlateElement;
    PostSiblings?: {
        PostId : number;
        SiblingId : number;
        createdAt : string;
        updatedAt : string;
    }
}