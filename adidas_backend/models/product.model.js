import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: String,
  price: Number,
  category: String,
  category2: String, 
  productcategory: String,
  quantity: Number,
  event: String,
  image: String,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
});

const Product = model("Product", productSchema);
export default Product;
