
import { LoginInput } from "@/types";


export const validateLoginInput = ({ email, password }: LoginInput): string | null => {
  if (!email || !password) {
    return "All fields are mandatory."
  }
  return null;
}

export const validateFeedbackInput = (feedback: string) => {
  console.log(feedback);

  if (!feedback || typeof feedback !== "string" || feedback.trim() === "") {
    return "Feedback cannot be empty."
  }

};

export const validateCustomerInput = ({
  hotelName,
  discount,
  phoneNumber,
  address,
  sliderValue,
}: {
  hotelName: string;
  discount: string;
  phoneNumber: string;
  address: string;
  sliderValue: number;
}): string[] => {
  const errors: string[] = [];

  // Check required fields
  if (!hotelName || typeof hotelName !== "string" || hotelName.trim() === "") {
    errors.push("Hotel name is required.");
  } else if (hotelName.length > 100) { // Limit hotel name to 100 characters
    errors.push("Hotel name must be less than 100 characters.");
  }

  if (!discount || typeof discount !== "string" || discount.trim() === "") {
    errors.push("Discount is required.");
  } else if (discount.length > 10) { // Limit discount to 10 characters (e.g., "50% Off")
    errors.push("Discount must be less than 10 characters.");
  }

  if (!phoneNumber || typeof phoneNumber !== "string" || phoneNumber.trim() === "") {
    errors.push("Phone number is required.");
  } else if (!/^\d{10}$/.test(phoneNumber)) { // Ensure phone number is valid (example: 10 digits)
    errors.push("Phone number must be a 10-digit number.");
  } else if (phoneNumber.length > 15) { // Limit phone number to 15 characters
    errors.push("Phone number must be less than 15 characters.");
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    errors.push("Address is required.");
  } else if (address.length > 200) { // Limit address to 200 characters
    errors.push("Address must be less than 200 characters.");
  }

  if (typeof sliderValue !== "number" || sliderValue <= 0) {
    errors.push("Slider value must be a positive number.");
  }

  return errors;
};

export const validateCustomerPhoneNumber = ({

  phoneNumber,

}: {

  phoneNumber: string;

}): string[] => {
  const errors: string[] = [];



  if (!phoneNumber) {
    errors.push("Phone number is required.");
  } else if (!/^\d{10}$/.test(phoneNumber)) { // Ensure phone number is valid (example: 10 digits)
    errors.push("Phone number must be a 10-digit number.");
  } else if (phoneNumber.length > 15) { // Limit phone number to 15 characters
    errors.push("Phone number must be less than 15 characters.");
  }

  return errors;
};



export const validatePasswordInput = ({
  password,
  newPassword,
}:{password: string, newPassword: string}): string[] => {
  const errors: string[] = [];

  // Check if passwords are provided
  if (!password || typeof password !== "string" || password.trim() === "") {
    errors.push("Current password is required.");
  }

  if (!newPassword || typeof newPassword !== "string" || newPassword.trim() === "") {
    errors.push("New password is required.");
  } else {
    // Additional validation for newPassword
    if (newPassword.length < 8 || newPassword.length > 30) {
      errors.push("New password must be between 8 and 30 characters.");
    }

    // Check if newPassword is different from current password
    if (newPassword === password) {
      errors.push("New password must be different from the current password.");
    }
  }

  return errors;
};


export const validateForgot = ({
 email
}:{email: string}): string[] => {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email is required");
  }

  return errors;
};




export const validatePasswords = (password: string, confirmPassword: string): string[] => {
  const errors: string[] = [];

  // Check if passwords are provided
  if (!password || !confirmPassword) {
    errors.push("Both password fields are required.");
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  // You can add more password validations here (length, complexity, etc.)
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return errors;
};


