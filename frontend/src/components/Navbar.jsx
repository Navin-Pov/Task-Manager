import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CheckSquare, LogOut, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <CheckSquare size={24} />
        Task Manager
      </Link>
      <nav className="navbar-nav">
        <button 
          className="btn btn-icon btn-ghost" 
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        {user ? (
          <>
            <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>
              Hi, {user.username}
            </span>
            <button className="btn btn-ghost" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
