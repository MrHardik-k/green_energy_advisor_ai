import UserCreds from "../models/user.model.js";
import admin from "../config/auth.js";

export const registerUser = async (req, res) => {
  const { token } = req.body;
  try {
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // const { uid, name, email, picture } = decodedToken;
    const { uid, name, email, picture } = req.body;
    let user;
    try {
      user = await UserCreds.findOne({ uid });
    } catch (error) {
      console.log(error);
    }

    if (!user) {
      // If user does not exist, create a new one
      user = new UserCreds({
        uid,
        name,
        email,
        photoURL: picture,
      });

      await user.save();
      console.log("New user created:", user);
    } else {
      console.log("User already exists:", user);
    }
    // You can save the user to your database here (if needed)
    res.status(200).json({ message: "User verified", uid });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
