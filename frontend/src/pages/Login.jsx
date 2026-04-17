import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "4rem auto" }}>
      <div className="text-center mb-4">
        <h2>Welcome Back</h2>
        <p style={{ color: "var(--text-secondary)" }}>Login to manage your tasks</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Logging in..." : <><LogIn size={18} /> Login</>}
        </button>
      </form>

      <div className="text-center mt-4">
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
