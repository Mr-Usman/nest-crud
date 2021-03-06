import { ObjectType } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'Product' })
@ObjectType()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  skuId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  price: string;

  @OneToMany(() => Order, (order) => order.product)
  // @JoinColumn({ name: 'productId' })  for one-to-one relationship
  order: Order[];
}
