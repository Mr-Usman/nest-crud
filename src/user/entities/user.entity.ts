import { ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'User' })
@ObjectType()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product;
}
