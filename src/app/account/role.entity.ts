import { Condition } from 'src/common/typeorm/FindConditions/decorator/FindConditions';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  Like,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAbstract } from '../../common/BaseEntityAbstract';
import { IsEmpty, IsOptional } from 'class-validator';
import { IsNotEmptyOnSave } from 'src/common/validator/IsNotEmptyOnSave';

@Entity('role')
export class RoleEntity extends BaseEntityAbstract {
  @IsOptional()
  @PrimaryGeneratedColumn()
  id: string;

  @IsNotEmptyOnSave()
  @Column()
  @Condition({
    function: (val) => Like(`%${val}%`),
  })
  name: string;

  @Column()
  code: number;

  @IsEmpty()
  @Condition()
  @Column({ comment: '1正常 2失效', default: '1' })
  status: '1' | '2';
}
