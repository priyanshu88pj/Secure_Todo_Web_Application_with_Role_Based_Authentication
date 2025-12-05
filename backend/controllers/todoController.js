import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos =
      req.user.role === "admin"
        ? await Todo.find().populate("user", "email username")
        : await Todo.find({ user: req.user.id });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      user: req.user.id
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await todo.deleteOne();

    res.json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
