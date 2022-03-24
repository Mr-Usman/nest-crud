import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'Order' })
@ObjectType()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.order, { onDelete: 'CASCADE' })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.order, { onDelete: 'CASCADE' })
  @Field(() => Product, { nullable: true })
  product: Product;
}
