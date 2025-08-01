import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_menu_master' })
export class Menu {
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false })
  menu_cd: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  menu_nm: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  menu_url: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  parent_id: string;

  @Column({ nullable: true, default: 1 })
  menu_seq: number;

  @Column({ nullable: true, default: 0 })
  menu_depth: number;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 })
  usable_fl: number;

  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false })
  site_cd: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description_tx: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  prev_activity_tx: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  activity_tx: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  creator_by: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modifier_by: string;

  @UpdateDateColumn()
  modify_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trans_tx: string;

  @Column({ type: 'datetime', nullable: true })
  last_event_at: Date;
}
