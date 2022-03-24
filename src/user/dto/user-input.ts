import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { User } from '../entities/user.entity';

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class UserOrderDetails {
  @Field()
  id: string;
}

@InputType()
export class createUserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class LoginResponsePayload {
  @Field()
  accessToken: string;
  // @Field()
  // response?: signInResponsePayload;
}

@ObjectType()
export class createUserResponsePayload {
  @Field()
  username: string;
  @Field()
  email: string;
}

@ObjectType()
export class UserOrderResponsePayload {
  @Field()
  user: User;
}

@ObjectType()
export class ResponsePayload {
  @Field({ nullable: true })
  status: number;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message: string;
  @Field({ nullable: true })
  name?: string;
}
@ObjectType()
export class ResponsePayloadResponse {
  @Field({ nullable: true })
  response?: ResponsePayload;
}

@ObjectType()
export class UserPayload {
  @Field({ nullable: true })
  user: User;
  @Field({ nullable: true })
  response?: ResponsePayload;
}
