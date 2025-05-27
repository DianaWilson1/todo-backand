
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");

// import db stuff
const { dbConnect } = require("./config/db-connection");

// import model
const Todo = require("./models");

dbConnect();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get("/", async (req, res) => {
  res.send('hello');
});

// get all
app.get("/todo/all", async (req, res) => {
  res.send({ todos: [] });
});

// get by id
app.get("/todo/:id", async (req, res) => {
  res.send('Hello world');
});

// create
app.post("/todo", async (req, res) => {
  const { title, description, isComplete } = req.body;
  const todo = await Todo.createTodo({ title, description, isComplete });

  res.send(todo);
});

// edit
app.put("/todo/:id", async (req, res) => {
  res.send('Hello world');
});

// delete
app.delete("todo/:id", async (req, res) => {
  res.send('Hello world');
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
