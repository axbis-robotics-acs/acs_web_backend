import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_robot_hist' })
export class RobotHist {
  @PrimaryColumn({ nullable: false })
  hist_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  robot_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  robot_tp: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  model_nm: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status_tx: string;

  @Column({ nullable: true, default: 0 })
  battery_no: number;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 })
  usable_fl: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  site_cd: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description_tx: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  prev_activity_tx: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  activity_tx: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  creator_by: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  modifier_by: string;

  @UpdateDateColumn()
  modify_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trans_tx: string;

  @Column({ type: 'datetime', nullable: true })
  last_event_at: Date;
}
