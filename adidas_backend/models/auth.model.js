import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: { type: String }, // Optional for OAuth users
});

const User = model("Users", userSchema);
export default User;
