export const PdfValid = (name, value) => {
    let error = "";
  
    if (value === "" || value===undefined) {
      error = "This field is required";
      return error;
    }
    if (!value.name.match(/\.(pdf)$/)) {
      error = "Select valid Pdf format";
      return error;
    }
    return error;
  };
  