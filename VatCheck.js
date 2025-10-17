// var vatPatterns = {
//     "AT": /^ATU\d{8}$/,
//     "BE": /^BE0?\d{9}$/,
//     "BG": /^BG\d{9,10}$/,
//     "CY": /^CY\d{8}[A-Z]$/,
//     "CZ": /^CZ\d{8,10}$/,
//     "DE": /^DE\d{9}$/,
//     "DK": /^DK\d{8}$/,
//     "EE": /^EE\d{9}$/,
//     "EL": /^EL\d{9}$/, // Greece uses EL, not GR
//     "ES": /^ES[A-Z0-9]\d{7}[A-Z0-9]$/,
//     "FI": /^FI\d{8}$/,
//     "FR": /^FR[A-HJ-NP-Z0-9]{2}\d{9}$/,
//     "HR": /^HR\d{11}$/,                     // missing checksum
//     "HU": /^HU\d{8}$/,
//     "IE": /^IE\d{7}[A-W][A-I]?$/,
//     "IT": /^IT\d{11}$/,
//     "LT": /^LT(\d{9}|\d{12})$/,
//     "LU": /^LU\d{8}$/,
//     "LV": /^LV\d{11}$/,
//     "MT": /^MT\d{8}$/,
//     "NL": /^NL\d{9}B\d{2}$/,
//     "PL": /^PL\d{10}$/,
//     "PT": /^PT\d{9}$/,
//     "RO": /^RO\d{2,10}$/,
//     "SE": /^SE\d{10}01$/,
//     "SI": /^SI\d{8}$/,
//     "SK": /^SK\d{10}$/,
//     "GB": /^(GB)?(\d{9}|\d{12}|GD\d{3}|HA\d{3})$/, // Great Britain (Standard, Branches, Government, Health Authority)
//     "IS": /^IS\d{10}$/, // Iceland - Format: IS########## (10 digits)
//     "FO": /^FO\d{8}$/, // Faroe Islands - Format: FO######## (8 digits)
//     "GL": /^GL\d{8}$/, // Greenland - Format: GL######## (8 digits)
//     "NO": /^NO\d{9}MVA$/,
//     "NZ": /^NZ\d{9}$/, // New Zealand - Format: NZ######### (9 digits)
//     "NG": /^NG\d{8}-\d{4}$/ // Nigeria - Format: NG########-#### (12 digits with hyphen)
// }
//
// // ----------- FORMAT VALIDATION -----------
// function isVatFormatValid(vat) {
//     if (!vat || vat.length < 4)
//         return false
//     var prefix = vat.substring(0, 2).toUpperCase()
//     var pattern = vatPatterns[prefix]
//     if (!pattern)
//         return false
//     return pattern.test(vat)
// }

// ----------- CHECKSUM VALIDATION -----------
var ChecksumValid = {};

// 🇩🇪 Germany (DE): 9 digits, ISO 7064 MOD 97-10
ChecksumValid.DE = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{9}$/.test(digits))
        return false

    var product = 10
    for (var i = 0; i < 8; i++) {
        var sum = (parseInt(digits[i]) + product) % 10
        if (sum === 0)
            sum = 10
        product = (2 * sum) % 11
    }
    var checkDigit = 11 - product
    if (checkDigit === 10)
        checkDigit = 0
    return checkDigit === parseInt(digits[8])
}

// 🇫🇷 France (FR): 2 control chars (alphanumeric), 9 digits
ChecksumValid.FR = function(vat) {
    var key = vat.substring(2, 4)
    var num = vat.substring(4)
    if (!/^\d{9}$/.test(num))
        return false

    var computed = (12 + 3 * (parseInt(num) % 97)) % 97
    if (/^\d{2}$/.test(key))
        return parseInt(key) === computed
    else
        return true // letter keys not algorithmic
}

