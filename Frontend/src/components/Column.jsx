import { useDrop } from "react-dnd";
import { ItemTypes } from "../dnd/ItemTypes";
import TaskCard from "./TaskCard";

export default function Column({ title, status, tasks, onDropTask, onDelete, onUpdate }) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (task) => onDropTask(task, status)
  }));

  return (
    <div
      ref={drop}
      className="w-80 bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg p-4 
                 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-lg font-semibold text-center mb-4 text-primary">
        {title}
      </h3>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate}/>
        ))}
      </div>
    </div>
  );
}

