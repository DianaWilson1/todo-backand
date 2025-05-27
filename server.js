
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");

// import db stuff
const { dbConnect } = require("./config/db-connection");

// import model
const Todo = require("./models");

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get("/", async (req, res) => {
  res.send('hello');
});

// get all
app.get("/todo/all", async (req, res) => {
  // call find on todo model/schema to get all todos
  try {
    const todos = await Todo.find();
    res.status(200).send({ todos });
  } catch (error) {
    res.status(404).send(`Sorry, cant find todos ${error}`);
  }
});

// get by id
app.get("/todo/:id", async (req, res) => {
  try {
    const todos = await Todo.findById(req.params.id);
    res.status(200).send({ todos });
  } catch (error) {
    res.status(404).send(`Sorry, cant find todos ${error}`);
  }
});

// create
app.post("/todo", async (req, res) => {
  const { title, description, isComplete } = req.body;
  const todo = await Todo.create({title, description, isComplete});

  res.send(todo);
});

// edit
app.put("/todo/:id", async (req, res) => {
  try {
    const todos = await Todo.findOneAndUpdate(req.body.id, req.body);
    res.status(200).send({ todos });
  } catch (error) {
    res.status(404).send(`Sorry, cant find todos ${error}`);
  }
});

// delete
app.delete("/todo/:id", async (req, res) => {
  try {
    const todos = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send({ todos });
  } catch (error) {
    res.status(404).send(`Sorry, cant find todos ${error}`);
  }
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