// 🇪🇸 Spain (ES): one letter, 7 digits, one letter or digit
ChecksumValid.ES = function esChecksumValid(vat) {
    var body = vat.substring(2)
    if (!/^[A-Z0-9]\d{7}[A-Z0-9]$/.test(body))
        return false

    var controlChars = "TRWAGMYFPDXBNJZSQVHLCKE"
    var first = body[0]
    var last = body[8]
    var number = parseInt(body.substring(1, 8))

    if (/[A-Z]/.test(first)) {
        var expected = controlChars[number % 23]
        return last === expected
    }
    return true // fallback
}

// 🇮🇹 Italy (IT): 11 digits, last is checksum
ChecksumValid.IT = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{11}$/.test(digits))
        return false

    var sum = 0
    for (var i = 0; i < 10; i++) {
        var n = parseInt(digits[i])
        if ((i + 1) % 2 === 0) {
            n = 2 * n
            if (n > 9) n = n - 9
        }
        sum += n
    }
    var check = (10 - (sum % 10)) % 10
    return check === parseInt(digits[10])
}

// 🇳🇱 Netherlands (NL): 9 digits + "B" + 2 digits; mod 11 on first 9 digits
ChecksumValid.NL = function(vat) {
    var mainPart = vat.substring(2, 11)
    if (!/^\d{9}$/.test(mainPart))
        return false

    var sum = 0
    for (var i = 0; i < 8; i++)
        sum += (9 - i) * parseInt(mainPart[i])
    sum += -1 * parseInt(mainPart[8])
    return sum % 11 === 0
}

// 🇵🇱 Poland (PL): 10 digits, weighted mod 11
ChecksumValid.PL = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{10}$/.test(digits))
        return false

    var weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]
    var sum = 0
    for (var i = 0; i < 9; i++)
        sum += parseInt(digits[i]) * weights[i]
    var check = sum % 11
    if (check === 10)
        return false
    return check === parseInt(digits[9])
}

// 🇸🇪 Sweden (SE): 10 digits + "01"; Luhn checksum on first 10 digits
ChecksumValid.SE = function(vat) {
    var digits = vat.substring(2, 12) // ignore final "01"
    if (!/^\d{10}$/.test(digits))
        return false

    var sum = 0
    for (var i = 0; i < 10; i++) {
        var n = parseInt(digits[i])
        if (i % 2 === 0) { // double every other digit
            n = n * 2
            if (n > 9) n -= 9
        }
        sum += n
    }
    return sum % 10 === 0
}

// 🇩🇰 Denmark (DK): 8 digits, weighted mod 11
ChecksumValid.DK = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{8}$/.test(digits))
        return false

    var weights = [2, 7, 6, 5, 4, 3, 2, 1]
    var sum = 0
    for (var i = 0; i < 8; i++)
        sum += parseInt(digits[i]) * weights[i]
    return sum % 11 === 0
}

// 🇫🇮 Finland (FI): 8 digits, last is mod 11 checksum
ChecksumValid.FI = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{8}$/.test(digits))
        return false

    var weights = [7, 9, 10, 5, 8, 4, 2]
    var sum = 0
    for (var i = 0; i < 7; i++)
        sum += parseInt(digits[i]) * weights[i]
    var remainder = sum % 11
    if (remainder === 1)
        return false
    var check = (11 - remainder) % 11
    if (check === 10)
        check = 0
    return check === parseInt(digits[7])
}

// 🇳🇴 Norway (NO): 9 digits + "MVA", mod 11 checksum
ChecksumValid.NO = function(vat) {
    var digits = vat.substring(2, 11)
    if (!/^\d{9}$/.test(digits))
        return false

    var weights = [3, 2, 7, 6, 5, 4, 3, 2]
    var sum = 0
    for (var i = 0; i < 8; i++)
        sum += parseInt(digits[i]) * weights[i]
    var remainder = sum % 11
    var check = 11 - remainder
    if (check === 11)
        check = 0
    if (check === 10)
        return false
    return check === parseInt(digits[8])
}

