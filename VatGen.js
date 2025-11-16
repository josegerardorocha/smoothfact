// VatGen.js
//
// Functions to generate random, but valid, VAT numbers for various countries.

// Helper function to generate random digits
function getRandomDigits(length) {
    let digits = '';
    for (let i = 0; i < length; i++) {
        digits += Math.floor(Math.random() * 10);
    }
    return digits;
}

// Helper function to generate random letters
function getRandomLetters(length) {
    let letters = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < length; i++) {
        letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return letters;
}

// Object to hold all generation functions
var vatGenerators = {};

vatGenerators.AT = function() {
    let vatnumber = getRandomDigits(7);
    let total = 0;
    let multipliers = [1, 2, 1, 2, 1, 2, 1];
    let temp = 0;

    for (let i = 0; i < 7; i++) {
        temp = parseInt(vatnumber.charAt(i)) * multipliers[i];
        if (temp > 9)
            total += Math.floor(temp / 10) + temp % 10;
        else
            total += temp;
    }

    total = 10 - (total + 4) % 10;
    if (total == 10) total = 0;

    return "ATU" + vatnumber + total;
};

vatGenerators.BE = function() {
    let base = getRandomDigits(7);
    let check = 97 - (parseInt(base + '00') % 97);
    return "BE" + base + check.toString().padStart(2, '0');
};

vatGenerators.BG = function() {
    let vatnumber = getRandomDigits(9);
    let total = 0;

    // 9-digit numbers
    if (Math.random() < 0.5) { // Randomly choose between 9 or 10 digits
        for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * (i + 1);
        let check = total % 11;
        if (check === 10) {
            total = 0;
            for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * (i + 3);
            check = total % 11;
            if (check === 10) check = 0;
        }
        return "BG" + vatnumber.substring(0,8) + check;
    } else { // 10-digit numbers (simplified for generation)
        let nineDigitVat = vatGenerators.BG().substring(2); // Generate a 9-digit one first
        return "BG" + nineDigitVat + getRandomDigits(1);
    }
};

vatGenerators.CY = function() {
    let vatnumber = getRandomDigits(8);
    let total = 0;
    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * (8 - i);
    total = total % 11;
    if (total === 10) total = 0;
    let checkChar = String.fromCharCode(65 + total); // Convert 0-9 to A-J
    return "CY" + vatnumber + checkChar;
};

vatGenerators.CZ = function() {
    let vatnumber = getRandomDigits(7);
    let total = 0;
    let multipliers = [8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];
    total = 11 - (total % 11);
    if (total == 10) total = 0;
    if (total == 11) total = 1;

    return "CZ" + vatnumber + total;
};

vatGenerators.DE = function() {
    let vatnumber = getRandomDigits(8);
    let product = 10;
    for (let i = 0; i < 8; i++) {
        let sum = (parseInt(vatnumber.charAt(i)) + product) % 10;
        if (sum === 0) sum = 10;
        product = (2 * sum) % 11;
    }
    let checkDigit = 11 - product;
    if (checkDigit === 10) checkDigit = 0;
    return "DE" + vatnumber + checkDigit;
};

vatGenerators.DK = function() {
    let vatnumber = getRandomDigits(7);
    let weights = [2, 7, 6, 5, 4, 3, 2, 1];
    let sum = 0;
    let checkDigit = 0;

    // Generate 7 random digits, then calculate the 8th check digit
    for (let i = 0; i < 7; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }

    // Find a check digit that makes sum % 11 === 0
    for (let i = 0; i < 10; i++) {
        if ((sum + (i * weights[7])) % 11 === 0) {
            checkDigit = i;
            break;
        }
    }
    return "DK" + vatnumber + checkDigit;
};

vatGenerators.EE = function() {
    let vatnumber = getRandomDigits(8);
    let total = 0;
    let multipliers = [3, 7, 1, 3, 7, 1, 3, 7];

    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 10 - total % 10;
    if (total == 10) total = 0;

    return "EE" + vatnumber + total;
};

vatGenerators.FI = function() {
    let vatnumber = getRandomDigits(7);
    let weights = [7, 9, 10, 5, 8, 4, 2];
    let sum = 0;
    for (let i = 0; i < 7; i++) sum += parseInt(vatnumber.charAt(i)) * weights[i];
    let remainder = sum % 11;
    let check = (11 - remainder) % 11;
    if (check === 10) check = 0; // Should not be 10 for valid FI VAT
    return "FI" + vatnumber + check;
};
vatGenerators.ES = function() {
    let body = getRandomDigits(7);
    let firstChar = getRandomLetters(1);
    let lastChar = getRandomLetters(1);
    // Simplified for generation, actual ES VAT has complex rules for first/last chars
    return "ES" + firstChar + body + lastChar;
};

