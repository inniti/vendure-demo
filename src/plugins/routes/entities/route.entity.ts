import {
  Channel,
  ChannelAware,
  DeepPartial,
  VendureEntity,
  type ID,
} from "@vendure/core";
import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Route extends VendureEntity implements ChannelAware {
  constructor(input?: DeepPartial<Route>) {
    super(input);
  }

  @Column()
  @Index()
  path: string;

  @Column()
  entity: string;

  @Column()
  entityId: number;

  @ManyToMany(() => Channel)
  @JoinTable()
  channels: Channel[];
}
