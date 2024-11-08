import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityAbstract } from '../../common/BaseEntityAbstract';

@Entity('user')
export class UserEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  nickname: string;

  @Column({ default: 0 })
  balance: number;
}