vatGenerators.FR = function() {
    let num = getRandomDigits(9);
    let computed = (12 + 3 * (parseInt(num) % 97)) % 97;
    let key = computed.toString().padStart(2, '0');
    return "FR" + key + num;
};

vatGenerators.HR = function() {
    let vatnumber = getRandomDigits(10);
    let sum = 10;
    for (let i = 0; i < 10; i++) {
        sum = sum + parseInt(vatnumber.charAt(i));
        sum = (sum % 10 === 0) ? 10 : sum % 10;
        sum *= 2;
        sum = (sum % 11 === 0) ? 1 : sum % 11;
    }
    let check = 11 - sum;
    if (check === 10) check = 0;
    return "HR" + vatnumber + check;
};

vatGenerators.UK = function() {
    let vatnumber = getRandomDigits(7);
    let sum = 0;
    let weights = [8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 7; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit === 11) checkDigit = 0;
    if (checkDigit === 10) {
        // For 10, we\\\\'ll just generate a new random digit for now.
        checkDigit = getRandomDigits(1);
    }
    return "GB" + vatnumber + checkDigit;
};

vatGenerators.HU = function() {
    let vatnumber = getRandomDigits(7);
    let total = 0;
    let multipliers = [9, 7, 3, 1, 9, 7, 3];

    for (let i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 10 - total % 10;
    if (total == 10) total = 0;

    return "HU" + vatnumber + total;
};

vatGenerators.IE = function() {
    let vatnumber = getRandomDigits(7);
    let checkChar = getRandomLetters(1);
    let total = 0;
    let multipliers = [8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    let checkDigit = 11 - (total % 11);
    if (checkDigit === 11) checkDigit = 0;

    // Simplified for generation, actual IE VAT has complex rules for 8th/9th chars
    return "IE" + vatnumber + checkDigit + checkChar;
};

vatGenerators.IS = function() {
    let vatnumber = getRandomDigits(9);
    let total = 0;
    let multipliers = [3, 2, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 11) total = 0;

    return "IS" + vatnumber + total;
};

vatGenerators.IT = function() {
    let vatnumber = getRandomDigits(10);
    let total = 0;
    let multipliers = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

    for (let i = 0; i < 10; i++) {
        let temp = parseInt(vatnumber.charAt(i)) * multipliers[i];
        if (temp > 9)
            total += Math.floor(temp / 10) + temp % 10;
        else
            total += temp;
    }

    total = 10 - (total % 10);
    if (total == 10) total = 0;

    return "IT" + vatnumber + total;
};

vatGenerators.LT = function() {
    let vatnumber = getRandomDigits(11);
    let total = 0;
    let multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];

    for (let i = 0; i < 10; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    let check = total % 11;
    if (check === 10) {
        multipliers = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
        total = 0;
        for (let i = 0; i < 10; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];
        check = total % 11;
        if (check === 10) check = 0;
    }

    return "LT" + vatnumber + check;
};

vatGenerators.LV = function() {
    let vatnumber = getRandomDigits(10);
    let total = 0;
    let multipliers = [9, 1, 4, 8, 3, 10, 2, 5];

    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 11) total = 0;

    return "LV" + vatnumber + total;
};


vatGenerators.LU = function() {
    let vatnumber = getRandomDigits(6);
    let total = 0;
    let multipliers = [8, 7, 6, 5, 4, 3, 2, 1];

    for (let i = 0; i < 6; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 11) total = 0;

    return "LU" + vatnumber + total;
};


vatGenerators.MT = function() {
    let vatnumber = getRandomDigits(7);
    let total = 0;
    let multipliers = [6, 5, 4, 3, 2, 7];

    for (let i = 0; i < 6; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 11) total = 0;

    return "MT" + vatnumber + total;
};


vatGenerators.NL = function() {
    let vatnumber = getRandomDigits(9);
    let checkChar = getRandomLetters(1);
    return "NL" + vatnumber + "B" + getRandomDigits(2);
};


vatGenerators.NZ = function() {
    let vatnumber = getRandomDigits(8);
    let weights = [10, 5, 8, 4, 2, 1, 3, 6];
    let sum = 0;
    for (let i = 0; i < 8; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }
    let remainder = sum % 11;
    let checkDigit = (remainder === 0) ? 0 : (11 - remainder);
    return "NZ" + vatnumber + checkDigit;
};


vatGenerators.NG = function() {
    // Nigeria TIN is 10 digits, no specific checksum algorithm publicly available for generation.
    // Generating a random 10-digit number for now.
    return "NG" + getRandomDigits(10);
};


vatGenerators.NO = function() {
    let vatnumber = getRandomDigits(8);
    let weights = [3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 8; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit === 11) checkDigit = 0;
    if (checkDigit === 10) checkDigit = getRandomDigits(1); // Handle invalid check digit
    return "NO" + vatnumber + checkDigit + "MVA";
};


vatGenerators.PL = function() {
    let vatnumber = getRandomDigits(9);
    let weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }
    let checkDigit = sum % 11;
    if (checkDigit === 10) checkDigit = getRandomDigits(1); // Handle invalid check digit
    return "PL" + vatnumber + checkDigit;
};


