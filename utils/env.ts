import consola from "consola";

export const Env = (variable: string) => {
  const env = process.env[variable];

  if (!env) {
    consola.error(`${variable} do not exisit in .env file`);
  }

  return env as string;
};
