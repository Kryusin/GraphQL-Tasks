import { Field, HideField, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @HideField()    // GraphQLからのクライアントは取得できなくなる
    password: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
