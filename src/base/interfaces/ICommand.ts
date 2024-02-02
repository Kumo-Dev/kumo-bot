import type { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../classes/CustomClient";
import type Category from "../enums/Category";

export default interface ICommand {
    client : CustomClient;
    name: string;
    description: string;
    category: Category;
    options: Object;
    default_member_premission: bigint;
    dm_premission: boolean;
    cooldown: number;

    Execute(interaction: ChatInputCommandInteraction): void
    AutoComplete(interaction: AutocompleteInteraction): void
}