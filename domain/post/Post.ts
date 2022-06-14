export type slateContentObject = {
  type?: string;
  align?: string;
  children?: slateContentObject[];
};

export class Post {
  private readonly _id: number;
  private readonly _title: slateContentObject[];
  private readonly _shortDescription: slateContentObject[];
  private readonly _metaDescription: slateContentObject[];
  private readonly _content: slateContentObject[];
  private readonly _userId: number;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(builder: PostBuilder) {
    this._id = builder.id();
  }

  get id() {
    return this._id;
  }

  static builder(): PostBuilder {
    return new PostBuilder();
  }
}

class PostBuilder {
  private _id: string;
  private _name: string;
  private _profession: Profession;
  private _theme: Theme;
  private _modules: Module[];
  private _themeParameters: ThemeParameterWebsite[];
  private _expiresAt: string;

  name(): string;
  name(name: string): this;
  name(name?: string) {
    if (!name) return this._name;
    this._name = name;
    return this;
  }

  id(): string;
  id(id: string): this;
  id(id?: string) {
    if (!id) return this._id;
    this._id = id;
    return this;
  }

  profession(): Profession;
  profession(profession: Profession): this;
  profession(profession?: Profession) {
    if (!profession) return this._profession;
    this._profession = profession;
    return this;
  }

  theme(): Theme;
  theme(theme: Theme): this;
  theme(theme?: Theme) {
    if (!theme) return this._theme;
    this._theme = theme;
    return this;
  }

  modules(): Module[];
  modules(modules: Module[]): this;
  modules(modules?: Module[]) {
    if (!modules) return this._modules;
    this._modules = modules;
    return this;
  }

  themeParameters(): ThemeParameterWebsite[];
  themeParameters(themeParameters: ThemeParameterWebsite[]): this;
  themeParameters(themeParameters?: ThemeParameterWebsite[]) {
    if (!themeParameters) return this._themeParameters;
    this._themeParameters = themeParameters;
    return this;
  }

  expiresAt(): string;
  expiresAt(expiresAt: string): this;
  expiresAt(expiresAt?: string) {
    if (!expiresAt) return this._expiresAt;
    this._expiresAt = expiresAt;
    return this;
  }

  build(): Website {
    return new Website(this);
  }
}
