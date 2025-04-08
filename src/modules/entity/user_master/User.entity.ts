import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'acs_user_master' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false }) 
  account_id: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  user_nm: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: false }) 
  password_tx: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  email_nm: string; 
 
  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Guest' }) 
  role_cd: string; 
 
  @Column({ type: 'varchar', length: 50, nullable: true }) 
  class_cd: string; 
 
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