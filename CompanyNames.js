var adjectives = {};
var nouns = {};
var prefixes = {};
var suffixes = {};
var legalDesignations = {};

// Austria (AT)
adjectives.AT = [
    "Global", "Digital", "Innovativ", "Strategisch", "Nachhaltig", "Dynamisch", "Visionär",
    "Kreativ", "Integriert", "Exzellent", "Modern", "Führend", "Pionier", "Essentiell",
    "Vernetzt", "Intelligent", "Umfassend", "Überlegen", "Optimiert", "Effizient"
];

nouns.AT = [
    "Lösungen", "Management", "Beratung", "Dienstleistungen", "Technologie", "Entwicklung", "Innovation",
    "Systeme", "Partnerschaften", "Markt", "Gruppe", "Kapital", "Investitionen", "Geschäfte",
    "Unternehmen", "Horizont", "Zukunft", "Fortschritt", "Allianz", "Netzwerk"
];

prefixes.AT = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenit", "Prime", "Maxi", "Giga"
];

suffixes.AT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

legalDesignations.AT = [
    "GmbH", "AG", "OG", "KG"
];




// Portugal (PT)
adjectives.PT = [
    "Global", "Digital", "Inovadora", "Estratégica", "Sustentável", "Dinâmica", "Visionária",
    "Criativa", "Integrada", "Excelência", "Moderna", "Líder", "Pioneira", "Essencial",
    "Conectada", "Inteligente", "Abrangente", "Superior", "Otimizada", "Eficaz"
];

nouns.PT = [
    "Soluções", "Gestão", "Consultoria", "Serviços", "Tecnologia", "Desenvolvimento", "Inovação",
    "Sistemas", "Parcerias", "Mercado", "Grupo", "Capital", "Investimento", "Negócios",
    "Empresa", "Horizonte", "Futuro", "Progresso", "Aliança", "Rede"
];

prefixes.PT = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

suffixes.PT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

legalDesignations.PT = [
    "Lda.", "S.A.", "Unipessoal Lda."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCompanyName(countryCode) {
    let name = "";
    const structureType = Math.floor(Math.random() * 4); // 0: Noun + Designation, 1: Adjective + Noun + Designation, 2: Prefix + Noun + Designation, 3: Noun + Suffix + Designation

    switch (structureType) {
        case 0:
            name = `${getRandomElement(nouns[countryCode])} ${getRandomElement(legalDesignations[countryCode])}`;
            break;
        case 1:
            name = `${getRandomElement(adjectives[countryCode])} ${getRandomElement(nouns[countryCode])} ${getRandomElement(legalDesignations[countryCode])}`;
            break;
        case 2:
            name = `${getRandomElement(prefixes[countryCode])}${getRandomElement(nouns[countryCode])} ${getRandomElement(legalDesignations[countryCode])}`;
            break;
        case 3:
            name = `${getRandomElement(nouns[countryCode])} ${getRandomElement(suffixes[countryCode])} ${getRandomElement(legalDesignations[countryCode])}`;
            break;
    }

    return name;
}

