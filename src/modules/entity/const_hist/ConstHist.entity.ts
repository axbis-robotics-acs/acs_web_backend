import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_const_hist' })
export class ConstHist {
  @PrimaryColumn({ nullable: false })
  hist_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  constant_cd: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  constant_tp: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  constant_nm: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  constant_val: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit_tx: string;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 })
  usable_fl: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
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
