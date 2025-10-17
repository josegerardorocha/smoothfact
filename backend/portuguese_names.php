<?php
require_once "session_start.php";

class PortugueseNames {
    // --- Name Data ---------------------------------------------------------------
    // usage:
    // require_once "PortugueseNames.php";
    // $generator = new PortugueseNames();
    // echo $generator->generateRandomName();

    private $names = [
        "male" => [
            "João","José","António","Manuel","Luís","Pedro","Rafael","Miguel","Tiago","André",
            "Diogo","Gonçalo","Ricardo","Bruno","Hugo","Paulo","Rui","Carlos","Filipe","Nuno",
            "Duarte","Alexandre","Eduardo","Artur","Henrique","David","Jorge","Vítor","Sérgio","Roberto",
            "Fernando","Nelson","Ruben","Samuel","Marco","Valter","Domingos","Hélder","Fábio","Leandro",
            "Joel","Mário","Caio","Cristiano","Alex","Márcio","Renato","Ângelo","Luciano","Valentim",
            "Emanuel","Joaquim","Humberto","Lourenço","Armando","Gustavo","Cristóvão","Osvaldo","Vasco","Salvador",
            "Raimundo","Frederico","Geraldo","Caetano","Alfredo","Telmo","Tomás","Gil","Martim","Simão",
            "Isaac","Bento","César","Sebastião","Raul","Gaspar","Artur","Mateus","Rodrigo","Vicente",
            "Ivo","Álvaro","Guilherme","Eduardo","Sandro","Bráulio","Orlando","Daniel","Rogério","Ronaldo",
            "Adriano","Otávio","Mauro","Geraldo","Renato","Hélder","Tobias","Márcio","Augusto","Benjamim"
        ],
        "female" => [
            "Maria","Ana","Francisca","Beatriz","Leonor","Madalena","Matilde","Inês","Margarida","Carolina",
            "Mariana","Catarina","Sofia","Clara","Lara","Isabel","Joana","Helena","Vera","Gabriela",
            "Teresa","Sara","Patrícia","Daniela","Filipa","Sandra","Bárbara","Alice","Marta","Liliana",
            "Diana","Érica","Adriana","Célia","Tatiana","Camila","Vanessa","Lorena","Ângela","Rita",
            "Raquel","Carla","Andreia","Lúcia","Rosa","Cláudia","Juliana","Susana","Elisa","Jéssica",
            "Bianca","Mafalda","Nádia","Noélia","Celina","Natália","Anabela","Cátia","Glória","Mónica",
            "Eva","Mara","Irina","Alda","Dalila","Marisa","Fátima","Vânia","Yara","Renata",
            "Leonora","Melanie","Paula","Elsa","Micaela","Letícia","Carminho","Pilar","Ema","Núria",
            "Ariana","Aline","Benedita","Odete","Clarisse","Graça","Tânia","Helga","Verónica","Priscila",
            "Rute","Noemi","Sílvia","Mónica","Patrícia","Tatiana","Isabela","Cláudia","Eva","Camila"
        ],
        "last" => [
            "Silva","Santos","Ferreira","Pereira","Oliveira","Costa","Rodrigues","Martins","Jesus","Sousa",
            "Fernandes","Gonçalves","Gomes","Lopes","Marques","Alves","Almeida","Ribeiro","Pinto","Carvalho",
            "Teixeira","Moreira","Correia","Mendes","Nunes","Soares","Vieira","Monteiro","Cardoso","Rocha",
            "Raposo","Fonseca","Machado","Batista","Figueiredo","Neves","Tavares","Simões","Coelho","Dias",
            "Freitas","Henriques","Cunha","Campos","Lourenço","Barros","Leal","Vaz","Reis","Pires",
            "Amaral","Azevedo","Castro","Matos","Ramos","Carneiro","Aguiar","Borges","Peixoto","Monteiro",
            "Domingues","Saraiva","Esteves","Brito","Cordeiro","Ferraz","Garcia","Morais","Faria","Moura",
            "Abreu","Barbosa","Jesus","Valente","Correia","Teles","Leite","César","Falcão","Estevão",
            "Viana","Paiva","Guerreiro","Franco","Lacerda","Amado","Porto","Serra","Matias","Camacho",
            "Mascarenhas","Godinho","Pacheco","Roque","Rego","Meireles","Duarte","Teixeira","Bastos","Lemos"
        ]
    ];

    public function generateRandomName($gender) {
        // --- Gender Input ------------------------------------------------------------
        if (!in_array($gender, ['male', 'female'])) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid gender. Use 'male' or 'female'."]);
            exit;
        }

        // --- Random Selection --------------------------------------------------------
        $firstNames = $this->names[$gender];
        $lastNames  = $this->names['last'];

        // Pick 1 or 2 first names
        $numFirst = rand(1, 2);
        $chosenFirst = array_rand(array_flip($firstNames), $numFirst);
        if (!is_array($chosenFirst)) $chosenFirst = [$chosenFirst];

        // Pick 2 last names
        $chosenLast = array_rand(array_flip($lastNames), 2);
        if (!is_array($chosenLast)) $chosenLast = [$chosenLast];

        // Combine everything
        $fullName = implode(' ', array_merge($chosenFirst, $chosenLast));

        // Output
        return json_encode(["gender" => $gender, "name" => $fullName], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}