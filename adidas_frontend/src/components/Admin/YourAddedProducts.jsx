import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Api from "../../axiosconfig";
import AdminNavbar from "./AdminNavbar";

function YourAddedProducts() {
  const { state } = useContext(AuthContext);
  const router = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function GetProduct() {
    setLoading(true);
    try {
      const response = await Api.post("/admin/your-added-products", {
        userId: state?.user?.userId,
      });

      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (state?.user) {
      GetProduct();
    }
  }, [state]);

  return (
    <div id="main">
        <AdminNavbar/>
      <h1>Your Added Products</h1>

      {loading ? (
        <div><h2>Loading...</h2></div>
      ) : (
        <div id="allproductsshow" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {allProducts.map((product) => (
            <div key={product._id} id="productshow" style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <p><b>Title</b>: {product.title}</p>
              <p><b>Price</b>: ₹{product.price}</p>
              <p><b>Category</b>: {product.category}</p>
              <p><b>Product Category</b>: {product.productcategory}</p>
              <p><b>Event</b>: {product.event}</p>
              <p><b>Quantity</b>: {product.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourAddedProducts;
