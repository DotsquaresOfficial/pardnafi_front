// const formatFieldName = (name) => {
//     const formatted = name.replace(/([A-Z])/g, " $1").toLowerCase();
//     return formatted?.charAt(0).toUpperCase() + formatted?.slice(1);
// };

// function isValidText(input) {
//     const regex = /^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/;
//     return regex.test(input.trim());
// }

// export const GroupValidation = (name, value) => {
//     let val;
//     String(value).replace(/\s+/g, ' ').trim()

//     val = value ? String(value).trim() : "";
//     const fieldName = formatFieldName(name);


  

//     const number = Number(val);


//     if (!val) {
//         if (name === "name") {
//             return `Group name is required`;


//         }
//         if (name === "contribution") {
//             return `Contribution amount per cycle is required`;


//         } else if (name === "frequency") {
//             return `Payout frequency is required`;

//         } else if (name === "duration") {
//             return `Group duration is required`;

//         } else if (name === "description") {
//             return `Group description is required`;


//         }
//         return `${fieldName} is required`;
//     }



//     // const val = value ? String(value).trim() : ""; // Ensure value is a string

//     // if (!val) {
//     //     if (name === "name") {
//     //         return "Group Name is required";
//     //     }
//     //     return `${name} is required`;
//     // }


//     switch (name) {
//         case "name":
//             return val.length < 3
//                 ? "Group name must be at least 3 characters."
//                 : val.length > 100
//                     ? "Group name cannot exceed 100 characters."
//                     : "";
//         case "groupSize":
//             if (isNaN(number) || typeof number !== "number") {
//                 return "Group size must be a number.";
//             }
//             if (!Number.isInteger(Number(number))) {
//                 return "Group size must be a positive whole number.";
//             }
//             if (number < 5 || number > 20) {
//                 return "Group size must be between 5 and 20.";
//             }
//             return "";

//         case "contribution":
//             return isNaN(value) || value <= 0 ? "Contribution must be a positive number." : "";
//         case "duration":
//             return isNaN(value) || value <= 0 ? "Duration must be a valid number." : "";
//         case "description":
//             return val.length < 10 ? "Group description must be at least 10 characters." : val.length > 1000
//                 ? "Group description cannot exceed 1000 characters."
//                 : "";
//         case "daoDepositSupport":
//             return value !== "yes" && value !== "no" ? "Must be either 'yes' or 'no'" : "";
//         default:
//             return "";
//     }
// };


const formatFieldName = (name) => {
    const formatted = name.replace(/([A-Z])/g, " $1").toLowerCase();
    return formatted?.charAt(0).toUpperCase() + formatted?.slice(1);
};


function isValidText(input) {
    return /^[A-Za-z0-9]+( [A-Za-z0-9]+)*$/.test(input.trim());
}

export const GroupValidation = (name, value) => {
    let val = value ? String(value).trim() : "";
    const fieldName = formatFieldName(name);
    const number = Number(val);


    if (!val) {
        if (name === "name") return "Group name is required";
        if (name === "contribution") return "Contribution amount per cycle is required";
        if (name === "frequency") return "Payout frequency is required";
        if (name === "duration") return "Group duration is required";
        if (name === "description") return "Group description is required";
        return `${fieldName} is required`;
    }

    switch (name) {
        case "name":
            if (!isValidText(val)) return "Group name cannot contain excessive whitespace.";
            return val.length < 3
                ? "Group name must be at least 3 characters."
                : val.length > 100
                    ? "Group name cannot exceed 100 characters."
                    : "";

        case "groupSize":
            if (isNaN(number) || typeof number !== "number") {
                return "Group size must be a number.";
            }
            if (!Number.isInteger(Number(number))) {
                return "Group size must be a positive whole number.";
            }
            if (number < 5 || number > 20) {
                return "Group size must be between 5 and 20.";
            }
            return "";

        case "contribution":
            return isNaN(value) || value <= 0 ? "Contribution must be a positive number." : "";

        case "duration":
            return isNaN(value) || value <= 0 ? "Duration must be a valid number." : "";

        case "description":
            if (!isValidText(val)) return "Group description cannot contain excessive whitespace.";
            return val.length < 10
                ? "Group description must be at least 10 characters."
                : val.length > 1000
                    ? "Group description cannot exceed 1000 characters."
                    : "";

       

        default:
            return "";
    }
};

