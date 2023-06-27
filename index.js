// const express = require("express");
// const http = require("http");

// // We create an app now which is a handler function
// const app = express();

// app.get('/', (req, res) => {
//   return res.send('Hello From Home Page')
// });

// app.get('/about', (req, res) => {
//   return res.send('Hello From Info Page')
// });

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log('Server Started'));

const express = require("express");

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello From Home Page')
});

app.get('/about', (req, res) => {
  return res.send(`Hello ${req.query.name} ! How come you are only ${req.query.age} ?`)
});

app.listen(8000, console.log('Server Started!'));

// Versioning in NodeJS
// express: "^4.18.2"
// 1st part -> 4 -> Major / Breaking Change -> Major Release -> Should not be updated in existing code
// 2nd part -> 18 -> Latest -> 18 - Recommended Bug Fix (Security) -> Creating/Deleting a new feature / route. Dependency update
// 3rd part -> 2 -> Minor fixes (optional) [Latest] typo/text update


// ^ -> Compatible with version -> Install all recommended and minor fixes automatically. It covers the update from the given release to next Major release (5)

// ~ -> Compatible with minor fix -> Install all minor fixes automatically. It covers the update from the given release to next Minor release. (18)

// dependency -> range can also be specified "4.0.0 - 4.999.999"
// imp: never use latest