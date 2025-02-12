import { Emailpattern, Mobilepattern, Passwordpattern } from "../pattern/Pattern"

export const LoginValid = (name, value) => {

   value = value.trim(); // Remove leading and trailing spaces
   let error = ""
   if (name === "email") {

      if (value === "") {
         error = "Email is required."
         return error
      }
      if (!Emailpattern.test(value)) {
         error = "Please enter valid email address."
         return error
      }
      return error
   }
   if (name === "password") {

      if (value === "") {
         error = "Password is required."
         return error
      }
      if (!Passwordpattern.test(value)) {
         let error = '';

         // Check for minimum length and other requirements  
         if (value.length < 8) {
            error = "Password must be at least 8 characters long.";
         } else if (!/[A-Z]/.test(value)) {
            error = "Password must contain at least one uppercase letter.";
         } else if (!/[a-z]/.test(value)) {
            error = "Password must contain at least one lowercase letter.";
         } else if (!/[0-9]/.test(value)) {
            error = "Password must contain at least one number.";
         } else if (!/[!@#%?^-_/$&*]/.test(value)) {
            error = "Password must contain at least one special character like @, #, %, ?, etc.";
         }

         return error;
      }

      return error
   }
   if (name === "cPassword") {

      if (value === "") {
         error = "Confirm password is required."
         return error
      }
     

      return error
   }

   if (name === "firstName") {

      if (value === "") {
         error = "First name is required."
         return error
      }

      return error
   }
   if (name === "lastName") {

      if (value === "") {
         error = "Last name is required."
         return error
      }

      return error
   }
}

