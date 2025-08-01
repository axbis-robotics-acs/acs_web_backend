import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'acs_menu_role_rel_hist' })
export class MenuRoleRelHist {
  @PrimaryColumn({ nullable: false })
  hist_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  menu_cd: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role_cd: string;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 })
  usable_fl: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  site_cd: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description_tx: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  prev_activity_tx: string;

  @Column({ type: 'varchar', length: 20, nullable: false, default: '' })
  activity_tx: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  creator_by: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  modifier_by: string;

  @UpdateDateColumn()
  modify_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trans_tx: string;

  @Column({ type: 'datetime', nullable: true })
  last_event_at: Date;
}
