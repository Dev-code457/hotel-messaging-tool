import jwt from "jsonwebtoken"

 const generateToken = ({id}:{id: string}) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  };
export default generateToken;