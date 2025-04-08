import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'acs_lang_master' })
export class Lang {
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false }) 
  lang_cd: string; 
 
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false }) 
  lang_tp: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: false }) 
  lang_val: string; 
 
  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 }) 
  usable_fl: number; 
 
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false }) 
  site_cd: string; 
 
  @Column({ type: 'text', nullable: true }) 
  description_tx: string; 
 
  @Column({ type: 'varchar', length: 20, nullable: true }) 
  prev_activity_tx: string; 
 
  @Column({ type: 'varchar', length: 20, nullable: false, default: '' }) 
  activity_tx: string; 
 
  @Column({ type: 'varchar', length: 50, nullable: true, default: 'administrator' }) 
  creator_by: string; 
 
  @CreateDateColumn()  
  create_at: Date; 
 
  @Column({ type: 'varchar', length: 50, nullable: false, default: 'administrator' }) 
  modifier_by: string; 
 
  @UpdateDateColumn()  
  modify_at: Date; 
 
  @Column({ type: 'varchar', length: 100, nullable: true }) 
  trans_tx: string; 
 
  @Column({ type: 'datetime', nullable: true }) 
  last_event_at: Date; 
 
}