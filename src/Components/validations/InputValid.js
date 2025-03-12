
import { Emailpattern, Mobilepattern } from "../pattern/Pattern";

export const InputValid = (name, value) => {
  let error = "";
  const formattedName = name
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());

  if (!value) {
    error = `${formattedName} is required`;
    return error;
  }


  if (name === "firstName" && value.length < 3) {
    error = "First name must be between 3 and 50 characters.";
    return error;
  }
  if (name === "contactNumber") {
    if (!Mobilepattern.test(value)) {
      error = "Please enter a valid contact number.";
      return error;
    }
  }
  if (name === "email" && !Emailpattern.test(value)) {
    error = "Please enter a valid email address.";
    return error;
  }


  if (name === "message") {
    if (value.length < 10 || value.length > 500) {
        error = "Message must be between 10 and 500 characters.";
        return error;
    }
}


  if (name === "name" && value.length < 3) {
    error = "Group name must be between 3 and 50 characters.";
    return error;
  }



  if (name === "groupSize") {
    if (value < 5 || value > 20) {
      error = "Group size must be between 5 and 20 members.";
      return error;
    }
  }

  if (name === "contribution") {
    if (value <= 0) {
      error = "Contribution amount must be greater than 0.";
      return error;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      error = "Contribution must be a number with up to 2 decimal places.";
      return error;
    }
  }

  if (name === "duration") {
    if (![3, 6, 9, 12].includes(parseInt(value))) {
      error = "Group duration must be 3, 6, 9, or 12 months.";
      return error;
    }
  }

  return error;
};

