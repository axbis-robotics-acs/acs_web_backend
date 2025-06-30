import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_transfer_control_hist' })
export class TransferControlHist {
  @PrimaryColumn({ nullable: false })
  hist_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transfer_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  transfer_tp: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  assigned_robot_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  transfer_status_tx: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  sub_status_tx: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  source_port_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  destination_port_id: string;

  @Column({ type: 'datetime', nullable: true })
  load_start_at: Date;

  @Column({ type: 'datetime', nullable: true })
  load_end_at: Date;

  @Column({ type: 'datetime', nullable: true })
  unload_start_at: Date;

  @Column({ type: 'datetime', nullable: true })
  unload_end_at: Date;

  @Column({ type: 'datetime', nullable: true })
  job_complete_at: Date;

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
