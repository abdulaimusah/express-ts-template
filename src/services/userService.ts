import User, { IUser } from "../models/User";
import { NotFoundError } from "../utils/errors";

class UserService {
  async findOrCreateUser(rowndUser: any): Promise<IUser> {
    let user = await User.findOne({ rowndId: rowndUser.id });

    if (!user) {
      user = new User({
        rowndId: rowndUser.id,
        email: rowndUser.email,
        firstName: rowndUser.given_name || rowndUser.name,
        lastName: rowndUser.family_name || "",
        profilePicture: rowndUser.picture,
        role: "player",
        isEmailVerified: rowndUser.email_verified,
      });
      await user.save();
    }

    return user;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}

export default new UserService();