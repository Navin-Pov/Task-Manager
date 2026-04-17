import { Check, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");

  const handleUpdate = () => {
    onUpdate(task._id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="card mb-4">
        <div className="form-group">
          <input
            className="form-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description (optional)"
          />
        </div>
        <div className="flex justify-between">
          <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>
            <X size={18} /> Cancel
          </button>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <h3 className="task-title">
          {task.title} 
          <span style={{ fontSize: "0.7rem", backgroundColor: "var(--border)", padding: "0.15rem 0.4rem", borderRadius: "var(--radius-md)", marginLeft: "0.5rem" }}>
            {task.category || "General"}
          </span>
        </h3>
        {task.description && <p className="task-desc">{task.description}</p>}
        
        <span className={`status-badge ${task.completed ? "status-completed" : "status-pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-actions flex items-center">
        <button
          className="btn btn-icon btn-ghost"
          style={{ color: task.completed ? "var(--success)" : "var(--text-secondary)" }}
          onClick={() => onToggle(task._id, !task.completed)}
          title={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          <Check size={20} />
        </button>
        
        <button
          className="btn btn-icon btn-ghost text-primary"
          onClick={() => setIsEditing(true)}
          title="Edit task"
        >
          <Edit size={18} />
        </button>

        <button
          className="btn btn-icon btn-ghost text-danger"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          <Trash2 size={18} color="var(--danger)" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
