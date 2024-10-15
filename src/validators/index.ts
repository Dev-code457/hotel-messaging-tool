// validators/loginValidator.ts
import { NextApiRequest } from "next";

export const validateLoginInput = (req: NextApiRequest) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push("Email is required.");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Please provide a valid email.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  return errors;
};
