import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData.username, formData.email, formData.password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "4rem auto" }}>
      <div className="text-center mb-4">
        <h2>Create an Account</h2>
        <p style={{ color: "var(--text-secondary)" }}>Sign up to get started</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>

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
            autoComplete="new-password"
            minLength="6"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Creating Account..." : <><UserPlus size={18} /> Sign Up</>}
        </button>
      </form>

      <div className="text-center mt-4">
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
