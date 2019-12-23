# YubiSta project

## Project Structure

| Name | Description |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **.vscode**                    | Contains VS Code specific settings                                                                                        |
| **dist**                       | Contains the distributable (or output) from backend and frontend. This is the code we ship                                |
| **dist/server**                | Contains the distributable (or output) from our backend TypeScript build.                                                 |
| **dist/client**                | Contains the distributable (or output) from our frontend TypeScript build.                                                |
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


## NPM scrips
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| `ng`                      | Angular module trigger command                                                                      |
| `ng-test`                 | Runs frontend test cases in ChromeHeadless browser and generate code-coverage only once             |
| `ng-build`                | Compiles frontend all source `.ts` files to `.js` files in the `dist/client` folder                 |
| `ng-build-watch`          | Same as `ng-build` but continuously watches `.ts` files and re-compiles when needed                 |
| `ng-lint`                 | Runs TSLint on Angular files(Check coding conventions in frontend code)                             |
| `build`                   | Full build. Runs ALL build tasks (`build-ts`, `lint`, `ng-build` and `ng-lint` )                    |
| `e2e`                     | Runs frontend End-To-End test                                                                       |
| `start`                   | Start server with development env. Can be invoked with `npm start`                                  |
| `start:test`              | Start server with test env.                                                                         |
| `start:stage`             | Start server with stage env.                                                                        |
| `start:prod`              | Start server with production env.                                                                   |
| `watch-node`              | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task           |
| `watch`                   | Runs all watch tasks (TypeScript, Angular, Express). Use this if you're not touching static assets. |
| `test`                    |                                                                                                     |
| `watch-test`              |                                                                                                     |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist/server` folder                          |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed                 |
| `lint`                    | Runs ESLint on project files                                                                        |
| `debug`                   | Performs a full build and then serves the app in watch mode                                         |
| `serve-debug`             | Runs the app with the --inspect flag                                                                |
| `watch-debug`             | The same as `watch` but includes the --inspect flag so you can attach a debugger                    |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                         |