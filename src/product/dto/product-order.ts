import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductOrderDetails {
  @Field()
  productId: string;
}
