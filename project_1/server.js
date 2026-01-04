//This address of this server connected to the network is:
//URL -> http://localhost:8383
//IP -> 127.0.0.1:8383

//CRUD - Create(Post)-Read(Get)-Update(Put)-Delete (CRUD ACTION vs HTTP Methods(post, get, put, delete))

const express = require("express");
const app = express();
const PORT = 8383;

const data = ["Berd"];

//Middleware
app.use(express.json()); //middleware is middle in between interactions to configure server

//GET Request
app.get("/", (req, res) => {
  res.send(`<body 
    style="background: pink; 
    color: blue">
    <h1>Welcome to Home!</h1>
    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Dashboard</a>
    </body>
    `);
});

app.get("/dashboard", (req, res) => {
  res.send(`<body style="background: yellow">
    <h1>Welcome to Dashboard!</h1>  
    <a href="/">Home</a></body>
`);
});

//Type 2 - API endpoints (non visual)
app.get("/api/data", (req, res) => {
  console.log("This one was for data");
  res.send(data);
});

//POST Request
app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("We deleted the element!");
  res.sendStatus(203);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`)); //app listens incoming request here
