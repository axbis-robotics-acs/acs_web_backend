import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_transfer_control' })
export class TransferControl {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  transfer_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  transfer_tp: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  assigned_robot_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true, default: 'READY' })
  transfer_st: string;

  @Column({ type: 'int', width: 5, default: 10 })
  priority_no: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  source_port_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  destination_port_id: string;

  @Column({ type: 'datetime', nullable: true })
  acquire_start_at: Date;

  @Column({ type: 'datetime', nullable: true })
  acquire_end_at: Date;

  @Column({ type: 'datetime', nullable: true })
  deposit_start_at: Date;

  @Column({ type: 'datetime', nullable: true })
  deposit_end_at: Date;

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
