# Mooncascade sport event timing API

This program is built for mooncascade application challenge.

## Building and running locally

To run this locally, you need Node.js > 8 and a MongoDB.

Clone the repository, install required packages via `npm install`  then run `npm start`. Example commands are below:

```sh
git clone https://github.com/giresse19/mooncascade_challenge
cd mooncascade-challenge-server
npm install
npm start
```

| Purpose | URL
| - | -
| 404 page | http://localhost:8000/anypage
| Initialize DB | http://localhost:8000/internal/initialize
| Show DB | http://localhost:8000/internal/db
| Show Logs | http://localhost:8000/internal/logs



## Folder structure

### Root files

| File | Comment
| - | -
| `.editorconfig` | IDE styler (see http://editorconfig.org/)
| `.eslintrc.js` | ESLint Rules, including ES6 and some best practices
| `.gitignore` | Ignoring node_modules and lock files
| `LICENSE` | MIT License file
| `Readme.md` | This file
| `package.json` | NPM data including node and npm engine versions

### src/server.js
* Main entrance point, also defined as this on `package.json`
* Catches all exceptions and logs, preventing errors to crash process
* Uses `process.env.PORT` to define listen port, fallbacks to `8000`
* Listens to socket connection from client(browser). 
* Performs handshake with various client-types and carries out the neccessary service


### src/app.js
* Isolated Express App (without the server)
* It has only one custom middleware that
  * Sets response header for JSON
  * Creates a function to return APIs in `{status:200, data: ...}` format
* It has a public API which uses `server` service(via web sockets connection)
* It has 3 internal functions for db reset, show db and show logs
* It has a fallback route for 404
* It has an Error route to catch uncaught errors

### src/models.js
* Mongoose connection starts here(I used mLab for this connections)(see https://mlab.com/)
* Mongoose models and their schemas are defined and exported here (to be only used by `src/db.js`)

### src/db.js
* Uses `src/models` to get Mongoose Models
* Behaves like ORM layer
* DB tasks like `initialize` and `log` are defined here