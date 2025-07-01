import axios from "axios";

const Api = axios.create({
    baseURL: "https://adidas-clone-project.onrender.com/api/v1",
    withCredentials: true,
  });
  
  export default Api;