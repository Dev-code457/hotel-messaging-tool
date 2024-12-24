import { LoginInput } from "@/types";
export const validateLoginInput = ({ email, password }: LoginInput): string | null => {
  if (!email || !password) {
    return "All fields are mandatory.";
  }

  // Email length validation (Example: max 100 characters)
  if (email.length > 100) {
    return "Email must be less than 100 characters.";
  }

  // Password length validation (Example: min 8 characters)
  if (password.length < 8 || password.length > 30) {
    return "Password must be between 8 and 30 characters.";
  }

  return null;
};

export const validateFeedbackInput = (feedback: string) => {
  if (!feedback || typeof feedback !== "string" || feedback.trim() === "") {
    return "Feedback cannot be empty.";
  }

  // Feedback length validation (Example: max 500 characters)
  if (feedback.length > 500) {
    return "Feedback cannot exceed 500 characters.";
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
      errors.push("Phone number must be between 10 and 15 digits.");
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
  }

  if (date !== undefined) {
    if (!date) {
      errors.push("Date is required.");
    }
  }

  if (time !== undefined) {
    if (!time) {
      errors.push("Time is required.");
    }
  }

  return errors;
};

export const validateCustomerPhoneNumber = ({
  phoneNumber,
  name,
  email
}: {
  phoneNumber: string;
  name?: string,
  email?: string,
}): string[] => {
  const errors: string[] = [];

  if (!phoneNumber) {
    errors.push("Phone number is required.");
  } else if (!/^\d{10}$/.test(phoneNumber)) {
    errors.push("Phone number must be a 10-digit number.");
  } else if (phoneNumber.length > 15) {
    errors.push("Phone number must be less than 15 characters.");
  }
  if (name && name.length > 20) {
    errors.push("Name Should Not Be Less Than 20 Characters");
  }
  else if (email && email.length > 100) {
    errors.push("Email must be less than 100 characters.");
  }



  return errors;
};

export const validatePasswordInput = ({
  password,
  newPassword,
}: { password: string; newPassword: string }): string[] => {
  const errors: string[] = [];

  if (!password || typeof password !== "string" || password.trim() === "") {
    errors.push("Current password is required.");
  }

  if (!newPassword || typeof newPassword !== "string" || newPassword.trim() === "") {
    errors.push("New password is required.");
  } else {
    if (newPassword.length < 8 || newPassword.length > 30) {
      errors.push("New password must be between 8 and 30 characters.");
    }

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
  } else if (email.length > 100) {
    errors.push("Email must be less than 100 characters.");
  }

  return errors;
};

export const validatePasswords = (password: string, confirmPassword: string): string[] => {
  const errors: string[] = [];

  if (!password || !confirmPassword) {
    errors.push("Both password fields are required.");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

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
    errors.push("Hotel Name must be at least 3 characters long.");
  } else if (hotelName.length > 100) {
    errors.push("Hotel Name must be less than 100 characters.");
  }

  return errors;
};