// 🇮🇸 Iceland (IS): 10 digits, mod 11 checksum
ChecksumValid.IS = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{10}$/.test(digits))
        return false

    var weights = [3, 2, 7, 6, 5, 4, 3, 2, 1]
    var sum = 0
    for (var i = 0; i < 9; i++)
        sum += parseInt(digits[i]) * weights[i]

    var remainder = sum % 11
    var check = (11 - remainder) % 11
    if (check === 10)
        return false
    return check === parseInt(digits[9])
}

// 🇫🇴 Faroe Islands (FO): 8 digits, mod 11 checksum (same as Denmark)
ChecksumValid.FO = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{8}$/.test(digits))
        return false

    var weights = [2, 7, 6, 5, 4, 3, 2, 1]
    var sum = 0
    for (var i = 0; i < 8; i++)
        sum += parseInt(digits[i]) * weights[i]
    return sum % 11 === 0
}

// 🇬🇱 Greenland (GL): 8 digits, mod 11 checksum (same as Denmark)
ChecksumValid.GL = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{8}$/.test(digits))
        return false

    var weights = [2, 7, 6, 5, 4, 3, 2, 1]
    var sum = 0
    for (var i = 0; i < 8; i++)
        sum += parseInt(digits[i]) * weights[i]
    return sum % 11 === 0
}

ChecksumValid.HR = function(vat) {
    // Must start with "HR" and have 11 digits after
    if (!/^HR\d{11}$/.test(vat)) return false;

    const vatnumber = vat.slice(2); // remove "HR"
    const digits = vatnumber.slice(0, 10);
    const checkDigit = parseInt(vatnumber.charAt(10));

    let sum = 10;
    for (let i = 0; i < 10; i++) {
        sum = sum + parseInt(digits.charAt(i));
        sum = (sum % 10 === 0) ? 10 : sum % 10;
        sum *= 2;
        sum = (sum % 11 === 0) ? 1 : sum % 11;
    }

    let computedCheck = 11 - sum;
    if (computedCheck === 10) computedCheck = 0;

    return computedCheck === checkDigit;
}

ChecksumValid.SK = function(vat) {
    // Must start with "SK" and have 10 digits after
    if (!/^SK\d{10}$/.test(vat)) return false;

    const vatnumber = vat.slice(2); // remove "SK"
    const digits = vatnumber.slice(0, 9);
    const checkDigit = parseInt(vatnumber.charAt(9));

    let total = 0;
    const multipliers = [8, 7, 6, 5, 4, 3, 2, 1];

    for (let i = 0; i < 8; i++) {
        total += parseInt(digits.charAt(i)) * multipliers[i];
    }

    total = 11 - (total % 11);
    if (total === 10 || total === 11) total = 0;

    return total === checkDigit;
}
// 🇧🇪 Belgium (BE): 10 digits, mod 97 checksum
ChecksumValid.BE = function(vat) {
    var digits = vat.substring(2)
    digits = digits.replace(/^0/, "") // remove leading zero if present
    if (!/^\d{9,10}$/.test(digits))
        return false

    var base = parseInt(digits.slice(0, -2))
    var check = parseInt(digits.slice(-2))
    var remainder = base % 97
    var expected = 97 - remainder
    if (expected === 0) expected = 97
    return check === expected
}

// 🇦🇹 Austria (AT): 9 digits, Luhn algorithm
ChecksumValid.AT = function(vat) {
    // Checks the check digits of an Austrian VAT number.
    var total = 0;
    var multipliers = [1,2,1,2,1,2,1];
    var temp = 0;
    var vatnumber = vat.substring(3); // Remove 'ATU'

    // Extract the next digit and multiply by the appropriate multiplier.
    for (var i = 0; i < 7; i++) {
        temp = parseInt(vatnumber.charAt(i)) * multipliers[i];
        if (temp > 9)
            total += Math.floor(temp/10) + temp%10
        else
            total += temp;
    }

    // Establish check digit.
    total = 10 - (total+4) % 10;
    if (total == 10) total = 0;

    // Compare it with the last character of the VAT number. If it's the same, then it's valid.
    if (total === parseInt(vatnumber.slice (7,8)))
        return true
    else
        return false;
}

