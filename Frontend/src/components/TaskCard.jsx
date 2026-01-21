// import { useDrag } from "react-dnd";
// import { ItemTypes } from "../dnd/ItemTypes";

// export default function TaskCard({ task, onDelete }) {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemTypes.TASK,
//     item: task,
//     collect: monitor => ({ isDragging: monitor.isDragging() })
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`
//         bg-neutral-900 border border-neutral-700 rounded-lg p-3
//         cursor-move transition-all
//         hover:border-primary hover:bg-neutral-800
//         ${isDragging ? "opacity-50 scale-95" : ""}
//       `}
//     >
//       <p className="text-sm font-medium mb-2">
//         {task.title}
//       </p>

//       <button
//         onClick={() => onDelete(task._id)}
//         className="btn btn-xs btn-outline btn-error hover:bg-error hover:text-white"
//       >
//         Delete
//       </button>
//     </div>
//   );
// }

import { useDrag } from "react-dnd";
import { ItemTypes } from "../dnd/ItemTypes";
import { useState } from "react";

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: task,
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }));

  const [showDesc, setShowDesc] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || ""
  });

  const handleUpdate = () => {
    onUpdate(task._id, form);
    setIsEditing(false);
  };

  return (
    <>
      {/* Description Preview */}
      {showDesc && (
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm mb-2">
          {task.description || "No description"}
        </div>
      )}

      {/* Task Card */}
      <div
        ref={drag}
        className={`
          bg-neutral-900 border border-neutral-700 rounded-lg p-3
          cursor-move transition-all
          hover:border-primary hover:bg-neutral-800
          ${isDragging ? "opacity-50 scale-95" : ""}
        `}
      >
        <p className="font-medium mb-2">{task.title}</p>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setShowDesc(!showDesc)}
              className="btn btn-xs btn-outline"
            >
              Description
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-xs btn-outline btn-info"
            >
              Edit
            </button>
          </div>

          <button
            onClick={() => onDelete(task._id)}
            className="btn btn-xs btn-outline btn-error"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-neutral-900 border border-neutral-700">
            <h3 className="font-bold text-lg mb-4">Edit Task</h3>

            <input
              className="input input-bordered w-full mb-3"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />

            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
            />

            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save
              </button>
              <button className="btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
