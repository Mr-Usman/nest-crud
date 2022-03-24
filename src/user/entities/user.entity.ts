import { Field, ObjectType, ResolveField } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
// import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'User' })
@ObjectType()
export class User extends BaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order], { nullable: false })
  order: Order[];
}
