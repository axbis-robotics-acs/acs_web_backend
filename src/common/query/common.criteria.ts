import { IsNotEmpty, IsOptional } from 'class-validator';
import { getFormattedTimestampTID } from '../utils/date.format';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonCriteria {
  @Column({ type: 'varchar', length: 50, nullable: false })
  site_cd: string;

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 })
  usable_fl: number;

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

export class CommonCriteriaInput extends CommonCriteria {
  static build(
    site_cd: string,
    description: string,
    activity: string,
    modifier: string,
  ): CommonCriteria {
    const c = new CommonCriteriaInput();
    c.site_cd = site_cd;
    c.usable_fl = 1;
    c.description_tx = description;
    c.prev_activity_tx = activity;
    c.activity_tx = activity;
    c.creator_by = modifier;
    c.modifier_by = modifier;
    c.create_at = new Date();
    c.modify_at = new Date();
    c.trans_tx = getFormattedTimestampTID();
    c.last_event_at = new Date();
    return c;
  }
}

export class CommonCriteriaHistInput extends CommonCriteria {
  static build(
    site_cd: string,
    description: string,
    activity: string,
    modifier: string,
  ): CommonCriteria {
    const c = new CommonCriteriaHistInput();
    c.site_cd = site_cd;
    c.usable_fl = 1;
    c.description_tx = description;
    c.prev_activity_tx = activity;
    c.activity_tx = activity;
    c.creator_by = modifier;
    c.modifier_by = modifier;
    c.create_at = new Date();
    c.modify_at = new Date();
    c.trans_tx = getFormattedTimestampTID();
    c.last_event_at = new Date();
    return c;
  }
}
