import { IsNotEmpty, IsOptional } from 'class-validator';
import { getFormattedTimestampTID } from '../data-format';

export abstract class CommonCriteria {
  @IsNotEmpty()
  site_cd: string;

  @IsOptional()
  usable_fl?: number;

  @IsOptional()
  description_tx?: string;

  @IsOptional()
  prev_activity_tx?: string;

  @IsOptional()
  activity_tx?: string;

  @IsOptional()
  creator_by?: string;

  @IsOptional()
  create_at?: Date;

  @IsOptional()
  modifier_by?: string;

  @IsOptional()
  modify_at?: Date;

  @IsOptional()
  trans_tx?: string;

  @IsOptional()
  last_event_at?: Date;
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
