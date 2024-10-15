import jwt from "jsonwebtoken";

const generateTokens = (id: string) => {
  console.log(id); // Log the id to confirm it's being passed correctly

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }
  
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export default generateTokens;
