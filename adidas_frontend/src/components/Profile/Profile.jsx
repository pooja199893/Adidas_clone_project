import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import toast from "react-hot-toast";
import Api from "../../axiosconfig";

const Profile = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const user = authState?.user;
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <h2>Please log in to view your profile.</h2>
        </div>
        <Footer />
      </>
    );
  }

  async function handleLogout() {
    try {
      const response = await Api.post("/auth/logout"); // Adjust the route if needed
      if (response.data.success) {
        dispatch({ type: "LOGOUT" });
        navigate("/sign-in"); // Redirect to login page
        toast.success(response.data.message || "Logged out successfully");
      } else {
        toast.error(response.data.message || "Logout failed.");
      }
    } catch (error) {
      toast.error("Failed to logout.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-info">
          <div className="profile-field">
            <label>Full Name</label>
            <p>{user.name || "-"}</p>
          </div>
          <div className="profile-field">
            <label>Email Address</label>
            <p>{user.email || "-"}</p>
          </div>
          <div className="profile-field">
            <label>Phone Number</label>
            <p>{user.phone || "-"}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
