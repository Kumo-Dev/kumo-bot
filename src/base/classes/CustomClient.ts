import { Client, Collection } from "discord.js";
import type ICustomClient from "../interfaces/ICustomClient";
import type { IConfig } from "../interfaces/IConfig";
import config from "../../config";
import consola from "consola";
import Handler from "./Handler";
import type Command from "./Command";
import type SubCommand from "./SubCommand";

export default class CustomClient extends Client implements ICustomClient {
    handlers: Handler
    config: IConfig;

    commands: Collection<string, Command>;
    subcommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    constructor() {
        super({ intents: [] });

        this.config = config;
        this.handlers = new Handler(this)
        this.commands = new Collection()
        this.subcommands = new Collection()
        this.cooldowns= new Collection()
    }

    Init(): void {
        this.LoadHandlers()
        this.login(this.config.token)
            .then(() => consola.log("Kumo Custom Client"))
            .catch((error) => consola.error(error))
    }
    LoadHandlers(): void {
        this.handlers.loadEvents()
        this.handlers.loadCommands()
    }
}
