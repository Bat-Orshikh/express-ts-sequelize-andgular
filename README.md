# YubiSta project

## Project Structure

| Name | Description |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **.vscode**                    | Contains VS Code specific settings                                                                                        |
| **dist**                       | Contains the distributable (or output) from our TypeScript build. This is the code we ship                                |
| **node_modules**               | Contains all our npm dependencies                                                                                         |
| **src**                        | Contains our backend and frontend source code that will be compiled to the dist dir folder.                               |
| **src/client**                 | Angular 8 Frontend code root folder.                                                                                      |
| **src/server**                 | Typescript with Express framework backend code root folder.                                                               |
| **server/config**              | Our project backend configuration goes here. Add other complex backend related config code will be created in here.       |
| **server/config**/.env.example | API keys, tokens, passwords, database URI. Clone this, but don't check it in to git or public nodes.                      |
| **server/controllers**         | Backend controllers define functions that respond to various http requests                                                |
| **server/logger**              | Backend winston and morgan logger custoom definition                                                                      |
| **server/models**              | Models define Sequelize models that will be used in storing and retrieving data from Postgresql                           |
| **server/routes**              | Backend all endpoints' root folder                                                                                        |
| **server/services**            | Backend server logic classes goes here.                                                                                   |
| **server/public**              | Static assets that will be used client side                                                                               |
| **server**/app.ts              | Express app initiliazation                                                                                                |
| **server**/server.ts           | Entry point to our express app                                                                                            |
| **/server/test**               | Contains our backend tests. Separate from source because there is a different build process.                              |
| package.json                   | File that contains npm dependencies                                                                                       |
| tsconfig.json                  | Config settings for compiling server code written in TypeScript                                                           |
| tsconfig.tests.json            | Config settings for compiling tests written in TypeScript                                                                 |
| .eslintrc                      | Config settings for ESLint code style checking                                                                            |
| .eslintignore                  | Config settings for paths to exclude from linting                                                                         |

## Prefare to launch server
1. Create env file for the environment you would like to use .
    - Use example file `.env.example`.
2. Run `npm install` command from terminal.