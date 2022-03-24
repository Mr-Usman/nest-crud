import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createNewProduct {
  @Field()
  name: string;
  @Field()
  skuId: string;
  @Field()
  price: string;
}
