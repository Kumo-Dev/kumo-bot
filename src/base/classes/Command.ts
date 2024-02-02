import type {
  ChatInputCommandInteraction,
  CacheType,
  AutocompleteInteraction,
} from "discord.js";
import type Category from "../enums/Category";
import type ICommand from "../interfaces/ICommand";
import type CustomClient from "./CustomClient";
import type ICommandOptions from "../interfaces/ICommandOptions";

export default class Command implements ICommand {
  client: CustomClient;
  name: string;
  description: string;
  options: Object;
  category: Category;
  default_member_premission: bigint;
  dm_premission: boolean;
  cooldown: number;

  constructor(client: CustomClient, options: ICommandOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.options = options.options;
    this.category = options.category;
    this.default_member_premission = options.default_member_premission;
    this.dm_premission = options.dm_premission;
    this.cooldown = options.cooldown;
  }

  Execute(interaction: ChatInputCommandInteraction<CacheType>): void {}
  AutoComplete(interaction: AutocompleteInteraction<CacheType>): void {}
}
