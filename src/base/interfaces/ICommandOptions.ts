import type Category from "../enums/Category";

export default interface ICommandOptions {
    name: string;
    description: string;
    category: Category;
    options: Object;
    default_member_premission: bigint;
    dm_premission: boolean;
    cooldown: number;
}