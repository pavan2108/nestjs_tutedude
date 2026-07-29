import { TaskStatusEnum } from '../utils/enums/task-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Customer } from './customer.entity';

@Entity('crm_tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    enum: TaskStatusEnum,
    default: TaskStatusEnum.TODO,
  })
  status: TaskStatusEnum;

  @Column()
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  assignedTo: number;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
