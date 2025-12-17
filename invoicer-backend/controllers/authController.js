import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save user
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 4. Respond to frontend
    res.status(201).json({
      message: "Signup successful"
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
