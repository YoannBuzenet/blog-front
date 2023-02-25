import { Tag } from "./Tag";

export class TagManager {
  static fromJSONToDomain(tagRaw: Record<string, any>): Tag {
    // console.log("postParsed received", postParsed);
    const tag = Tag.builder()
      .id(tagRaw.id)
      .name(tagRaw.name)
      .language(tagRaw.language)
      .color_hexcode(tagRaw.color_hexcode)
      .createdAt(tagRaw.createdAt)
      .updatedAt(tagRaw.updatedAt)
      .build();

    return tag;
  }
}
