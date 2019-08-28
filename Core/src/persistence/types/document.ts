import { Entity as Document, ObjectID, FindConditions } from "typeorm";

import { IMetadata } from "./metadata";

export interface IDocument {
  _id?: ObjectID;
}

export interface IAuditableDocument extends IDocument {
  metadata?: IMetadata;
}

export type DocumentType = typeof Document;

export type FindDocumentCriteria<T extends IDocument> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectID
  | ObjectID[]
  | FindConditions<T>;
