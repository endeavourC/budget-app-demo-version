import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const User = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 255,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 255,
    },
  },
  { timestamps: true }
);

User.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

User.methods.validatePassword = async function validatePassword(data: string) {
  return bcrypt.compare(data, this.password);
};

export default mongoose.models.User || mongoose.model("User", User);
