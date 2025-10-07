<?php

class NIF_NISS
{
    // Sizes of NIF, NISS and NIB
    const LEN_NIF  = 9;
    const LEN_NISS = 11;
    const LEN_NIB  = 21;

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

    private function computeControlNIF($num) {
        /**
         * Computs the NIF's control digit
         */
        $sum = 0;
        $count = count($num);
        for ($pos = 0; $pos < $count - 1; $pos++) {
            $sum += $num[$pos] * (9 - $pos);
        }
        return (($sum % 11) ? ((11 - ($sum % 11)) % 10) : 0);
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
    public function validateNIF($nif) {
        /**
         * Verifica validade de número de contribuinte.
         * Recebe string com NIF.
         */
        if (strlen($nif) != NIF_NISS::LEN_NIF) {
            return false;
        }
        if (strpos("125689", $nif[0]) === false) {
            return false;
        }

        $num = $this->toIntList($nif);
        return $this->computeControlNIF($num) == $num[count($num) - 1];
    }
    
    public function computeControlNISS($niss) {
        /**
         * Computes the NISS's control digit
         */
        $table = array(29, 23, 19, 17, 13, 11, 7, 5, 3, 2);

        // soma de controlo
        $count = count($niss);
        return 9 - ($this->sumLists($table, array_slice($niss, 0, -1)) % 10);
    }
    public function validateNISS($niss) {
        /**
         * Verifica validade de número de segurança social.
         * Recebe string com NISS.
         */
        $table = array(29, 23, 19, 17, 13, 11, 7, 5, 3, 2);

        // verificar tamanho do número passado
        if (strlen($niss) != NIF_NISS::LEN_NISS) {
            return false;
        }

        // verificar validade do carácter inicial do NISS
        if (strpos("12", $niss[0]) === false) {
            return false;
        }

        // converter número para lista de inteiros
        $niss = $this->toIntList($niss);

        // verificar soma de controlo
        $count = count($niss);
        return $niss[$count - 1] == $this->computeControlNISS($niss);
    }

    public function makeNIF($threeDigits) {
        // Ensure input has exactly 3 digits
        if (!preg_match('/^\d{3}$/', $threeDigits)) {
            throw new InvalidArgumentException("Input must be a string of exactly 3 digits.");
        }

        // Convert the string to an array of integers
        $list = array_map('intval', str_split($threeDigits));

        // Add 5 random digits
        for ($i = 0; $i < 5; $i++) {
            $list[] = rand(0, 9);
        }
        $list[] = 0;
        $last = $this->computeControlNIF($list);
        $list[8] = $last;
        //echo implode('', $list) . "\n";

        return implode('', $list);
    }
    public function makeNISS($twoDigits) {
        // Ensure input has exactly 3 digits
        if (!preg_match('/^\d{2}$/', $twoDigits)) {
            throw new InvalidArgumentException("Input must be a string of exactly 3 digits.");
        }

        // Convert the string to an array of integers
        $list = array_map('intval', str_split($twoDigits));

        // Add 8 random digits
        for ($i = 0; $i < 8; $i++) {
            $list[] = rand(0, 9);
        }
        $list[] = 0;
        $last = $this->computeControlNISS($list);
        $list[10] = $last;
        //echo implode('', $list) . "\n";

        return implode('', $list);
    }
}
?>