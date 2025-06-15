import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true // One cart per user
  },
 cartProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  wishlistProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
}, {
  timestamps: true
});

const Cart = model("Cart", cartSchema);

export default Cart;
