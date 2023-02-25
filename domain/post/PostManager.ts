import { TagManager } from "../tag/TagManager";
import { Post } from "./Post";

export class PostManager {
  static fromJSONToDomain(postParsed: Record<string, any>): Post {
    // console.log("postParsed received", postParsed);
    const post = Post.builder()
      .id(postParsed.id)
      .title(postParsed.title)
      .url(postParsed.url)
      .metaDescription(postParsed.metaDescription)
      .shortDescription(postParsed.shortDescription)
      .mainImageUrl(postParsed.mainImageUrl)
      .language(postParsed.language)
      .content(postParsed.content)
      .isScoop(postParsed.isScoop)
      .createdAt(postParsed.createdAt)
      .userId(postParsed.UserId)
      .sibling(postParsed.Sibling)
      .tags(postParsed.Tags.map((tag) => TagManager.fromJSONToDomain(tag)))
      .updatedAt(postParsed.updatedAt)
      .build();

    return post;
  }
}
