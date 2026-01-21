import { useEffect, useState } from "react";
import api from "../api/axios";
import Column from "../components/Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => { loadTasks(); }, []);

  const createTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  const updateTask = async (id, data) => {
    await api.put(`/tasks/${id}`, data);
    loadTasks();
  };


  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const dropTask = async (task, status) => {
    await api.patch("/tasks/drag", {
      taskId: task._id,
      status,
      order: 0
    });
    loadTasks();
  };

  const grouped = {
    TODO: tasks.filter(t => t.status === "TODO"),
    IN_PROGRESS: tasks.filter(t => t.status === "IN_PROGRESS"),
    DONE: tasks.filter(t => t.status === "DONE")
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-neutral-900 text-neutral-100 px-6 py-8">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
          Kanban Board
        </h1>
        

        {/* Create Task */}
        <div className="flex justify-center mb-10 gap-4">
          <input
            className="input input-bordered w-80 bg-neutral-800 text-white border-neutral-700 focus:border-primary"
            placeholder="Add a new task..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            onClick={createTask}
            className="btn btn-primary hover:scale-105 transition-transform"
          >
            Add Task
          </button>
        </div>

        {/* Columns */}
        <div className="flex justify-center gap-8">
          <Column title="To Do" status="TODO" tasks={grouped.TODO}
            onDropTask={dropTask} onDelete={deleteTask} onUpdate={updateTask} />
          <Column title="In Progress" status="IN_PROGRESS" tasks={grouped.IN_PROGRESS}
            onDropTask={dropTask} onDelete={deleteTask} onUpdate={updateTask} />
          <Column title="Done" status="DONE" tasks={grouped.DONE}
            onDropTask={dropTask} onDelete={deleteTask} onUpdate={updateTask} />
        </div>
      </div>
    </DndProvider>
  );
}
