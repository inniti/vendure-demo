import {
  DeepPartial,
  HasCustomFields,
  LocaleString,
  Translatable,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, OneToMany } from "typeorm";

import { PageTranslation } from "./page-translation.entity";

export class PageCustomFields {}

@Entity()
export class Page
  extends VendureEntity
  implements Translatable, HasCustomFields
{
  constructor(input?: DeepPartial<Page>) {
    super(input);
  }

  @Column((type) => PageCustomFields)
  customFields: PageCustomFields;

  @Column("datetime", { nullable: true })
  publishFrom: Date | null;

  title: LocaleString;

  slug: LocaleString;

  @OneToMany((type) => PageTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Page>>;
}
