### Sports Event Tracking App

Sports event Tracking app. Displays runners from starting corridor to when they cross-finish line.

The project was created using [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate). Check it out.

### Features

- Based on `server` folder's Endpoint for sport event tracking app(initializing, logging and getting of runners) using normal http connection.

- Web socket connection to server(Uses socket.io client API) for real-time end-to-end communication.

- Contains two buttons, Start and Finish, which after when clicked displays runners starting in finish corridor(that is crossing starting line) and crossing finish line respectively

- Transition of runners on the UI as they enter finish corridor and cross finish line, without user doing any nuisance. (Movement can also be monitored on the browser console and server-side terminal for convenience).

- Fast runners fade from UI, Last runner stays on screen.

- Comfortable interface

### Development

Install dependencies
`npm install`

Start the application at localhost:3000
`npm start`

Test
`npm run test`
