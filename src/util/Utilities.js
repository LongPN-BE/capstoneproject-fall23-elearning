import moment from "moment";

export const sortByID = (array) => {
    console.log(array);
    // Check if the array is not empty
    if (array.length === 0) {
        console.error("Invalid input. Please provide a non-empty array.");
        return [];
    }

    // Use the sort method to sort the array by the "id" property
    const sortedArray = array.slice().sort((a, b) => a.id - b.id);

    return sortedArray;
};

export const validateInputString = (...inputs) => {
    for (const input of inputs) {
        if (typeof input !== 'string') {
            return false; // Not a string
        }

        // Additional validation logic for strings can be added here

        // Example: Check if the string has a minimum length of 3 characters
        if (input.trim() === '') {
            return false;
        }
    }

    return true; // All inputs are valid strings
};


export const validateInputDigits = (...inputs) => {
    console.log(inputs);
    for (const input of inputs) {
        // Additional validation logic for strings can be added here

        // Example: Check if the string has a minimum length of 3 characters
        if (parseInt(input) <= 0 || !validateInputString(...inputs)) {
            return false;
        }
    }

    return true; // All inputs are valid strings
};

export const calDateRange = (dateRange) => {
    const arr = dateRange.split('---')
    // Your two date strings
    const startDateString = arr[0];
    const endDateString = arr[1];

    // Creating moment objects from the date strings
    const startDate = moment(startDateString);
    const endDate = moment(endDateString);

    // Calculating the duration between the two dates
    return moment.duration(endDate.diff(startDate));
}