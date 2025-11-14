import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.createUser = async function(username, password) {
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || "12");
  const hash = await bcrypt.hash(password, saltRounds);
  return this.create({ username, passwordHash: hash });
};

export default mongoose.model("User", userSchema);

