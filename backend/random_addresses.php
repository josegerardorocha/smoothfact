<?php
// random_address.php
header('Content-Type: application/json; charset=utf-8');

// --- Address Data ------------------------------------------------------------
$streetTypes = ["Rua", "Avenida", "Travessa", "Largo", "Estrada", "Alameda", "Praça", "Beco"];

$streetNames = [
    "da Liberdade", "das Flores", "da República", "do Infante", "de Camões", "das Rosas", "da Escola", "do Comércio", 
    "da Igreja", "do Mar", "dos Pescadores", "da Alegria", "da Estação", "da Universidade", "do Vale", "do Sol", 
    "da Montanha", "das Oliveiras", "do Pinhal", "da Serra", "do Campo", "dos Castanheiros", "dos Cedros", "das Fontes",
    "da Praia", "do Jardim", "da Esperança", "de São João", "de Nossa Senhora", "do Porto", "da Vila", "da Revolução",
    "25 de Abril", "da Trindade", "de Santa Catarina", "do Carmo", "das Palmeiras", "do Monte", "dos Carvalhos", "dos Moinhos",
    "da Paz", "da Escola Nova", "da Estrela", "de Santo António", "da Liberdade Nova", "dos Pinheiros", "das Laranjeiras",
    "de São Pedro", "do Castelo", "da Fonte", "do Cruzeiro", "das Pedras", "dos Navegantes", "da Boavista", "do Norte",
    "da Beira Mar", "da Restauração", "de São Paulo", "do Calvário", "da Misericórdia", "de São Francisco", "do Poente",
    "da Esperança Nova", "do Areeiro", "das Oliveiras Novas", "dos Bombeiros", "do Rossio", "do Pelourinho", "da Madalena",
    "de Santa Luzia", "de São Tiago", "de Santo Estêvão", "dos Combatentes", "de São Martinho", "da Piedade", "da Fonte Velha",
    "de São Domingos", "da Constituição", "do Pinheiral", "da Cruz", "dos Templários", "da Vitória", "de São Bento", 
    "da Liberdade Velha", "da Amizade", "de São Sebastião", "do Horizonte", "do Caramulo", "da Boa Vista", "do Miradouro",
    "da Bela Vista", "da Ribeira", "da Lapa", "de Santo Amaro", "da Estação Velha", "de São José", "do Carmelo", "de São Miguel"
];

$cities = [
    "Lisboa","Porto","Coimbra","Braga","Faro","Aveiro","Setúbal","Évora","Viseu","Leiria",
    "Guimarães","Cascais","Sintra","Funchal","Ponta Delgada","Albufeira","Beja","Portimão","Lagos","Covilhã"
];

// --- Random Generation -------------------------------------------------------
$streetType  = $streetTypes[array_rand($streetTypes)];
$streetName  = $streetNames[array_rand($streetNames)];
$houseNumber = rand(1, 500);

// Floor and unit suffix
$floors = array_merge(["RC"], array_map(fn($n) => "{$n}º", range(1, 10)));
$units  = array_merge(["Dto", "Esq"], range("A", "F"));

// 80% chance to include a suffix
$suffix = "";
if (rand(1, 100) <= 80) {
    $suffix = " " . $floors[array_rand($floors)] . " " . $units[array_rand($units)];
}

$postalCode  = sprintf("%04d-%03d", rand(1000, 9999), rand(100, 999));
$city        = $cities[array_rand($cities)];

// Combine everything
$addressLines = [
    "$streetType $streetName, nº $houseNumber$suffix",
    "$postalCode $city"
];

$fullAddress = implode("\n", $addressLines);

// Output
echo json_encode([
    "address"     => $fullAddress,
    "street"      => "$streetType $streetName",
    "number"      => $houseNumber,
    "suffix"      => trim($suffix),
    "postalCode"  => $postalCode,
    "city"        => $city
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
