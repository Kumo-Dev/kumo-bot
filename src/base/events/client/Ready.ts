import { Collection, Events, REST, Routes } from "discord.js";
import type CustomClient from "../../classes/CustomClient";
import Event from "../../classes/Event";
import consola from "consola";
import type Command from "../../classes/Command";

export default class Ready extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready Event",
      once: true,
    });
  }
  async Execute() {
    consola.ready(`${this.client.user?.tag} is now ready`);

    const commands: object[] = this.GetJson(this.client.commands);

    const rest = new REST().setToken(this.client.config.token)

    const setCommands: any = await rest.put(Routes.applicationGuildCommands(this.client.config.discordClientId, this.client.config.guildId), {
        body: commands
    })

    consola.success(`Successfully set ${setCommands.length} commands`)
  }
  private GetJson(commands: Collection<string, Command>) {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permission: command.default_member_premission.toString(),
        dm_permission: command.dm_premission,
      });
    });

    return data
  }
}
