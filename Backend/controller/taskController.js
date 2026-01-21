import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId }).sort({ order: 1 });
  res.json(tasks);
};


export const createTask = async (req, res) => {
  const { title, description } = req.body;
  console.log("Creating task for user:", req.userId);
  // 1️⃣ Find the highest order in TODO column for this user
  try {
    const maxOrder = await Task.findOne({
      userId: req.userId,
      status: "TODO"
    }).sort({ order: -1 });

    // 2️⃣ Create task with next order
    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      status: "TODO", // optional (default already exists)
      order: maxOrder ? maxOrder.order + 1 : 0
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
};

export const dragTask = async (req, res) => {
  const { taskId, status, order } = req.body;
  try {
      const task = await Task.findOneAndUpdate(
        { _id: taskId, userId: req.userId },
        { status, order },
        { new: true }
      );

      res.json(task);
  } catch (error) {
    console.error("Error dragging task:", error);
    res.status(500).json({ message: "Internal server error" }); 
  }
  
};
