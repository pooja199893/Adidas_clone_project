import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import AdminNavbar from './AdminNavbar';

const CreateCategoryProduct = ({ categoryLabel="Home" }) => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();

  // State to hold product data
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: categoryLabel, // Default category based on the label passed
    category2: "",
    productcategory: "",
    quantity: "",
    event: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  // Handle changes in the form fields
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...productData,
        category: categoryLabel, // Override category with the label passed
      };

      // Make the API call to create the product
      const response = await Api.post("/product/create-new-product", {
        productData: dataToSend,
        userId: state?.user?.userId,
      });

      // Handle response from the API
      if (response.data.success) {
        toast.success(response.data.message);
        setProductData({
          title: "",
          price: "",
          category: categoryLabel, // Reset category to initial label
          category2: "",
          productcategory: "",
          quantity: "",
          event: "",
          image: "",
        });
        router("/admin-products"); // Redirect to another page
      } else {
        toast.error(response.data.error); // Show error message if the product couldn't be created
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  // Validate the form inputs
  useEffect(() => {
    const errs = [];
    if (!productData.title) errs.push("Title is required.");
    if (!productData.price) errs.push("Price is required.");
    if (!productData.category) errs.push("Category is required.");
    if (!productData.category2) errs.push("Category2 is required.");
    if (!productData.productcategory) errs.push("Product category is required.");
    if (!productData.quantity) errs.push("Quantity is required.");
    if (!productData.event) errs.push("Event is required.");
    if (!productData.image) errs.push("Image URL is required.");
    setErrors(errs);
    setDisable(errs.length > 0); // Disable submit button if there are errors
  }, [productData]);

  return (
    <div>
      <AdminNavbar />
      <form onSubmit={handleSubmit}>
        <h2>Create {categoryLabel} Product</h2>

        {/* Title input */}
        <label>Title:</label><br />
        <input type="text" name="title" value={productData.title} onChange={handleChange} /><br />

        {/* Price input */}
        <label>Price:</label><br />
        <input type="number" name="price" value={productData.price} onChange={handleChange} /><br />

        {/* Category input */}
        <label>Category:</label><br />
        <input
          type="text"
          name="category"
          value={productData.category}
        /><br />

        {/* Category2 input */}
        <label>Category2:</label><br />
        <input
          type="text"
          name="category2"
          value={productData.category2}
          onChange={handleChange}
        /><br />

        {/* Product Category input */}
        <label>Product Category:</label><br />
        <input
          type="text"
          name="productcategory"
          value={productData.productcategory}
          onChange={handleChange}
        /><br />

        {/* Quantity input */}
        <label>Quantity:</label><br />
        <input
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
        /><br />

        {/* Event input */}
        <label>Event:</label><br />
        <input
          type="text"
          name="event"
          value={productData.event}
          onChange={handleChange}
        /><br />

        {/* Image URL input */}
        <label>Image URL:</label><br />
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
        /><br />

        {/* Display errors */}
        {errors.map((err, i) => (
          <p key={i} style={{ color: "red", fontSize: "14px" }}>{err}</p>
        ))}

        {/* Submit button */}
        <input type="submit" value="Add Product" disabled={disable} />
      </form>
    </div>
  );
};

export default CreateCategoryProduct;
