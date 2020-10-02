import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @VersionColumn()
  public version: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @Column()
  public title: string;

  @Column('text')
  public body: string;

}
