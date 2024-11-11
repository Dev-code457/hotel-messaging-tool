import jwt from "jsonwebtoken";

const generateTokens = (params: any) => {

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }
  
  return jwt.sign({ params }, secret, { expiresIn: "7d" });
};

export default generateTokens;
