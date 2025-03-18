import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../assets/AdminRegister.css";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  nic: yup
    .string()
    .matches(/^([0-9]{9}[vVxX]|[0-9]{12})$/, "Invalid NIC format")
    .required("NIC is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .required("Mobile number is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="admin-register-container">
      <div className="admin-register-box">
        <h2 className="admin-register-title">Admin Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="admin-register-form">
          <div>
            <label className="admin-register-label">Username</label>
            <input
              type="text"
              {...register("username")}
              className="admin-register-input"
            />
            <p className="admin-register-error">{errors.username?.message}</p>
          </div>
          <div>
            <label className="admin-register-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="admin-register-input"
            />
            <p className="admin-register-error">{errors.email?.message}</p>
          </div>
          <div>
            <label className="admin-register-label">Password</label>
            <input
              type="password"
              {...register("password")}
              className="admin-register-input"
            />
            <p className="admin-register-error">{errors.password?.message}</p>
          </div>
          <div>
            <label className="admin-register-label">NIC Number</label>
            <input
              type="text"
              {...register("nic")}
              className="admin-register-input"
            />
            <p className="admin-register-error">{errors.nic?.message}</p>
          </div>
          <div>
            <label className="admin-register-label">Mobile Number</label>
            <input
              type="text"
              {...register("mobile")}
              className="admin-register-input"
            />
            <p className="admin-register-error">{errors.mobile?.message}</p>
          </div>
          <button type="submit" className="admin-register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Register;
