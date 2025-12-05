import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getAllTodos = async (req, res) => {
  const todos = await Todo.find().populate("user", "email username");
  res.json(todos);
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.json(user);
};
