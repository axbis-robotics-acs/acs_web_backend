import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_site_hist' })
export class SiteHist {
  @PrimaryColumn({ nullable: false })
  hist_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  site_cd: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  site_nm: string;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 })
  usable_fl: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  modify_at: Date;

  @Column({ type: 'datetime', nullable: true })
  last_event_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description_tx: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  prev_activity_tx: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  activity_tx: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  creator_by: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  modifier_by: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trans_tx: string;
}
