import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'acs_robot_master' })
export class Robot {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  robot_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  robot_tp: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  model_nm: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status_tx: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transfer_id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  location_nm: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  wait_location_nm: string;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 0 })
  detection_fl: number;

  @Column({ type: 'double', nullable: false, default: 0 })
  battery_no: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  charge_rule_id: string;

  @Column({ nullable: false })
  map_uuid: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  dest_node_id: string;

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
