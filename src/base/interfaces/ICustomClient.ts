import type { Collection } from "discord.js"
import type { IConfig } from "./IConfig"
import type Command from "../classes/Command"
import type SubCommand from "../classes/SubCommand"

export default interface ICustomClient {
    config: IConfig
    commands: Collection<string, Command>
    subcommands: Collection<string, SubCommand>
    cooldowns: Collection<string, Collection<string, number>>

    Init(): void
    LoadHandlers(): void
}