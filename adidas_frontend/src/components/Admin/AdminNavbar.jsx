import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './AdminNavbar.css'; // Optional for styling
import Api from '../../axiosconfig';
import toast from 'react-hot-toast';

const AdminNavbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();
  const location = useLocation();

  async function handleAdminLogout() {
            try {
                const response = await Api.post("/admin/logout-admin");
                if (response.data.success) {
                    dispatch({ type: "LOGOUT" });
                    router("/admin-login");
                    toast.success(response.data.message);
                } else {
                    toast.error("Logout failed.");
                }
            } catch (error) {
                toast.error("Failed to logout.");
            }
        }

  const isActive = (path) => location.pathname === path ? 'active-tab' : '';

  return (
    <div className="admin-navbar">
      <h2 onClick={() => router("/admin-products")} className="admin-logo">Admin Panel</h2>
      <div className="admin-tabs">
        <span className={isActive("/")} onClick={() => router("/create-new-product")}>Add Home Product</span>
        <span className={isActive("/create-men-product")} onClick={() => router("/create-men-product")}>Add Men Product</span>
        <span className={isActive("/create-women-product")} onClick={() => router("/create-women-product")}>Add Women Product</span>
        <span className={isActive("/create-kids-product")} onClick={() => router("/create-kids-product")}>Add Kids Product</span>
        {!state?.user ? (
          <>
            <span className={isActive("/admin-register")} onClick={() => router("/admin-register")}>Register</span>
            <span className={isActive("/admin-login")} onClick={() => router("/admin-login")}>Login</span>
          </>
        ) : (
          <span onClick={handleAdminLogout}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
