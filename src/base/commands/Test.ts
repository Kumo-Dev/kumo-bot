import { ChatInputCommandInteraction, PermissionsBitField, type CacheType } from "discord.js";
import Command from "../classes/Command";
import type CustomClient from "../classes/CustomClient";
import Category from "../enums/Category";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "test",
            description: "test command",
            category: Category.Utilities,
            default_member_premission: PermissionsBitField.Flags.UseApplicationCommands,
            dm_premission: true,
            cooldown: 3,
            options: []
        }) 
    }

    Execute(interaction: ChatInputCommandInteraction): void {
        interaction.reply({content: "test command has been ran"})
    }
}