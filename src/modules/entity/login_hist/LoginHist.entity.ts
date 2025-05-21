import { CommonCriteria } from 'src/common/query/common.criteria';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'acs_login_hist' })
export class LoginHist extends CommonCriteria {
  @PrimaryColumn({ nullable: false })
  hist_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_nm: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role_cd: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  access_by: Date;
}
