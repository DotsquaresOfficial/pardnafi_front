import { Passwordpattern } from "../pattern/Pattern";

export const ChangePasswordValid = (name, value, nPassword, cPassword) => {
  let error = "";
  if (name === "new_password") {
    if (value === "") {
      error = "This field is required";
      return {name:"new_password",error:error};
    }
    if (!Passwordpattern.test(value)) {
      error =
        "Password must be 8 characters long, contain at least one upper case letter, one lower case letter, one number, and one special character";
        return {name:"new_password",error:error};
    }
    if (cPassword !== "") {
      if (value !== cPassword) {
        error = "Confirm password does't matched";
        return {name:"confirm_new_password",error:error};
      }
    }
    return {name:"new_password",error:error};
  }
  if (name === "confirm_new_password") {
    if (value === "") {
      error = "This field is required";
      return {name:"confirm_new_password",error:error};
    }
    if (nPassword !== "") {
      if (nPassword !== value) {
        error = "Confirm password does't matched";

        return {name:"confirm_new_password",error:error};
      }
    }
    return {name:"confirm_new_password",error:error};
  }

  if (name === "current_password") {
    if (value === "") {
      error = "This field is required";
      return {name:"current_password",error:error};
    }

    return {name:"current_password",error:error};
  }
};
