import { motion } from "framer-motion";
import Input from "../User Tools/Input";
import { Loader, Lock, Mail, User, Phone, IdCard } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../User Tools/PasswordStrengthMeter";
import { useAuthStore } from "../User Tools/authStore";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [NICNumber, setNICNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false); // State to control navigation

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!firstName) newErrors.firstName = "First Name is required.";
    if (!lastName) newErrors.lastName = "Last Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!NICNumber) newErrors.NICNumber = "NIC Number is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop execution if validation fails
    }

    setErrors({}); // Clear errors if all fields are filled

    try {
      await signup(
        email,
        password,
        firstName,
        lastName,
        Number(phoneNumber),
        Number(NICNumber)
      );
      setIsValid(true); // Set state to allow navigation
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 via-[#C68EFD] to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

          <Input
            icon={User}
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <Input
            icon={Phone}
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              let onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              if (onlyNumbers.length > 10) {
                onlyNumbers = onlyNumbers.slice(0, 10); // Restrict to 10 digits
              }
              setPhoneNumber(onlyNumbers);
            }}
            maxLength={10}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

          <Input
            icon={IdCard}
            type="text"
            placeholder="NIC Number"
            value={NICNumber}
            onChange={(e) => {
              let nicValue = e.target.value.replace(/[^0-9vV]/g, "");
              if (nicValue.includes("v") || nicValue.includes("V")) {
                nicValue = nicValue.replace(/v/gi, "");
                nicValue = nicValue + "V";
              }
              setNICNumber(nicValue);
            }}
            minLength={12}
          />
          {errors.NICNumber && <p className="text-red-500 text-sm">{errors.NICNumber}</p>}

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />

          {isValid ? (
            <Link to="/home">
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-[#C68EFD] text-white font-bold rounded-lg shadow-lg hover:bg-[#B07CE5] focus:outline-none focus:ring-2 focus:ring-[#C68EFD] focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go to Home
              </motion.button>
            </Link>
          ) : (
            <motion.button
              className="mt-5 w-full py-3 px-4 bg-[#C68EFD] text-white font-bold rounded-lg shadow-lg hover:bg-[#B07CE5] focus:outline-none focus:ring-2 focus:ring-[#C68EFD] focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          )}
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#C68EFD] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
