import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";
import { PlusCircle, Filter } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { api } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  
  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("General");
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: newTaskTitle,
        description: newTaskDesc,
        category: newTaskCategory,
      });
      setTasks([res.data, ...tasks]);
      setNewTaskTitle("");
      setNewTaskDesc("");
      setNewTaskCategory("General");
      setIsAdding(false);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  const handleToggle = async (id, completedStatus) => {
    try {
      const res = await api.put(`/tasks/${id}`, { completed: completedStatus });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      if (completedStatus) {
        toast.success("Task completed!");
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedData);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      toast.success("Task updated");
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Your Tasks</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAdding(!isAdding)}
        >
          <PlusCircle size={18} /> Add Task
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="flex items-center gap-2 mb-4" style={{ backgroundColor: "var(--surface)", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
          <Filter size={18} color="var(--text-secondary)" />
          <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Filter:</span>
          {["All", "Pending", "Completed"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "var(--primary)" : "transparent",
                color: filter === f ? "white" : "var(--text-primary)",
                border: "none",
                borderRadius: "var(--radius-md)",
                padding: "0.25rem 0.75rem",
                cursor: "pointer",
                fontWeight: filter === f ? 600 : 400
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAddTask} className="card mb-4" style={{ borderLeft: "4px solid var(--primary)", backgroundColor: "var(--surface)"}}>
          <div className="form-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              className="form-input"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description (optional)"
              className="form-input"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select 
              className="form-input" 
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">Save Task</button>
            <button type="button" className="btn btn-ghost" onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-center mt-4">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="card text-center" style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--text-secondary)"}}>No tasks yet</h3>
          <p style={{ color: "var(--text-secondary)"}}>Click 'Add Task' to create your first task!</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center mt-4" style={{ color: "var(--text-secondary)"}}>
          No {filter.toLowerCase()} tasks found.
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
