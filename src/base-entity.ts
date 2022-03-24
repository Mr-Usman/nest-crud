import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
export class BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @Field()
  @CreateDateColumn({ nullable: true })
  updatedAt?: Date;
}
