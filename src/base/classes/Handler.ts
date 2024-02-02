import { glob } from "glob";
import type Ihandlers from "../interfaces/Ihandler";
import path from "path";
import type Event from "./Event";
import type CustomClient from "./CustomClient";
import consola from "consola";
import type Command from "./Command";
import type SubCommand from "./SubCommand";
export default class Handler implements Ihandlers {
  client: CustomClient;
  constructor(client: CustomClient) {
    this.client = client;
  }
  async loadEvents() {
    const files = (await glob(`src/base/events/**/*.ts`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name)
        delete require.cache[require.resolve(file)] &&
          consola.log(`${file.split("/").pop()} dose not have name`);

        const execute = (...args: any) => event.Execute(...args)

        //@ts-ignore
        if (event.once) this.client.once(event.name, execute)
        // @ts-ignore
        else this.client.on(this.client.name, execute)

        return delete require.cache[require.resolve(file)] 
    });
  }
  async loadCommands() {
    const files = (await glob(`src/base/commands/**/*.ts`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const command: Command | SubCommand = new (await import(file)).default(this.client);

      if (!command.name)
        delete require.cache[require.resolve(file)] &&
          consola.log(`${file.split("/").pop()} dose not have name`);


        if(file.split("/").pop()?.split('.')[2])
          return this.client.subcommands.set(command.name, command)

        this.client.commands.set(command.name, command as Command)

        return delete require.cache[require.resolve(file)] 
    });
  }
}
