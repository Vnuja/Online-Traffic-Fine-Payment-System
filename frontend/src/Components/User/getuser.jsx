import { useState, useEffect } from "react";
import axios from "axios";

const GetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/check-auth", {
          withCredentials: true, // Ensure cookies are sent for authentication
        });
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Logged-in User Details</h2>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
      <p><strong>NIC:</strong> {user.NICNumber}</p>
      <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
    </div>
  );
};

export default GetUser;
