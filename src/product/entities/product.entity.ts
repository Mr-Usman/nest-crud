import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
