import {
  EntityRepository,
  Repository,
  getCustomRepository,
  Transaction,
  TransactionRepository,
  BeforeUpdate,
} from "typeorm";

import { IMetadata, IAuditableDocument, IDocument } from "./types";

export const decoreateMetadataForNewDocument = <T extends IAuditableDocument>(
  document: T,
) => {
  const _metadata: IMetadata = {
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "SYSTEM",
    updatedBy: "SYSTEM",
  };

  document.metadata = {
    ..._metadata,
    ...document.metadata,
  };
  return document;
};

abstract class AudtiableDocumentRepository<
  T extends IDocument
> extends Repository<T> {
  @BeforeUpdate()
  updateDates() {
    console.log(this);
  }
}

export {
  EntityRepository as Repository,
  Repository as DocumentRepository,
  getCustomRepository as GetRepository,
  AudtiableDocumentRepository,
  Transaction,
  TransactionRepository,
};
