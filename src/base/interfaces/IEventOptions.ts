import type { Events } from "discord.js";

export default interface IEventsOptions {
  name: Events;
  description: string;
  once: boolean;
}
