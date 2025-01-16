export const VideoValid = (name, value) => {
    let error = "";
  
    if (value === "" || value===undefined) {
      error = "This field is required";
      return error;
    }
    if (!value.name.match(/\.(mp4)$/)) {
      error = "Select valid vedio format";
      return error;
    }
    return error;
  };
  