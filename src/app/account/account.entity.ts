import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAbstract } from '../../common/BaseEntityAbstract';
import { RoleEntity } from './role.entity';

@Entity('account')
export class AccountEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ comment: '101 admin', nullable: true })
  @ManyToOne(() => RoleEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: false,
  })
  @JoinColumn({
    name: 'role',
  })
  role?: RoleEntity;

  @Column({ comment: '1正常 2失效', default: '1' })
  status: '1' | '2';
}
