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

// const express = require("express");

// const app = express();

// app.get('/', (req, res) => {
//   return res.send('Hello From Home Page')
// });

// app.get('/about', (req, res) => {
//   return res.send(`Hello ${req.query.name} ! How come you are only ${req.query.age} ?`)
// });

// app.listen(8000, console.log('Server Started!'));

// Versioning in NodeJS
// express: "^4.18.2"
// 1st part -> 4 -> Major / Breaking Change -> Major Release -> Should not be updated in existing code
// 2nd part -> 18 -> Latest -> 18 - Recommended Bug Fix (Security) -> Creating/Deleting a new feature / route. Dependency update
// 3rd part -> 2 -> Minor fixes (optional) [Latest] typo/text update


// ^ -> Compatible with version -> Install all recommended and minor fixes automatically. It covers the update from the given release to next Major release (5)

// ~ -> Compatible with minor fix -> Install all minor fixes automatically. It covers the update from the given release to next Minor release. (18)

// dependency -> range can also be specified "4.0.0 - 4.999.999"
// imp: never use latest


// REST API: Representational State Transfer Application Programming Interface.

// Best Practices:

// REST follows the client server architecture in which the client and the server are completely independent of each other. They work in complete isolation. Client sends a request to the server and the server sends back a response. The format of data server sends must be JSON if the client is cross-platform but if its surely a browser it will interact with 'html'.
// REST always respects all the HTTP methods -> GET POST PATCH PUT DELETE
// When we want to update user data we wont use post rather we will use patch method. We will make max usage of all the HTTP method
// If all the above conditions are followed, we term the API as RESTful API
// Rendering HTML data is very fast and this follows SSR (Server Side Rendering). methods -> res.send() & res.render()
// Rendering JSON data is slow and it is rendered at clients end and thats why it is called CSR (Client Side Rendering). We will we doing its application in React. methods -> res.JSON() (automatically converts data into json form).

const express = require("express");

const app = express();
const PORT = 8000;

app.listen(PORT, console.log(`Server Started at PORT: ${PORT}`));