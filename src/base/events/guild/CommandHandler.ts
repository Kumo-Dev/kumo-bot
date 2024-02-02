import {
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  Events,
} from "discord.js";
import type CustomClient from "../../classes/CustomClient";
import Event from "../../classes/Event";
import type Command from "../../classes/Command";
import consola from "consola";

export default class CommandHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Command handler Event",
      once: false,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command: Command = this.client.commands.get(interaction.commandName)!;

    if (!command)
      return (
        await interaction.reply({
          content: "This Command dose not exist!",
          ephemeral: true,
        }) && this.client.commands.delete(interaction.commandName)
      );

    const { cooldowns } = this.client;
    if (!cooldowns.has(command.name))
      cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (
      timestamps?.has(interaction.user.id) &&
      now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
    )
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `Please wait another \`${(
                ((timestamps.get(interaction.user.id) || 0) +
                  cooldownAmount -
                  now) /
                1000
              ).toFixed(1)}\` seconds to run this command!`
            ),
        ],
        ephemeral: true,
      });

    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${
        subCommandGroup ? `.${subCommandGroup}` : ""
      }.${interaction.options.getSubcommand(false) || ""}`;

      return (
        this.client.subcommands.get(subCommand)?.Execute(interaction) ||
        command.Execute(interaction)
      );
    } catch (error) {
      consola.error(error);
    }
  }
}
