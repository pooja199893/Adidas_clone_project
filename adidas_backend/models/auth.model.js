import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: { type: String }, // Optional for OAuth users
  provider: { type: String, default: 'local' }, // 'google', 'facebook', 'apple', or 'local'
  providerId: { type: String, unique: true, sparse: true }, // OAuth provider user id
  photo: String,
});

const User = model("Users", userSchema);
export default User;
