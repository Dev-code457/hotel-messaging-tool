
import { LoginInput } from "@/types";


export const validateLoginInput = ({ email, password }: LoginInput): string | null => {
  if (!email || !password) {
    return "All fields are mandatory."
  }
  return null;
}

export const validateFeedbackInput = (feedback: string) => {


  if (!feedback || typeof feedback !== "string" || feedback.trim() === "") {
    return "Feedback cannot be empty."
  }

};

export const validateCustomerInput = ({
  ownerHotelName,
  discount,
  phoneNumber,
  address,
  sliderValue,
  date,
  time,
}: {
  ownerHotelName?: string;
  discount?: string;
  phoneNumber?: string;
  address?: string;
  sliderValue?: number;
  date?: string;
  time?: string;
}): string[] => {
  const errors: string[] = [];

  if (ownerHotelName !== undefined) {
    if (!ownerHotelName) {
      errors.push("Hotel name is required.");
    } else if (ownerHotelName.length > 100) {
      errors.push("Hotel name must be less than 100 characters.");
    }
  }

  if (discount !== undefined) {
    if (!discount) {
      errors.push("Discount is required.");
    } else if (discount.length > 10) {
      errors.push("Discount must be less than 10 characters.");
    }
  }

  if (phoneNumber !== undefined) {
    if (!phoneNumber) {
      errors.push("Phone number is required.");
    } else if (!/^\d{10,15}$/.test(phoneNumber)) {
      errors.push("Phone number must be between 10 digits.");
    }
  }

  if (address !== undefined) {
    if (!address) {
      errors.push("Address is required.");
    } else if (address.length > 200) {
      errors.push("Address must be less than 200 characters.");
    }
  }

  if (sliderValue !== undefined) {
    if (typeof sliderValue !== "number" || sliderValue <= 0) {
      errors.push("Slider value must be a positive number.");
    }
    // Optional: Add upper bound for slider value if needed
    // else if (sliderValue > MAX_SLIDER_VALUE) {
    //   errors.push("Slider value must not exceed the maximum limit.");
    // }
  }

  if (date !== undefined) {
    if (!date) {
      errors.push("Date is required.");
    }
    // Optional: Add specific date format validation
    // else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    //   errors.push("Date must be in YYYY-MM-DD format.");
    // }
  }

  if (time !== undefined) {
    if (!time) {
      errors.push("Time is required.");
    }
    // Optional: Add specific time format validation
    // else if (!/^\d{2}:\d{2}$/.test(time)) {
    //   errors.push("Time must be in HH:mm format.");
    // }
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
}: { password: string, newPassword: string }): string[] => {
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
}: { email: string }): string[] => {
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





export const validateHotelDetails = ({

  hotelName,

}: {

  hotelName: string;

}): string[] => {
  const errors: string[] = [];



  if (!hotelName) {
    errors.push("Hotel Name is required.");
  } else if (hotelName.length < 3) {
    errors.push("Hotel Name must be a 3 Characters Long");
  }

  return errors;
};

