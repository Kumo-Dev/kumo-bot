import { Env } from "../utils/env";

export default {
  token: Env("BOT_TOKEN"),
  discordClientId: Env("DISCORD_CLIENT_ID"),
  guildId: Env("GUILD_ID")
};
