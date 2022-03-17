import { ObjectType } from '@nestjs/graphql';
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
  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  // @JoinColumn({ name: 'userId' })
  order: Order[];

  // //Many-to-many relation with role
  // @ManyToMany((type) => Role, {
  //   cascade: true,
  // })
  // @JoinTable({
  //   name: "users_roles",
  //   joinColumn: { name: "userId", referencedColumnName: "id" },
  //   inverseJoinColumn: { name: "roleId" }
  // })
  // roles: Role[];
}
