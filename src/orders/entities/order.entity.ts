import { ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'Order' })
@ObjectType()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Product, (product) => product.order)
  product: Product;
}