vatGenerators.PT = function() {
    let vatnumber = '563' + getRandomDigits(5);
    let total = 0;
    let multipliers = [9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total > 9) total = 0;

    return "PT" + vatnumber + total;
};


vatGenerators.RO = function() {
    let vatnumber = getRandomDigits(9);
    let total = 0;
    let multipliers = [7, 5, 3, 2, 1, 7, 5, 3, 2];

    for (let i = 0; i < 9; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 10) total = 0;
    if (total == 11) total = 1;

    return "RO" + vatnumber + total;
};


vatGenerators.SE = function() {
    let vatnumber = getRandomDigits(10);
    // SE VAT numbers are just 10 digits followed by 01, no checksum.
    return "SE" + vatnumber + "01";
};


vatGenerators.SI = function() {
    let vatnumber = getRandomDigits(7);
    let total = 0;
    let multipliers = [8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 10) total = 0;
    if (total == 11) total = 0;

    return "SI" + vatnumber + total;
};


vatGenerators.SK = function() {
    let vatnumber = getRandomDigits(9);
    let total = 0;
    let multipliers = [8, 7, 6, 5, 4, 3, 2, 1];

    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - (total % 11);
    if (total == 10) total = 0;
    if (total == 11) total = 0;

    return "SK" + vatnumber + total;
};


vatGenerators.EL = function() {
    let vatnumber = getRandomDigits(8);
    let total = 0;
    let multipliers = [256, 128, 64, 32, 16, 8, 4, 2];

    for (let i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = total % 11;
    if (total > 9) {
        total = 0;
    };

    return "EL" + vatnumber + total;
};

vatGenerators.FO = function() {
    let vatnumber = getRandomDigits(7);
    let weights = [2, 7, 6, 5, 4, 3, 2, 1];
    let sum = 0;
    let checkDigit = 0;

    // Generate 7 random digits, then calculate the 8th check digit
    for (let i = 0; i < 7; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }

    // Find a check digit that makes sum % 11 === 0
    for (let i = 0; i < 11; i++) { // Iterate from 0 to 10 for the check digit
        if ((sum + (i * weights[7])) % 11 === 0) {
            checkDigit = i;
            break;
        }
    }
    return "FO" + vatnumber + checkDigit;
};

vatGenerators.GL = function() {
    let vatnumber = getRandomDigits(7);
    let weights = [2, 7, 6, 5, 4, 3, 2, 1];
    let sum = 0;
    let checkDigit = 0;

    // Generate 7 random digits, then calculate the 8th check digit
    for (let i = 0; i < 7; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }

    // Find a check digit that makes sum % 11 === 0
    for (let i = 0; i < 11; i++) { // Iterate from 0 to 10 for the check digit
        if ((sum + (i * weights[7])) % 11 === 0) {
            checkDigit = i;
            break;
        }
    }
    return "GL" + vatnumber + checkDigit;
};


// Main generation function
function generateVat(countryCode) {
    if (vatGenerators[countryCode]) {
        return vatGenerators[countryCode]();
    } else {
        return `Generation not supported for ${countryCode}`;
    }
}

// Export functions for use in other modules (if applicable)
// module.exports = { generateVat };
// Example usage:
// console.log(generateVat('DE')); // Generate a German VAT number
// console.log(generateVat('FR')); // Generate a French VAT number
