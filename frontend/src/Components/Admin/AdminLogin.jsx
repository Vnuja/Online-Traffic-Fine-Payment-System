import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../Admin/AdminLogin.css";  // We'll create this CSS file

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Here you would typically send a POST request to the backend to login
    // Example with axios (uncomment and replace with your API)
    // try {
    //   const response = await axios.post('/api/admin/login', data);
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/admin-dashboard");
    // } catch (error) {
    //   alert("Login failed");
    // }
    console.log(data); // For now, just log the data
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
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
