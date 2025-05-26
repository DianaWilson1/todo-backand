const mongoose = require('mongoose');

// define model schema = fields on the model: what should the model look like?
const todoModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, required: false },
});

// create database model based on schema
const Todo = mongoose.model('Todo', todoModel);

// Function to create a todo
const createTodo = async (title, description, isCompleted) => {
  try {
    const todo = await Todo.create({ title, description, isCompleted });
    console.log("Todo created:", todo);
    return todo;
  } catch (error) {
    console.error("Failed to create todo:", error);
    return error.message;
  }
};

// Function to get a todo by ID
const getTodoById = async (id) => {
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      console.log("Todo not found");
      return null;
    }
    return todo;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return error.message;
  }
};

// Function to update a todo by ID
const updateTodo = async (id, title, description, isCompleted) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      console.log("Todo not found");
      return null;
    }
    console.log("Updated todo:", updatedTodo);
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    return error.message;
  }
};

// Function to delete a todo by ID
const deleteTodo = async (id) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      console.log("Todo not found");
      return null;
    }
    console.log("Deleted todo:", deletedTodo);
    return deletedTodo;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return error.message;
  }
};

// Function to get all todos
const getAllTodos = async () => {
  try {
    const todos = await Todo.find({});
    console.log("All todos:", todos);
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return error.message;
  }
};

// Exporting the functions
const todoActions = {
  TodoModel: Todo,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  getAllTodos
};


module.exports = todoActions;
