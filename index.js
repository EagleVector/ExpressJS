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
const fs = require("fs");
const mongoose = require("mongoose");

// How mongoose works.
// We create a schema and by using that schema we create a model.
// Using model we do all our CRUD operations.


const app = express();
const PORT = 8000;

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/test-db')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));

// Schema 
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  gender: {
    type: String
  },
  job_title: {
    type: String
  }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

// Middleware - Plugin
// Execute any code
// Make changes to the request and the response objects
// End the request response cycle
// Call the next middleware function in the stack

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("Hello from MiddleWare 1");
  // return res.end("Hey");
  // req.myUserName = 'Eagle_Vector';
  fs.appendFile("log.txt", 
  `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err, data) => {
    next();
  });
});

app.use((req, res, next) => {
  // console.log("Hello from MiddleWare 2");
  // return res.end("Hey MW 2");
  // return res.end(req.myUserName);
  next();
})



// Routes

// PROJECT

// We will be creating a project which will be based on REST API that processes JSON Data. Operations:

// GET /users - HTML Document Renderer

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// GET /api/users - List all the users

app.get('/api/users', async (req, res) => {
  const allDbUsers = await User.find({});
  // Custom Headers
  // res.setHeader('X-myName', 'Cherry');
  // Always add X to custom headers - Best practise
  // console.log(req.headers);
  return res.json(allDbUsers);
});

// GET /users/1 - Get the user with ID: 1 - Dynamic Path params - GET /api/users/:id
// GET /users/2 - Get the user with ID: 2 - Dynamic Path params

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// POST /users - Create new user

app.post('/api/users', async (req, res) => {
  const body = req.body;
  if((!body) || 
  (!body.first_name) || 
  (!body.last_name) || 
  (!body.email) || 
  (!body.job_title) || 
  (!body.gender)) {
    res.status(400).json({ error : "Please enter the req fields"});
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title
  });

  console.log("Result: ", result);

  return res.status(201).json({ msg : "successfully inserted" });
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

// Testing APIs with Postman

app
  .route('/api/users/:id')
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Updated" });
    return res.json({ status : "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status : "Deleted"});
  });

app.listen(PORT, console.log(`Server Started at PORT: ${PORT}`));

// HTTP HEADERS
// Headers are the additional info that we send or receive along with our request or response
// Its the meta data -> data about the data
// We can send custom headers as well

// HTTP response status codes
// 1. Informational Response (100 - 199)
// 2. Successful Response (200 - 299)
// 3. Redirect Messages (300 - 399)
// 4. Clint Side Error (400 - 499)
// 5. Server Side Error (500 - 599)