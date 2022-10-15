import { slateContentObject } from "../post/Post";
import { simpleUser } from "../types/types";

//TODO : ajouter l'objet utilisateur dans answer

export class Answer {
  private readonly _id: number;
  private readonly _content: slateContentObject[];
  private readonly _userId: number;
  private readonly _user: simpleUser;
  private readonly _postId: number;
  private readonly _parentAnswerId: number;
  private _hasBeenSorted: boolean;
  private _childrenAnswers: Answer[];
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(builder: AnswerBuilder) {
    this._id = builder.id();
    this._content = builder.content();
    this._userId = builder.userId();
    this._user = builder.user();
    this._postId = builder.postId();
    this._parentAnswerId = builder.parentAnswerId();
    this._hasBeenSorted = builder.hasBeenSorted();
    this._childrenAnswers = builder.childrenAnswers();
    this._createdAt = builder.createdAt();
    this._updatedAt = builder.updatedAt();
  }

  get id() {
    return this._id;
  }
  get content() {
    return this._content;
  }
  get userId() {
    return this._userId;
  }
  get user() {
    return this._user;
  }
  get postId() {
    return this._postId;
  }
  get parentAnswerId() {
    return this._parentAnswerId;
  }
  get hasBeenSorted() {
    return this._hasBeenSorted;
  }
  set hasBeenSorted(hasBeenSorted: boolean) {
    this._hasBeenSorted = hasBeenSorted;
  }
  get childrenAnswers() {
    return this._childrenAnswers;
  }
  set childrenAnswers(childrenAnswers: Answer[]) {
    this._childrenAnswers = childrenAnswers;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static builder(): AnswerBuilder {
    return new AnswerBuilder();
  }
}

class AnswerBuilder {
  private _id: number;
  private _content: slateContentObject[];
  private _userId: number;
  private _user: simpleUser;
  private _postId: number;
  private _parentAnswerId: number;
  private _hasBeenSorted: boolean;
  private _childrenAnswers: Answer[] = [];
  private _createdAt: string;
  private _updatedAt: string;

  id(): number;
  id(id: number): this;
  id(id?: number) {
    if (!id) return this._id;
    this._id = id;
    return this;
  }

  content(): slateContentObject[];
  content(content: slateContentObject[]): this;
  content(content?: slateContentObject[]) {
    if (!content) return this._content;
    this._content = content;
    return this;
  }

  userId(): number;
  userId(userId: number): this;
  userId(userId?: number) {
    if (!userId) return this._userId;
    this._userId = userId;
    return this;
  }

  user(): simpleUser;
  user(user: simpleUser): this;
  user(user?: simpleUser) {
    if (!user) return this._user;
    this._user = user;
    return this;
  }

  postId(): number;
  postId(postId: number): this;
  postId(postId?: number) {
    if (!postId) return this._postId;
    this._postId = postId;
    return this;
  }

  parentAnswerId(): number;
  parentAnswerId(parentAnswerId: number): this;
  parentAnswerId(parentAnswerId?: number) {
    if (parentAnswerId === undefined) return this._parentAnswerId;
    this._parentAnswerId = parentAnswerId;
    return this;
  }

  hasBeenSorted(): boolean;
  hasBeenSorted(hasBeenSorted: boolean): this;
  hasBeenSorted(hasBeenSorted?: boolean) {
    if (!hasBeenSorted) return this._hasBeenSorted;
    this._hasBeenSorted = hasBeenSorted;
    return this;
  }

  childrenAnswers(): Answer[];
  childrenAnswers(childrenAnswers: Answer[]): this;
  childrenAnswers(childrenAnswers?: Answer[]) {
    if (!childrenAnswers) return this._childrenAnswers;
    this._childrenAnswers = childrenAnswers;
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

  build(): Answer {
    return new Answer(this);
  }
}
