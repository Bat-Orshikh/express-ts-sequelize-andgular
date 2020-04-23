import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { parse } from "dotenv";
import moment from "moment";

const CLIENT_PREFIX = "CLIENT_";

let envPath: string;
const clientEnvDir = resolve(__dirname, "./src/client/environments");
if (!existsSync(clientEnvDir)) {
  mkdirSync(clientEnvDir);
}
let clientEnvPath: string;
let isProduction: boolean;
switch (process.env.NODE_ENV) {
  case "production": {
    envPath = resolve(__dirname, "./src/server/config/.env");
    clientEnvPath = clientEnvDir + "/environment.prod.ts";
    isProduction = true;
    writeFileSync(clientEnvDir + "/environment.ts", "");
    break;
  }
  case "development": {
    envPath = resolve(__dirname, "./src/server/config/.env.dev");
    clientEnvPath = clientEnvDir + "/environment.ts";
    isProduction = false;
    break;
  }
  default:
    isProduction = false;
    break;
}

const env = parse(readFileSync(envPath));
const envKeys = Object.keys(env);

let envText = `production: ${isProduction}`;
console.log("Copying into: ", clientEnvPath);
for (let i = 0; i < envKeys.length; i++) {
  const key = envKeys[i];
  if (key.startsWith(CLIENT_PREFIX)) {
    envText += `,\n  ${key}: "${env[key]}"`;
  }
}
const writeText =
  `/* This is AUTOMATICALLY generated file, do NOT change it manually.
  * Please consider to change dotenv file.
  * Generated at: ${moment().toString()}
  */
export const environment = {
  ${envText}
};`;
writeFileSync(clientEnvPath, writeText);