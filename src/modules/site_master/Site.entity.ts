import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'acs_site_master' })
export class Site {
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false }) 
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
 
  @Column({ type: 'text', nullable: true }) 
  description_tx: string; 
 
  @Column({ type: 'varchar', length: 20, nullable: true }) 
  prev_activity_tx: string; 
 
  @Column({ type: 'varchar', length: 20, nullable: false }) 
  activity_tx: string; 
 
  @Column({ type: 'varchar', length: 50, nullable: false, default: 'administrator' }) 
  creator_by: string; 
 
  @Column({ type: 'varchar', length: 50, nullable: false, default: 'administrator' }) 
  modifier_by: string; 
 
  @Column({ type: 'varchar', length: 100, nullable: true }) 
  trans_tx: string; 
 
}