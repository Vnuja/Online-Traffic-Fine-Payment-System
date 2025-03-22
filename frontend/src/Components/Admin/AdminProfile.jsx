import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AdminProfile.css";

const schema = yup.object().shape({
  officerName: yup.string().required("Officer name is required"),
  policeId: yup.string().required("Police ID is required"),
  workingBranch: yup.string().required("Working branch is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .required("Mobile number is required"),
});

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    officerName: "John Doe",
    policeId: "POL123456",
    workingBranch: "Traffic Division",
    email: "john.doe@police.gov",
    mobile: "0771234567",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: profileData,
  });

  useEffect(() => {
    // Here you would typically fetch the admin's profile data from your backend
    // For now, we're using the mock data from profileData state
    reset(profileData);
  }, [profileData, reset]);

  const onSubmit = async (data) => {
    try {
      // Here you would typically send a PUT request to update the profile
      // const response = await axios.put('/api/admin/profile', data);
      setProfileData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        // Here you would typically send a DELETE request to remove the profile
        // await axios.delete('/api/admin/profile');
        // Handle successful deletion (e.g., redirect to login)
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-box">
        <div className="admin-profile-header">
          <h2 className="admin-profile-title">Admin Profile</h2>
          <div className="admin-profile-actions">
            {!isEditing ? (
              <>
                <button
                  className="admin-profile-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="admin-profile-delete-btn"
                  onClick={handleDelete}
                >
                  Delete Profile
                </button>
              </>
            ) : (
              <button
                className="admin-profile-cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="admin-profile-form">
          <div className="admin-profile-field">
            <label className="admin-profile-label">Officer Name</label>
            <input
              type="text"
              {...register("officerName")}
              className="admin-profile-input"
              disabled={!isEditing}
            />
            <p className="admin-profile-error">{errors.officerName?.message}</p>
          </div>

          <div className="admin-profile-field">
            <label className="admin-profile-label">Police ID</label>
            <input
              type="text"
              {...register("policeId")}
              className="admin-profile-input"
              disabled={!isEditing}
            />
            <p className="admin-profile-error">{errors.policeId?.message}</p>
          </div>

          <div className="admin-profile-field">
            <label className="admin-profile-label">Working Branch</label>
            <input
              type="text"
              {...register("workingBranch")}
              className="admin-profile-input"
              disabled={!isEditing}
            />
            <p className="admin-profile-error">{errors.workingBranch?.message}</p>
          </div>

          <div className="admin-profile-field">
            <label className="admin-profile-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="admin-profile-input"
              disabled={!isEditing}
            />
            <p className="admin-profile-error">{errors.email?.message}</p>
          </div>

          <div className="admin-profile-field">
            <label className="admin-profile-label">Mobile Number</label>
            <input
              type="text"
              {...register("mobile")}
              className="admin-profile-input"
              disabled={!isEditing}
            />
            <p className="admin-profile-error">{errors.mobile?.message}</p>
          </div>

          {isEditing && (
            <button type="submit" className="admin-profile-save-btn">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminProfile; 