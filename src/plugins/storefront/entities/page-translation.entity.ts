import { LanguageCode } from "@vendure/common/lib/generated-types";
import { DeepPartial } from "@vendure/common/lib/shared-types";
import { HasCustomFields, Translation, VendureEntity } from "@vendure/core";
import { Column, Entity, Index, ManyToOne } from "typeorm";

import { Page } from "./page.entity";

export class PageCustomFieldsTranslation {}

@Entity()
export class PageTranslation
  extends VendureEntity
  implements Translation<Page>, HasCustomFields
{
  constructor(input?: DeepPartial<Translation<PageTranslation>>) {
    super(input);
  }

  @Column("varchar")
  languageCode: LanguageCode;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column("simple-json")
  content: Record<string, any>; // TODO narrow types for editorjs

  @Index()
  @ManyToOne((type) => Page, (base) => base.translations, {
    onDelete: "CASCADE",
  })
  base: Page;

  @Column((type) => PageCustomFieldsTranslation)
  customFields: PageCustomFieldsTranslation;
}
