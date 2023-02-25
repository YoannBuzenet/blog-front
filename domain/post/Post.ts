import { Tag } from "../tag/Tag";

export type slateContentObject = {
  type?: string;
  align?: string;
  children?: slateContentObject[];
};

export class Post {
  private readonly _id: number;
  private readonly _title: slateContentObject[];
  private readonly _url: string;
  private readonly _shortDescription: slateContentObject[];
  private readonly _metaDescription: slateContentObject[];
  private readonly _mainImageUrl: string;
  private readonly _language: string;
  private readonly _content: slateContentObject[];
  private readonly _userId: number;
  private readonly _sibling: Post[];
  private readonly _tags: Tag[];
  private readonly _isScoop: boolean;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(builder: PostBuilder) {
    this._id = builder.id();
    this._title = builder.title();
    this._url = builder.url();
    this._shortDescription = builder.shortDescription();
    this._metaDescription = builder.metaDescription();
    this._mainImageUrl = builder.mainImageUrl();
    this._language = builder.language();
    this._content = builder.content();
    this._sibling = builder.sibling();
    this._tags = builder.tags();
    this._userId = builder.userId();
    this._createdAt = builder.createdAt();
    this._updatedAt = builder.updatedAt();
  }

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
  get metaDescription() {
    return this._metaDescription;
  }
  get mainImageUrl() {
    return this._mainImageUrl;
  }
  get language() {
    return this._language;
  }
  get shortDescription() {
    return this._shortDescription;
  }
  get content() {
    return this._content;
  }
  get userId() {
    return this._userId;
  }
  get isScoop() {
    return this._isScoop;
  }
  get sibling() {
    return this._sibling;
  }
  get tags() {
    return this._tags;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static builder(): PostBuilder {
    return new PostBuilder();
  }
}

class PostBuilder {
  private _id: number;
  private _title: slateContentObject[];
  private _url: string;
  private _shortDescription: slateContentObject[];
  private _metaDescription: slateContentObject[];
  private _content: slateContentObject[];
  private _mainImageUrl: string;
  private _language: string;
  private _userId: number;
  private _isScoop: boolean;
  private _sibling: Post[];
  private _tags: Tag[];
  private _createdAt: string;
  private _updatedAt: string;

  id(): number;
  id(id: number): this;
  id(id?: number) {
    if (!id) return this._id;
    this._id = id;
    return this;
  }

  title(): slateContentObject[];
  title(title: slateContentObject[]): this;
  title(title?: slateContentObject[]) {
    if (!title) return this._title;
    this._title = title;
    return this;
  }

  url(): string;
  url(url: string): this;
  url(url?: string) {
    if (!url) return this._url;
    this._url = url;
    return this;
  }

  shortDescription(): slateContentObject[];
  shortDescription(shortDescription: slateContentObject[]): this;
  shortDescription(shortDescription?: slateContentObject[]) {
    if (!shortDescription) return this._shortDescription;
    this._shortDescription = shortDescription;
    return this;
  }

  metaDescription(): slateContentObject[];
  metaDescription(metaDescription: slateContentObject[]): this;
  metaDescription(metaDescription?: slateContentObject[]) {
    if (!metaDescription) return this._metaDescription;
    this._metaDescription = metaDescription;
    return this;
  }

  content(): slateContentObject[];
  content(content: slateContentObject[]): this;
  content(content?: slateContentObject[]) {
    if (!content) return this._content;
    this._content = content;
    return this;
  }
  mainImageUrl(): string;
  mainImageUrl(mainImageUrl: string): this;
  mainImageUrl(mainImageUrl?: string) {
    if (!mainImageUrl) return this._mainImageUrl;
    this._mainImageUrl = mainImageUrl;
    return this;
  }
  language(): string;
  language(language: string): this;
  language(language?: string) {
    if (!language) return this._language;
    this._language = language;
    return this;
  }
  sibling(): Post[];
  sibling(sibling: Post[]): this;
  sibling(sibling?: Post[]) {
    if (!sibling) return this._sibling;
    this._sibling = sibling;
    return this;
  }

  tags(): Tag[];
  tags(tags: Tag[]): this;
  tags(tags?: Tag[]) {
    if (!tags) return this._tags;
    this._tags = tags;
    return this;
  }

  userId(): number;
  userId(userId: number): this;
  userId(userId?: number) {
    if (!userId) return this._userId;
    this._userId = userId;
    return this;
  }

  isScoop(): boolean;
  isScoop(isScoop: boolean): this;
  isScoop(isScoop?: boolean) {
    if (!isScoop) return this._isScoop;
    this._isScoop = isScoop;
    return this;
  }

  createdAt(): string;
  createdAt(createdAt: string): this;
  createdAt(createdAt?: string) {
    if (!createdAt) return this._createdAt;
    this._createdAt = createdAt;
    return this;
  }

  updatedAt(): string;
  updatedAt(updatedAt: string): this;
  updatedAt(updatedAt?: string) {
    if (!updatedAt) return this._updatedAt;
    this._updatedAt = updatedAt;
    return this;
  }

  build(): Post {
    return new Post(this);
  }
}
