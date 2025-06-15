import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import "../Admin/AdminLogin.css"
import AdminNavbar from './AdminNavbar';

const AdminLogin = () => {
const {state,dispatch}=useContext(AuthContext);

    const router=useNavigate();
    const[adminData, setAdminData]=useState({
        email:"",
        password:"",
    });

    console.log(adminData,"adminData");
    function handleChange(event){
        setAdminData({ ...adminData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
          if (adminData.email && adminData.password) {
              const response = await Api.post("/admin/login-admin" , {adminData});
            if (response.data.success) {
              dispatch({ type: "LOGIN", payload: response.data.adminData });
              setAdminData({
                email: "",
                password: "",
              });
              router("/admin-products");
              toast.success(response.data.message);
            } else {
              toast.error(response?.data?.error)
            }
          } else {
            throw Error("All fields are mandatory.");
          }
        } catch (error) {
          console.log(error, "error");  
          toast.error(error?.response?.data?.error);
        }
      }
  return (
    <div>
        <AdminNavbar/>
        <form onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <label>Email:</label><br/>
            <input type='email' name='email' onChange={handleChange} value={adminData.email}/><br/>
            <label>Password:</label><br/>
            <input type='password' name='password' onChange={handleChange} value={adminData.password}/><br/>
            <input style={{width:"80px", height:"30px",marginTop:"10px",fontWeight:"500"}} type='submit' value="Login" />
        </form>
    </div>
  )
}

export default AdminLogin;
