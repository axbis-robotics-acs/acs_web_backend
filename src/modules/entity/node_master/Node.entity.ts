import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'acs_node_master' })
export class Node {
  @PrimaryColumn({ type: 'varchar', length: 20, nullable: false }) 
  node_id: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  node_nm: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  pos_x_val: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  pos_y_val: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  degree_val: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  occpyied_robot_id: string; 
 
  @Column({ type: 'varchar', length: 10, nullable: true }) 
  area_id: string; 
 
  @PrimaryColumn({ nullable: false }) 
  map_uuid: number; 
 
  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 }) 
  usable_fl: number; 
 
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false }) 
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