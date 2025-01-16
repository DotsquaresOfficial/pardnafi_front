export const ImageValid = (name, value) => {
  console.log(name,value);
  let error = "";

  if (value === "" || value===undefined) {
    error = "This field is required";
    return error;
  }
  if (!value.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    error = "Select valid image format";
    return error;
  }
  return error;
};
