import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Generate auth token using JWT with an expiry of an hour
const generateAuthToken = (user) => {
  let { id, role } = user;
  let token = jwt.sign(
    {
      id,
      role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export default {
  generateAuthToken,
}