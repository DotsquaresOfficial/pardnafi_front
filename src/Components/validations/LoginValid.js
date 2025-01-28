import { Emailpattern, Mobilepattern, Passwordpattern } from "../pattern/Pattern"

export const LoginValid = (name, value) => {
   let error = ""
   if (name === "email") {

      if (value === "") {
         error = "This field is required"
         return error
      }
      if (!Emailpattern.test(value)) {
         error = "Please enter  valid email address"
         return error
      }
      return error
   }
   if (name === "password") {

      if (value === "") {
         error = "This field is required"
         return error
      }
      if (!Passwordpattern.test(value)) {
         error = "Password must be at least 8 characters"
         return error
      }

      return error
   }
   if (name === "cPassword") {

      if (value === "") {
         error = "This field is required"
         return error
      }
     

      return error
   }

   if (name === "firstName") {

      if (value === "") {
         error = "This field is required"
         return error
      }

      return error
   }
   if (name === "lastName") {

      if (value === "") {
         error = "This field is required"
         return error
      }

      return error
   }
    if (name === 'contactNumber' && !Mobilepattern.test(value)) {
       error = "Please enter a valid mobile number";
       return error;
     }
}