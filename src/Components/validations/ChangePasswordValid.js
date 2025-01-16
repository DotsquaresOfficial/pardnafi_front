import { Passwordpattern } from "../pattern/Pattern";

export const ChangePasswordValid = (name, value, nPassword, cPassword) => {
  let error = "";
  if (name === "newPassword") {
    if (value === "") {
      error = "This field is required";
      return {name:"newPassword",error:error};
    }
    if (!Passwordpattern.test(value)) {
      error =
        "Password must be 8 characters long, contain at least one upper case letter, one lower case letter, one number, and one special character";
        return {name:"newPassword",error:error};
    }
    if (cPassword !== "") {
      if (value !== cPassword) {
        error = "Confirm password does't matched";
        return {name:"confirmPassword",error:error};
      }
    }
    return {name:"newPassword",error:error};
  }
  if (name === "confirmPassword") {
    if (value === "") {
      error = "This field is required";
      return {name:"confirmPassword",error:error};
    }
    if (nPassword !== "") {
      if (nPassword !== value) {
        error = "Confirm password does't matched";

        return {name:"confirmPassword",error:error};
      }
    }
    return {name:"confirmPassword",error:error};
  }

  if (name === "currentPassword") {
    if (value === "") {
      error = "This field is required";
      return {name:"currentPassword",error:error};
    }

    return {name:"currentPassword",error:error};
  }
};
