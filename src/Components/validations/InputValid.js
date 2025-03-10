
import { Emailpattern, Mobilepattern } from "../pattern/Pattern";
export const InputValid = (name, value) => {

  let error = "";

  if (!value) {
    error = "This field is required";
    return error;
  }
  
 if(name =="name" && value.length<3){
  error="Group name must be between 3 and 50 characters."
  return error
 }
  
  // if (value?.match(/^\s/)) {
  //   error = `Please enter valid ${name} without first space`;
  //   return error;
  // }

  if (name === 'email' && !Emailpattern.test(value)) {
    error = "Please enter a valid email address";
    return error;
  }
  if (name === 'contactNumber' && !Mobilepattern.test(value)) {
    error = "Please enter a valid mobile number";
    return error;
  }


  if (name === 'groupSize') {
    if (value < 5 || value > 20) {
      error = 'Group size must be between 5 and 20 members';
      return error;
    }
  }


  if (name === 'contribution' && value <= 0) {
    error = 'Contribution amount must be greater than 0';
    return error;
  }


  if (name === 'duration' && ![3, 6, 9, 12].includes(parseInt(value))) {
    error = 'Group duration must be 3,6,9 or 12 months';
    return error;
  }
 
  return error;
};