// 🇧🇬 Bulgaria (BG): 9 or 10 digits, various checksums
ChecksumValid.BG = function(vat) {
    var vatnumber = vat.substring(2);

    if (vatnumber.length === 9) {
        // Check the check digit of 9 digit Bulgarian VAT numbers.
        var total = 0;
        var temp = 0;
        for (var i = 0; i < 8; i++) temp += parseInt(vatnumber.charAt(i)) * (i + 1);

        total = temp % 11;
        if (total != 10) {
            if (total === parseInt(vatnumber.slice(8)))
                return true
            else
                return false;
        }

        temp = 0;
        for (i = 0; i < 8; i++) temp += parseInt(vatnumber.charAt(i)) * (i + 3);

        total = temp % 11;
        if (total == 10) total = 0;
        if (total === parseInt(vatnumber.slice(8)))
            return true
        else
            return false;
    }

    // 10 digit VAT code - see if it relates to a standard physical person
    if ((/^\d\d[0-5]\d[0-3]\d\d{4}$/).test(vatnumber)) {
        var month = parseInt(vatnumber.slice(2, 4));
        if ((month > 0 && month < 13) || (month > 20 && month < 33) || (month > 40 && month < 53)) {
            var multipliers = [2, 4, 8, 5, 10, 9, 7, 3, 6];
            total = 0;
            for (i = 0; i < 9; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

            total = total % 11;
            if (total == 10) total = 0;

            if (total === parseInt(vatnumber.substr(9, 1)))
                return true;
        }
    }

    // It doesn't relate to a standard physical person - see if it relates to a foreigner.
    multipliers = [21, 19, 17, 13, 11, 9, 7, 3, 1];
    total = 0;
    for (i = 0; i < 9; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    if (total % 10 === parseInt(vatnumber.substr(9, 1)))
        return true;

    // Finally, if not yet identified, see if it conforms to a miscellaneous VAT number
    multipliers = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    total = 0;
    for (i = 0; i < 9; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    if (total % 10 === parseInt(vatnumber.substr(9, 1)))
        return true;

    return false;
}

// 🇨🇾 Cyprus (CY): 9 characters, last is letter, mod 11 checksum
ChecksumValid.CY = function(vat) {
    var vatnumber = vat.substring(2);

    // Checks the check digits of a Cypriot VAT number.
    // The first two digits cannot be '12'
    if (vatnumber.substring(0, 2) === '12') return false;

    // Extract the next digit and multiply by the counter.
    var total = 0;
    for (var i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * (8 - i);

    // Establish check digit.
    total = total % 11;
    if (total === 10) total = 0;

    // The last character must be a letter, so we compare the numeric check digit to the position of the letter in the alphabet.
    var checkChar = String.fromCharCode(65 + total); // Convert 0-9 to A-J
    return checkChar === vatnumber.charAt(8);
}

// 🇨🇿 Czech Republic (CZ): 8, 9 or 10 digits, various checksums
ChecksumValid.CZ = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [8, 7, 6, 5, 4, 3, 2];

    // 8 digit legal entities
    if ((/^\d{8}$/).test(vatnumber)) {
        for (var i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];
        total = 11 - total % 11;
        if (total == 10) total = 0;
        if (total == 11) total = 1;
        return total === parseInt(vatnumber.slice(7, 8));
    }

    // Individuals type 1 (Standard) - 9 digits without check digit
    if ((/^[0-5][0-9][0|1|5|6][0-9][0-3][0-9]\d{3}$/).test(vatnumber)) {
        if (parseInt(vatnumber.slice(0, 2)) > 62) return false;
        return true;
    }

    // Individuals type 2 (Special Cases) - 9 digits including check digit
    if ((/^6\d{8}$/).test(vatnumber)) {
        for (i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i + 1)) * multipliers[i];
        if (total % 11 == 0)
            var a = total + 11
        else
            a = Math.ceil(total / 11) * 11;
        var pointer = a - total;
        var lookup = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 8];
        return lookup[pointer - 1] === vatnumber.slice(8, 9);
    }

    // Individuals type 3 - 10 digits
    if ((/^\d{2}[0-3|5-8][0-9][0-3][0-9]\d{4}$/).test(vatnumber)) {
        var temp = parseInt(vatnumber.slice(0, 2)) + parseInt(vatnumber.slice(2, 4)) + parseInt(vatnumber.slice(4, 6)) + parseInt(vatnumber.slice(6, 8)) + parseInt(vatnumber.slice(8));
        return (temp % 11 == 0 && parseInt(vatnumber) % 11 == 0);
    }

    return false;
}

// 🇪🇪 Estonia (EE): 9 digits, mod 10 checksum
ChecksumValid.EE = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [3, 7, 1, 3, 7, 1, 3, 7];

    for (var i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 10 - total % 10;
    if (total == 10) total = 0;

    return total === parseInt(vatnumber.slice(8, 9));
}

// 🇬🇷 Greece (EL): 9 digits, mod 11 checksum
ChecksumValid.EL = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [256, 128, 64, 32, 16, 8, 4, 2];

    //eight character numbers should be prefixed with an 0.
    if (vatnumber.length === 8) {
        vatnumber = "0" + vatnumber
    };

    // Extract the next digit and multiply by the counter.
    for (var i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    // Establish check digit.
    total = total % 11;
    if (total > 9) {
        total = 0;
    };

    // Compare it with the last character of the VAT number. If it's the same, then it's valid.
    return total === parseInt(vatnumber.slice(8, 9));
}

// 🇭🇺 Hungary (HU): 8 digits, mod 10 checksum
ChecksumValid.HU = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [9, 7, 3, 1, 9, 7, 3];

    for (var i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 10 - total % 10;
    if (total == 10) total = 0;

    return total === parseInt(vatnumber.slice(7, 8));
}

// 🇮🇪 Ireland (IE): 8 or 9 characters, various checksums
ChecksumValid.IE = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [8, 7, 6, 5, 4, 3, 2];

    // If the code is type 1 format, we need to convert it to the new before performing the validation.
    if (/^\d[A-Z\*\+]/.test(vatnumber)) vatnumber = "0" + vatnumber.substring(2, 7) + vatnumber.substring(0, 1) + vatnumber.substring(7, 8);

    // Extract the next digit and multiply by the counter.
    for (var i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    // If the number is type 3 then we need to include the trailing A or H in the calculation
    if (/^\d{7}[A-Z][AH]$/.test(vatnumber)) {
        // Add in a multiplier for the character A (1*9=9) or H (8*9=72)
        if (vatnumber.charAt(8) === 'H')
            total += 72
        else
            total += 9;
    }

    // Establish check digit using modulus 23, and translate to char. equivalent.
    total = total % 23;
    if (total == 0)
        total = "W"
    else
        total = String.fromCharCode(total + 64);
    // Compare it with the check digit position of the VAT number. If it\'s the same, then it\'s valid.
    // For 8-character numbers, the check digit is the 8th character (index 7).
    // For 9-character numbers, the check digit is the 9th character (index 8).
    var checkDigitPosition = vatnumber.length - 1;
    return total === vatnumber.charAt(checkDigitPosition);}

// 🇱🇻 Latvia (LV): 11 digits, various checksums
ChecksumValid.LV = function(vat) {
    var vatnumber = vat.substring(2);

    // Differentiate between legal entities and natural bodies. For the latter we simply check that
    // the first six digits correspond to valid DDMMYY dates.
    if ((/^[0-3]/).test(vatnumber)) {
        if ((/^[0-3][0-9][0-1][0-9]/).test(vatnumber))
            return true
        else
            return false;
    } else {
        var total = 0;
        var multipliers = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6];

        // Extract the next digit and multiply by the counter.
        for (var i = 0; i < 10; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

        // Establish check digits by getting modulus 11.
        if (total % 11 == 4 && vatnumber[0] === 9) total = total - 45;
        if (total % 11 == 4)
            total = 4 - total % 11
        else if (total % 11 > 4)
            total = 14 - total % 11
        else if (total % 11 < 4)
            total = 3 - total % 11;

        // Compare it with the last character of the VAT number. If it's the same, then it's valid.
        if (total === parseInt(vatnumber.slice(10, 11)))
            return true
        else
            return false;
    }
}

// 🇱🇹 Lithuania (LT): 9 or 12 digits, various checksums
ChecksumValid.LT = function ltChecksumValid(vat) {
    var vatnumber = vat.substring(2);

    // 9 character VAT numbers are for legal persons
    if (vatnumber.length === 9) {
        // 8th character must be one
        if (!(/^\d{7}1/).test(vatnumber)) return false;

        var total = 0;
        for (var i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * (i + 1);

        // Can have a double check digit calculation!
        if (total % 11 == 10) {
            var multipliers = [3, 4, 5, 6, 7, 8, 9, 1];
            total = 0;
            for (i = 0; i < 8; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];
        }

        total = total % 11;
        if (total == 10) total = 0;

        return total === parseInt(vatnumber.slice(8, 9));
    }

    // 12 character VAT numbers are for temporarily registered taxpayers
    else {
        // 11th character must be one
        if (!(/^\d{10}1/).test(vatnumber)) return false;

        total = 0;
        multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2];
        for (i = 0; i < 11; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

        // Can have a double check digit calculation!
        if (total % 11 == 10) {
            multipliers = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4];
            total = 0;
            for (i = 0; i < 11; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];
        }

        total = total % 11;
        if (total == 10) total = 0;

        return total === parseInt(vatnumber.slice(11, 12));
    }
}

// 🇱🇺 Luxembourg (LU): 8 digits, mod 89 checksum
ChecksumValid.LU = function(vat) {
    var vatnumber = vat.substring(2);
    return (parseInt(vatnumber.slice(0, 6)) % 89 === parseInt(vatnumber.slice(6, 8)));
}

// 🇲🇹 Malta (MT): 8 digits, mod 37 checksum
ChecksumValid.MT = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [3, 4, 6, 7, 8, 9];

    for (var i = 0; i < 6; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 37 - total % 37;

    return total === parseInt(vatnumber.slice(6, 8));
}

// 🇷🇴 Romania (RO): 2-10 digits, mod 11 checksum
ChecksumValid.RO = function(vat) {
    var vatnumber = vat.substring(2);
    var multipliers = [7, 5, 3, 2, 1, 7, 5, 3, 2];

    var VATlen = vatnumber.length;
    multipliers = multipliers.slice(10 - VATlen);
    var total = 0;
    for (var i = 0; i < vatnumber.length - 1; i++) {
        total += parseInt(vatnumber.charAt(i)) * multipliers[i];
    }

    total = (10 * total) % 11;
    if (total == 10) total = 0;

    return total === parseInt(vatnumber.slice(vatnumber.length - 1, vatnumber.length));
}

// 🇸🇮 Slovenia (SI): 8 digits, mod 11 checksum
ChecksumValid.SI = function(vat) {
    var vatnumber = vat.substring(2);
    var total = 0;
    var multipliers = [8, 7, 6, 5, 4, 3, 2];

    for (var i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    total = 11 - total % 11;
    if (total == 10) total = 0;

    return total != 11 && total === parseInt(vatnumber.slice(7, 8));
}

// 🇬🇧 Great Britain (GB): 9 or 12 digits, various checksums
ChecksumValid.GB = function(vat) {
    var vatnumber = vat.substring(2);
    var multipliers = [8, 7, 6, 5, 4, 3, 2];

    // Government departments
    if (vatnumber.substr(0, 2) === 'GD') {
        if (parseInt(vatnumber.substr(2, 3)) < 500)
            return true
        else
            return false;
    }

    // Health authorities
    if (vatnumber.substr(0, 2) === 'HA') {
        if (parseInt(vatnumber.substr(2, 3)) > 499)
            return true
        else
            return false;
    }

    // Standard and commercial numbers
    var total = 0;

    // 0 VAT numbers disallowed!
    if (parseInt(vatnumber.slice(0)) === 0) return false;

    // Check range is OK for modulus 97 calculation
    var no = parseInt(vatnumber.slice(0, 7));

    // Extract the next digit and multiply by the counter.
    for (var i = 0; i < 7; i++) total += parseInt(vatnumber.charAt(i)) * multipliers[i];

    // Old numbers use a simple 97 modulus, but new numbers use an adaptation of that (less 55). Our
    // VAT number could use either system, so we check it against both.

    // Establish check digits by subtracting 97 from total until negative.
    var cd = total;
    while (cd > 0) {
        cd = cd - 97;
    }

    // Get the absolute value and compare it with the last two characters of the VAT number. If the
    // same, then it is a valid traditional check digit. However, even then the number must fit within
    // certain specified ranges.
    cd = Math.abs(cd);
    if (cd === parseInt(vatnumber.slice(7, 9)) && no < 9990001 && (no < 100000 || no > 999999) && (no < 9490001 || no > 9700000)) return true;

    // Now try the new method by subtracting 55 from the check digit if we can - else add 42
    if (cd >= 55)
        cd = cd - 55
    else
        cd = cd + 42;
    if (cd === parseInt(vatnumber.slice(7, 9)) && no > 1000000)
        return true;
    else
        return false;
}

// 🇳🇿 New Zealand (NZ): 9 digits, weighted mod 11
ChecksumValid.NZ = function(vat) {
    var vatnumber = vat.substring(2);
    if (parseInt(vatnumber) < 10000000 || parseInt(vatnumber) > 150000000) {
        return false;
    }

    var weights = [3, 2, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    for (var i = 0; i < 8; i++) {
        sum += parseInt(vatnumber.charAt(i)) * weights[i];
    }

    var remainder = sum % 11;
    if (remainder === 0) {
        return parseInt(vatnumber.charAt(8)) === 0;
    }

    var checkDigit = 11 - remainder;
    if (checkDigit === 10) {
        return false; // Invalid, should not happen with the given algorithm
    }

    return checkDigit === parseInt(vatnumber.charAt(8));
}

// 🇳🇬 Nigeria (NG): 12 digits, format 12345678-1234
ChecksumValid.NG = function(vat) {
    var vatnumber = vat.substring(2);
    // Nigeria VAT numbers are 12 digits, often formatted as 8 digits, a hyphen, and 4 digits.
    // The checksum algorithm is not readily available in public domain for a simple client-side check.
    // For now, we will only validate the format and length.
    return /^\d{8}-\d{4}$/.test(vatnumber);
}

// 🇵🇹 Portugal (PT): 9 digits, mod 11 checksum
ChecksumValid.PT = function(vat) {
    var digits = vat.substring(2)
    if (!/^\d{9}$/.test(digits))
        return false

    var weights = [9,8,7,6,5,4,3,2]
    var sum = 0
    for (var i = 0; i < 8; i++)
        sum += parseInt(digits[i]) * weights[i]

    var remainder = sum % 11
    var check = 11 - remainder
    if (check > 9) check = 0
    return check === parseInt(digits[8])
}


// ----------- COMBINED VALIDATION -----------
// Main generation function
function checksumValid(countryCode) {
    if (ChecksumValid[countryCode]) {
        return ChecksumValid[countryCode]();
    } else {
        return `Validation not supported for ${countryCode}`;
    }
}
