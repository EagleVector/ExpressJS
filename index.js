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
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

// Routes

// PROJECT

// We will be creating a project which will be based on REST API that processes JSON Data. Operations:

// GET /users - HTML Document Renderer

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")};
    </ul>
  `;
  res.send(html);
});

// GET /api/users - List all the users

app.get('/api/users', (req, res) => {
  return res.json(users);
});

// GET /users/1 - Get the user with ID: 1 - Dynamic Path params - GET /api/users/:id
// GET /users/2 - Get the user with ID: 2 - Dynamic Path params

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// POST /users - Create new user

app.post('/api/users', (req, res) => {
  // TODO: Create new user
  return res.json({status: "pending"})
});

// PATCH /users/1 - Edit the user with ID: 1 - Dynamic path params 
// PATCH /users/2 - Edit the user with ID: 2 - Dynamic path params 

// app.patch('/api/users/:id', (req, res) => {
//   // TODO: Edit user with user id
//   return res.json({status: "pending"})
// });

// DELETE /users/1 - Delete the user with ID: 1

// app.delete('/api/users/:id', (req, res) => {
//   // TODO: Delete user with user id
//   return res.json({status: "pending"})
// });

// Handling multiple methods through a single route: 
// We commonly have the route /api/users/:id in our get patch and delete route. 
// We can combine them into one.

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({status: "pending"})
  })
  .delete((req, res) => {
    return res.json({status: "pending"})
  });

app.listen(PORT, console.log(`Server Started at PORT: ${PORT}`));