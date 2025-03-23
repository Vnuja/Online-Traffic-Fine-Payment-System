import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../Admin/AdminLogin.css";  // We'll create this CSS file



const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Get registered admins from localStorage
      const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
      
      // Check if the credentials match any registered admin
      const admin = registeredAdmins.find(
        admin => admin.email === data.email && admin.password === data.password
      );

      if (admin) {
        localStorage.setItem("adminToken", "mock-token");
        localStorage.setItem("currentAdmin", JSON.stringify(admin));
        navigate("/admin/dashboard");
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
      
      // Uncomment when backend is ready
      // const response = await axios.post('/api/admin/login', data);
      // localStorage.setItem("adminToken", response.data.token);
      // navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-login-title">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
          <div>
            <label className="admin-login-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="admin-login-input"
            />
            <p className="admin-login-error">{errors.email?.message}</p>
          </div>
          <div>
            <label className="admin-login-label">Password</label>
            <input
              type="password"
              {...register("password")}
              className="admin-login-input"
            />
            <p className="admin-login-error">{errors.password?.message}</p>
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
          <div className="dont-have-account">
            <p>Don't have an account? <a href="/admin/register">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;