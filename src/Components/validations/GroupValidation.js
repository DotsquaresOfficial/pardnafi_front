

const formatFieldName = (name) => {
    const formatted = name.replace(/([A-Z])/g, " $1").toLowerCase();
    return formatted?.charAt(0).toUpperCase() + formatted?.slice(1);
};


function isValidText(input) {
    return /^(?!\s)(?:[A-Za-z0-9.,!?()'"\-@~#$%^`&*_+=/|\\{}\[\]":;]+(?:\s+[A-Za-z0-9.,!?()'"\-@~#$%^`&*_+=/|\\{}\[\]":;]+)*)(?<!\s)$/.test(input);
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
            const numStr = String(number).trim(); // Convert to string & trim spaces

            // Regex to allow only whole numbers (no decimals)
            if (!/^\d+$/.test(numStr)) {
                return "Group size must be a positive whole number.";
            }
            const num = Number(numStr);

            // Enforce range 5 to 20
            if (num < 5 || num > 20) {
                return "Group size must be between 5 and 20.";
            }

            return ""; 

        case "contribution":
            return isNaN(value) || value <= 0 ? "Contribution must be a positive number." : "";

        case "duration":
            return isNaN(value) || value <= 0 ? "Duration must be a valid number." : "";

        case "description":
            if (!isValidText(val)) return "Group description cannot contain excessive whitespace.";
            return value.length < 10
                ? "Group description must be at least 10 characters."
                : value.length > 1000
                    ? "Group description cannot exceed 1000 characters."
                    : "";



        default:
            return "";
    }
};

