import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RightsEntity } from 'src/database/rights.entity';
import { IResource } from '@ap/shared/dist/types';
import { EmptyStringToNull } from 'src/database/database.utils';

@Entity('resources')
export class ResourceEntity implements IResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  path: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
    transformer: EmptyStringToNull,
  })
  description?: string | null;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @Column({ type: 'boolean', default: false })
  default: boolean;

  @OneToMany(() => RightsEntity, (right) => right.resource)
  rights?: RightsEntity[];
}
