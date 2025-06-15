import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import AdminNavbar from './AdminNavbar';

const AdminRegister = () => {
  const router = useNavigate();
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  function handleChange(event) {
    setAdminData({ ...adminData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (adminData.name && adminData.email && adminData.password) {
        const response = await Api.post("/admin/register-admin", { adminData });
        if (response.data.success) {
          setAdminData({ name: "", email: "", password: "" });
          setErrors([]);
          toast.success(response.data.message);
          router("/admin-login");
        } else {
          // backend might respond with success:false
          toast.error(response.data.error || "Registration failed");
        }
      } else {
        toast.error("All fields are mandatory.");
      }
    } catch (error) {
      // Handle network or server error
      toast.error(
        error?.response?.data?.error || error?.response?.data?.message || "Something went wrong."
      );
    }
  }

  useEffect(() => {
    const errorsArray = [];
    if (!adminData.name) errorsArray.push("Name is required.");
    if (!adminData.email) errorsArray.push("Email is required.");
    if (!adminData.password) errorsArray.push("Password is required.");
    setErrors(errorsArray);
    setDisable(errorsArray.length > 0);
  }, [adminData]);

  return (
    <div>
        <AdminNavbar/>
      <form onSubmit={handleSubmit}>
        <h1>Admin Register</h1>

        <label>Name:</label><br />
        <input
          type='text'
          name='name'
          onChange={handleChange}
          value={adminData.name}
          required
        /><br />

        <label>Email:</label><br />
        <input
          type='email'
          name='email'
          onChange={handleChange}
          value={adminData.email}
          required
        /><br />

        <label>Password:</label><br />
        <input
          type='password'
          name='password'
          onChange={handleChange}
          value={adminData.password}
          required
        /><br />

        <input type='submit' value="Register" disabled={disable} />
      </form>
    </div>
  );
};

export default AdminRegister;
