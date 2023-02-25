export class Tag {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _language: string;
  private readonly _color_hexcode: string;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(builder: TagBuilder) {
    this._id = builder.id();
    this._language = builder.language();
    this._color_hexcode = builder.color_hexcode();
    this._name = builder.name();
    this._createdAt = builder.createdAt();
    this._updatedAt = builder.updatedAt();
  }

  get id() {
    return this._id;
  }
  get language() {
    return this._language;
  }
  get name() {
    return this._name;
  }
  get color_hexcode() {
    return this._color_hexcode;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static builder(): TagBuilder {
    return new TagBuilder();
  }
}

class TagBuilder {
  private _id: number;
  private _name: string;
  private _language: string;
  private _color_hexcode: string;
  private _createdAt: string;
  private _updatedAt: string;

  id(): number;
  id(id: number): this;
  id(id?: number) {
    if (!id) return this._id;
    this._id = id;
    return this;
  }

  name(): string;
  name(name: string): this;
  name(name?: string) {
    if (!name) return this._name;
    this._name = name;
    return this;
  }

  color_hexcode(): string;
  color_hexcode(color_hexcode: string): this;
  color_hexcode(color_hexcode?: string) {
    if (!color_hexcode) return this._color_hexcode;
    this._color_hexcode = color_hexcode;
    return this;
  }

  language(): string;
  language(language: string): this;
  language(language?: string) {
    if (!language) return this._language;
    this._language = language;
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

  build(): Tag {
    return new Tag(this);
  }
}
