<?php

class IBAN {
    // Define the constant based on the original Python code
    const LEN_NIB = 21;

    private function toIntList(string $numstr, bool $acceptX = false): array
    {
        /** Converts a string into a list of digits */
        $res = [];
        for ($i = 0; $i < strlen($numstr); $i++) {
            $char = $numstr[$i];
            if (ctype_digit($char)) {
                $res[] = intval($char);
            }
        }
        if ($acceptX) {
            $lastChar = substr($numstr, -1); 
            if (strtoupper($lastChar) === 'X') {
                $res[] = 10;
            }
        }
        return $res;
    }
    
    private function sumLists($a, $b) {
        /**
         * Devolve soma dos produtos, membro a membro, das listas.
         * Recebe duas listas de tamanho igual.
         */
        $val = 0;
        $count = count($a);
        for ($i = 0; $i < $count; $i++) {
            $val += $a[$i] * $b[$i];
        }
        return $val;
    }

    // Existing functions (controlNIB and controlIBAN) are omitted here for brevity,
    // but they remain inside the class.

    /**
     * Verifica validade de número de identificação bancária (NIB).
     * @param string $nib String com o NIB.
     * @return bool True se o NIB for válido, False caso contrário.
     */
    public function controlNIB(string $nib): bool
    {
        $table = [73, 17, 89, 38, 62, 45, 53, 15, 50,
                  5, 49, 34, 81, 76, 27, 90, 9, 30, 3]; // 19 elements

        $nib_list = $this->toIntList($nib, false);

        if (count($nib_list) !== self::LEN_NIB) {
            return false;
        }

        $check_value = $nib_list[self::LEN_NIB - 2] * 10 + $nib_list[self::LEN_NIB - 1];
        $nib_head = array_slice($nib_list, 0, -2);
        $sum_mod = $this->sumLists($table, $nib_head) % 97;

        return $check_value === (98 - $sum_mod);
    }
    
    /**
     * Verifica validade de número de identificação bancária internacional (apenas Portugal).
     * @param string $iban String com o IBAN.
     * @return bool True se o IBAN (Português) for válido, False caso contrário.
     * @throws \Exception Se o código do país do IBAN não for 'PT50'.
     */
    public function controlIBAN(string $iban): bool
    {
        if (substr($iban, 0, 4) === 'PT50') {
            $nib_to_check = substr($iban, 5);
            return $this->controlNIB($nib_to_check);
        } else {
            throw new \Exception("Código IBAN não suportado: " . substr($iban, 0, 4));
        }
    }


    // --- NEW FUNCTION TO GENERATE VALID IBAN ---

    /**
     * Generates a randomly valid Portuguese IBAN in the specified format.
     *
     * @param string $prefix The NIB prefix, e.g., "0018.0000". Must contain 8 digits (excluding dots).
     * @return string A randomly generated, valid IBAN in the format "PT50.XXXX.XXXX.XXXXXXXXXXX.XX".
     * @throws \InvalidArgumentException If the prefix does not contain exactly 8 digits.
     */
    public function generateIBAN(string $prefix): string
    {
        // 1. Clean and validate the 8-digit prefix (NIB component)
        $clean_prefix = preg_replace('/[^0-9]/', '', $prefix);
        if (strlen($clean_prefix) !== 8) {
             throw new \InvalidArgumentException("Prefix must contain exactly 8 digits for the NIB component (e.g., '00180000').");
        }
        
        // 2. Generate the remaining 11 digits of the NIB (account number) randomly
        $account_num = '';
        for ($i = 0; $i < 11; $i++) {
            $account_num .= mt_rand(0, 9);
        }

        // The first 19 digits of the NIB (used for checksum calculation)
        $nib_head_string = $clean_prefix . $account_num;
        
        // 3. Convert the NIB head to a list of integers
        $nib_head_list = $this->toIntList($nib_head_string); // 19 elements

        // 4. Get the table of weights (same as in controlNIB)
        $table = [73, 17, 89, 38, 62, 45, 53, 15, 50,
                  5, 49, 34, 81, 76, 27, 90, 9, 30, 3]; 
        
        // 5. Calculate the weighted sum and the required modulo 97 value
        $sum_mod = $this->sumLists($table, $nib_head_list) % 97;
        
        // 6. Calculate the 2-digit control value (checksum)
        // Checksum = 98 - (Weighted Sum MOD 97)
        $check_value = 98 - $sum_mod;
        
        // Ensure the checksum is formatted with leading zero if needed (e.g., 01, 05, etc.)
        $check_str = str_pad((string)$check_value, 2, '0', STR_PAD_LEFT);

        // 7. Assemble the full NIB
        $full_nib = $nib_head_string . $check_str; // 21 digits

        // 8. Format the IBAN: "PT50.0018.0000.40359330001.87"
        // PT50.AAAA.BBBB.CCCCCCCCCCC.CC
        
        $iban_formatted = sprintf(
            'PT50.%s.%s.%s.%s',
            substr($full_nib, 0, 4),    // Bank Code (4 digits)
            substr($full_nib, 4, 4),    // Branch Code (4 digits)
            substr($full_nib, 8, 11),   // Account Number (11 digits)
            substr($full_nib, 19, 2)    // Checksum (2 digits)
        );

        return $iban_formatted;
    }
}

// // --- Example Usage ---
// 
// $ib = new IBAN;
// 
// // 1. Prefix: '0018.0000' (BPI Bank Code and Branch Code)
// $prefix = "0018.0000"; 
// $new_iban = $ib->generateIBAN($prefix);
// 
// echo "Generated IBAN: " . $new_iban . "\n";
// echo "Validation: " . ($ib->controlIBAN($new_iban) ? "Valid" : "Invalid") . "\n";
// 
// // 2. Another Prefix: '00350482' (Caixa Geral de Depositos)
// $prefix2 = "00350482"; 
// $new_iban2 = $ib->generateIBAN($prefix2);
// 
// echo "Generated IBAN: " . $new_iban2 . "\n";
// echo "Validation: " . ($ib->controlIBAN($new_iban2) ? "Valid" : "Invalid") . "\n";

?>