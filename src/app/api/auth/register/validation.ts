import User, { IUser } from "@/models/User";

export const validateRegistration = async (user: IUser) => {
  const errors = [];

  const requestedUser = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  }).exec();

  if (requestedUser?.username === user.username) {
    errors.push({
      field: "username",
      message: "Username already exists",
    });
  }

  if (requestedUser?.email === user.email) {
    errors.push({
      field: "email",
      message: "Email already exists",
    });
  }

  return { errors };
};
