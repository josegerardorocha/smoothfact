var streetTypes = {};
var streetNames = {};
var cities = {};
var floors = {};
var units = {};
var postalCode = {};
var houseNumber = {};

// Austria (AT) Address Data
streetTypes.AT = [
    "Straße", "Gasse", "Platz", "Weg", "Ring", "Allee", "Steig", "Ufer"
];

streetNames.AT = [
    "der Freiheit", "des Friedens", "der Eichen", "der Linden", "der Donau", "der Alpen", "der Rosen", "des Marktes",
    "der Schule", "des Bahnhofs", "der Kirche", "der Sonne", "des Waldes", "der Wiesen", "des Gartens", "des Hügels",
    "der Brücke", "der Mühle", "des Schlosses", "der Quellen", "der Freundschaft", "des Dorfes", "der Musik", "der Republik",
    "von Salzburg", "von Wien", "von Innsbruck", "von Graz", "von Linz", "von Klagenfurt", "von Eisenstadt"
];

cities.AT = [
    "Wien", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "St. Pölten", "Eisenstadt",
    "Bregenz", "Dornbirn", "Steyr", "Feldkirch", "Leoben", "Krems", "Amstetten", "Tulln", "Traun", "Wolfsberg"
];

// Floors and units — similar to PT, but localized naming
floors.AT = ["EG", ...Array.from({ length: 6 }, (_, i) => `${i + 1}. Stock`)];
units.AT = ["Top 1", "Top 2", "Top 3", "Tür A", "Tür B", "Tür C", "Wohnung 1", "Wohnung 2"];

postalCode.AT = function() {
    // Austrian postal codes are 4 digits (1000–9999)
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

houseNumber.AT = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const letter = Math.random() < 0.3 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : ""; // A–C suffix ~30% chance
    return `${n}${letter}`;
};

// Belgium (BE) Address Data
streetTypes.BE = [
    "Rue", "Avenue", "Chaussée", "Place", "Boulevard", "Allée", "Impasse", // French
    "Straat", "Laan", "Weg", "Plein", "Dreef", "Steenweg"                  // Dutch
];

streetNames.BE = [
    "de la Liberté", "du Parc", "de l'Église", "du Moulin", "de la Gare", "du Marché", "des Fleurs", "de la Paix",
    "du Soleil", "du Château", "du Bois", "de la Fontaine", "du Canal", "de la Poste", "de la Montagne",
    "de la Station", "de la Ville", "de la Rivière", "du Centre", "du Nord",
    "van de Vrijheid", "van het Park", "van de Kerk", "van de Molen", "van het Station", "van het Bos",
    "van de Brug", "van de School", "van de Zon", "van de Markt", "van de Fontein",
    "van Antwerpen", "van Brussel", "van Gent", "van Brugge", "van Luik", "van Namen", "van Leuven"
];

cities.BE = [
    "Bruxelles", "Anvers", "Gand", "Liège", "Bruges", "Namur", "Louvain", "Mons", "Charleroi", "Arlon",
    "Tournai", "Hasselt", "Ostende", "La Louvière", "Malines", "Courtrai", "Ypres", "Saint-Nicolas", "Nivelles", "Wavre"
];

// Floors and units — Belgian buildings often use "Rez", "1er", etc.
floors.BE = ["Rez", "1er", ...Array.from({ length: 7 }, (_, i) => `${i + 2}e`)];
units.BE = ["Boîte 1", "Boîte 2", "Boîte 3", "App 1", "App 2", "App 3", "Bus A", "Bus B", "Bus C"];

// Postal code: Belgian postcodes are 4 digits (1000–9999)
postalCode.BE = function() {
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number: often up to 200, sometimes with a letter
houseNumber.BE = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const letter = Math.random() < 0.25 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : ""; // 25% chance for A–C
    return `${n}${letter}`;
};

// Bulgaria (BG) Address Data
streetTypes.BG = [
    "ul.", "bul.", "pl.", "kv.", "zh.k." // short for улица, булевард, площад, квартал, жилищен комплекс
];

streetNames.BG = [
    "Vitosha", "Shipka", "Rakovski", "Dondukov", "Levski", "Slivnitsa", "Bulgaria", "Cherni Vrah",
    "Iskar", "Maritsa", "Struma", "Rodopi", "Pirin", "Rila", "Nezavisimost", "Osmi Mart", "Zname na Mira",
    "Svoboda", "Tsar Osvoboditel", "Hristo Botev", "Vasil Levski", "Kiril i Metodiy", "Stara Planina",
    "Makedonia", "Hemus", "Patriarch Evtimiy", "Khan Asparuh", "Petko R. Slaveykov", "Ruse", "Plovdiv", "Varna"
];

cities.BG = [
    "Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora", "Pleven", "Sliven", "Dobrich", "Shumen",
    "Pernik", "Haskovo", "Yambol", "Blagoevgrad", "Veliko Tarnovo", "Vratsa", "Kardzhali", "Montana", "Lovech", "Razgrad"
];

// Floors and units — simplified
floors.BG = ["Parter", ...Array.from({ length: 8 }, (_, i) => `${i + 1}-et.`)];
units.BG = ["Ap. 1", "Ap. 2", "Ap. 3", "Ap. 4", "Ofis 1", "Ofis 2"];

// Bulgarian postal codes are 4 digits (1000–9999)
postalCode.BG = function() {
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number (1–100, optional letter)
houseNumber.BG = function() {
    const n = Math.floor(Math.random() * 100) + 1;
    const letter = Math.random() < 0.2 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : ""; // 20% A–C
    return `${n}${letter}`;
};

// Cyprus (CY) Address Data
streetTypes.CY = [
    "Leoforos", "Odos", "Plateia", "Parodos" // Avenue, Street, Square, Alley
];

streetNames.CY = [
    "Archiepiskopou Makariou", "Griva Digeni", "Anexartisias", "Athalassas", "Gladstonos", "Spyrou Kyprianou",
    "Eleftherias", "Agias Zonis", "Agiou Andreou", "Faneromenis", "Evagorou", "Agiou Georgiou", "Kallipoleos",
    "Stadiou", "Larnacos", "Limassolou", "Paphou", "Nikitariou", "Troodos", "Agiou Nicolaou", "Agiou Pavlou",
    "Themistokli Dervi", "Agiou Lazarou", "Athinon", "Agias Fylaxeos", "Neapolis", "Agiou Epiphaniou"
];

cities.CY = [
    "Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta", "Paralimni", "Ayia Napa", "Polis", "Lefkara", "Strovolos"
];

// Floors and units — similar to apartment style
floors.CY = ["Ground", "1st", "2nd", "3rd", "4th", "5th"];
units.CY = ["Flat 1", "Flat 2", "Flat 3", "Office 1", "Office 2", "Office 3"];

// Postal code: 4 digits, typically starting from 1000–9999
postalCode.CY = function() {
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number: up to 200
houseNumber.CY = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const letter = Math.random() < 0.2 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : "";
    return `${n}${letter}`;
};

// Czech Republic (CZ) Address Data
streetTypes.CZ = [
    "ulice", "třída", "náměstí", "nábřeží"
];

streetNames.CZ = [
    "Vinohradská", "Karlova", "Národní", "Jungmannova", "Revoluční", "Husova", "Kaprova", "Masarykova",
    "Dlouhá", "Smetanova", "Palackého", "Zborovská", "Italská", "Francouzská", "Legerova", "Václavské náměstí",
    "Nerudova", "Křemencova", "Žitná", "Korunní", "Americká", "Anglická", "Dejvická", "Bělehradská",
    "Letenská", "Vršovická", "Plzeňská", "Kladenská", "Křivoklátská", "Bělohorská", "Poděbradská", "Štefánikova"
];

cities.CZ = [
    "Praha", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc", "České Budějovice", "Hradec Králové", "Ústí nad Labem", "Pardubice",
    "Zlín", "Karlovy Vary", "Jihlava", "Teplice", "Děčín", "Kladno", "Trutnov", "Havlíčkův Brod", "Opava", "Tábor"
];

// Floors and units (common abbreviations)
floors.CZ = ["Přízemí", ...Array.from({ length: 6 }, (_, i) => `${i + 1}. patro`)];
units.CZ = ["byt 1", "byt 2", "byt 3", "kancelář 1", "kancelář 2", "studio"];

// Postal code: 5 digits, e.g. 11000
postalCode.CZ = function() {
    return `${Math.floor(Math.random() * 90000 + 10000)}`;
};

// House number: 1–500 with optional slash and secondary number
houseNumber.CZ = function() {
    const main = Math.floor(Math.random() * 500) + 1;
    const secondary = Math.random() < 0.3 ? `/${Math.floor(Math.random() * 200) + 1}` : "";
    return `${main}${secondary}`;
};

// Germany (DE) Address Data
streetTypes.DE = [
    "Straße", "Weg", "Platz", "Allee", "Ring"
];

streetNames.DE = [
    "Berliner", "Goethestraße", "Hauptstraße", "Linden", "Friedrich", "Beethoven", "Schiller", "Mozart",
    "Park", "Bahnhof", "Kirch", "Rosen", "Schul", "Garten", "Post", "Berg", "Markt", "Hafen", "Wald", "Bach",
    "Kaiser", "Bismarck", "Dorf", "Feld", "Wiesen", "Mühlen", "Buchen", "Ahorn", "Birken", "Tannen", "Wagner"
];

cities.DE = [
    "Berlin", "Hamburg", "München", "Köln", "Frankfurt am Main", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Bremen",
    "Leipzig", "Dresden", "Hannover", "Nürnberg", "Bochum", "Bonn", "Münster", "Karlsruhe", "Mannheim", "Wiesbaden"
];

// Floors and units
floors.DE = ["EG", ...Array.from({ length: 6 }, (_, i) => `${i + 1}. OG`)];
units.DE = ["Whg. 1", "Whg. 2", "Whg. 3", "Büro 1", "Büro 2", "Studio"];

// Postal code: 5 digits (01000–99999)
postalCode.DE = function() {
    return `${Math.floor(Math.random() * 90000 + 10000)}`;
};

// House number: 1–300, optionally with letter (A–C)
houseNumber.DE = function() {
    const n = Math.floor(Math.random() * 300) + 1;
    const letter = Math.random() < 0.3 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : "";
    return `${n}${letter}`;
};

// Denmark (DK) Address Data
streetTypes.DK = [
    "Gade", "Vej", "Allé", "Plads"
];

streetNames.DK = [
    "Nørrebrogade", "Østerbrogade", "Vesterbrogade", "Amagerbrogade", "Frederiksberg Allé", "Strøget",
    "Rådhuspladsen", "Kongens Nytorv", "Vestergade", "Bredgade", "Studiestræde", "Jagtvej", "Falkoner Allé",
    "Holmens Kanal", "Torvegade", "Slotsgade", "Havnegade", "Storegade", "Kirkegade", "Banegårdsvej",
    "Søndergade", "Nørregade", "Viborgvej", "Randersvej", "Skolegade", "Møllevej", "Parkvej", "Hovedgaden",
    "Skovvej", "Engvej", "Birkevej", "Egevej"
];

cities.DK = [
    "København", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde",
    "Helsingør", "Herning", "Silkeborg", "Næstved", "Fredericia", "Viborg", "Køge", "Holstebro", "Slagelse", "Hillerød"
];

// Floors and units
floors.DK = ["st.", ...Array.from({ length: 5 }, (_, i) => `${i + 1}.`)]; // st. = ground floor
units.DK = ["tv.", "th.", "mf."]; // left, right, middle

// Postal codes: 1000–9999
postalCode.DK = function() {
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number: 1–200, optional letter (A–D)
houseNumber.DK = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const letter = Math.random() < 0.2 ? String.fromCharCode(65 + Math.floor(Math.random() * 4)) : "";
    return `${n}${letter}`;
};

// Estonia (EE) Address Data
streetTypes.EE = [
    "Tänav", "Mnt", "Puiestee", "Väljak"
];

streetNames.EE = [
    "Pärnu mnt", "Narva mnt", "Tartu mnt", "Viru tänav", "Rüütli", "Kalda", "Lossi", "Lai", "Koidu", "Veski",
    "Tammsaare", "Jaama", "Kesk", "Kase", "Pargi", "Metsa", "Pika", "Oja", "Raekoja", "Kivi", "Suur", "Uus", "Kalda tee",
    "Vabriku", "Kooli", "Põllu", "Õie", "Valge", "Lille", "Aia", "Mäe", "Tamme"
];

cities.EE = [
    "Tallinn", "Tartu", "Narva", "Pärnu", "Viljandi", "Rakvere", "Kuressaare", "Võru", "Paide", "Haapsalu",
    "Keila", "Rapla", "Valga", "Jõhvi", "Türi", "Elva", "Sillamäe", "Kiviõli", "Saue", "Tapa"
];

// Floors and units
floors.EE = ["1. korrus", ...Array.from({ length: 5 }, (_, i) => `${i + 2}. korrus`)];
units.EE = ["korter 1", "korter 2", "korter 3", "korter 4", "büroo 1", "büroo 2"];

// Postal code: 5 digits (10000–99999)
postalCode.EE = function() {
    return `${Math.floor(Math.random() * 90000 + 10000)}`;
};

// House number: 1–300
houseNumber.EE = function() {
    const n = Math.floor(Math.random() * 300) + 1;
    return `${n}`;
};

// Finland (FI) Address Data
streetTypes.FI = [
    "Katu", "Tie", "Polku", "Kuja", "Raitti", "Väylä"
];

streetNames.FI = [
    "Mannerheimintie", "Hämeenkatu", "Aleksanterinkatu", "Kauppakatu", "Rantatie", "Kirkkokatu",
    "Puistokatu", "Satamatie", "Koulukatu", "Asemakatu", "Peltotie", "Metsäpolku", "Lehtikuja",
    "Aallonkatu", "Linnankatu", "Silta", "Rautatienkatu", "Tammikuja", "Koivutie", "Jokikatu",
    "Vuorikatu", "Aurakatu", "Harjutie", "Saaristotie", "Karjalankatu", "Yliopistonkatu",
    "Teollisuuskatu", "Rautatieasema", "Kalliokatu", "Lähteentie"
];

cities.FI = [
    "Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Kuopio", "Lahti",
    "Pori", "Joensuu", "Lappeenranta", "Hämeenlinna", "Seinäjoki", "Vaasa", "Rovaniemi", "Mikkeli",
    "Kokkola", "Kajaani", "Salo"
];

// Floors and units
floors.FI = ["1. krs", "2. krs", "3. krs", "4. krs", "5. krs"];
units.FI = ["A", "B", "C", "D", "E", "F", "As 1", "As 2", "As 3", "As 4"];

// Postal code: 5 digits (00100–99999)
postalCode.FI = function() {
    return `${Math.floor(Math.random() * 99900 + 100).toString().padStart(5, "0")}`;
};

// House number: 1–200, optional letter
houseNumber.FI = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const letter = Math.random() < 0.3 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : "";
    return `${n}${letter}`;
};

// Spain (ES) Address Data
streetTypes.ES = [
    "Calle", "Avenida", "Paseo", "Plaza", "Camino", "Ronda", "Carretera", "Travesía"
];

streetNames.ES = [
    "de la Libertad", "del Sol", "de la Esperanza", "de la Paz", "de las Flores", "de los Olivos",
    "de la Iglesia", "del Mar", "de la Estación", "del Río", "del Carmen", "de la Luna", "de la Rosa",
    "de la Constitución", "de San Juan", "de la Amistad", "de los Pinos", "del Prado", "de la Fuente",
    "del Parque", "de la Sierra", "de los Jardines", "del Molino", "de la Universidad", "de Colón",
    "de Alcalá", "del Puerto", "de la Reina", "de las Naciones", "de Aragón", "del Generalísimo"
];

cities.ES = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Bilbao", "Alicante",
    "Córdoba", "Valladolid", "Vigo", "Gijón", "La Coruña", "Granada", "Elche", "Oviedo", "Santa Cruz de Tenerife", "Pamplona"
];

// Floors and units — common Spanish abbreviations (3º B = 3rd floor, door B)
floors.ES = [...Array.from({ length: 7 }, (_, i) => `${i + 1}º`), "Bajo", "Entresuelo"];
units.ES = ["A", "B", "C", "D", "E", "F", "Izq", "Dcha"];

// Postal code: 5 digits (01000–52999)
postalCode.ES = function() {
    return `${Math.floor(Math.random() * 51999 + 1000).toString().padStart(5, "0")}`;
};

// House number: 1–300
houseNumber.ES = function() {
    const n = Math.floor(Math.random() * 300) + 1;
    return `Nº ${n}`;
};

// France (FR) Address Data
streetTypes.FR = [
    "Rue", "Avenue", "Boulevard", "Place", "Allée", "Impasse", "Chemin", "Route", "Quai"
];

streetNames.FR = [
    "de la République", "du Général de Gaulle", "de la Liberté", "de Paris", "de l'Église", "du Moulin",
    "de la Gare", "des Fleurs", "du Château", "de la Fontaine", "du Marché", "de la Paix", "de la Poste",
    "du Soleil", "de la Montagne", "de la Mairie", "de la Mer", "des Écoles", "des Jardins", "du Stade",
    "du Pont", "de la Rivière", "du Port", "de la Vallée", "du Parc", "de Verdun", "de Bretagne",
    "de Provence", "d’Alsace", "du Midi", "de Lyon", "de Toulouse", "de Marseille"
];

cities.FR = [
    "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux",
    "Lille", "Rennes", "Reims", "Le Havre", "Dijon", "Grenoble", "Angers", "Clermont-Ferrand", "Tours",
    "Amiens", "Limoges"
];

// Floors and units
floors.FR = ["RDC", "1er étage", "2e étage", "3e étage", "4e étage", "5e étage"];
units.FR = ["Appartement 1", "Appartement 2", "Appartement 3", "Appartement 4", "Porte A", "Porte B", "Porte C"];

// Postal code: 5 digits (01000–99999)
postalCode.FR = function() {
    return `${Math.floor(Math.random() * 98999 + 1000).toString().padStart(5, "0")}`;
};

// House number: 1–200, sometimes with a bis (1 bis, 2 ter, etc.)
houseNumber.FR = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const suffixChance = Math.random();
    let suffix = "";
    if (suffixChance < 0.15) suffix = " bis";
    else if (suffixChance < 0.2) suffix = " ter";
    return `Nº ${n}${suffix}`;
};

// Croatia (HR) Address Data
streetTypes.HR = [
    "Ulica", "Trg", "Avenija", "Put", "Cesta", "Obala"
];

streetNames.HR = [
    "Bana Jelačića", "Kralja Tomislava", "Matije Gupca", "Zagrebačka", "Vukovarska", "Istarska", "Dalmatinska",
    "Primorska", "Cvjetna", "Riječka", "Sunčana", "Kneza Branimira", "Petra Zrinskog", "Franje Tuđmana",
    "Ljudevita Gaja", "Savska", "Vinogradska", "Mirogojska", "Strossmayerova", "Nova", "Stara", "Parkovna"
];

cities.HR = [
    "Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Pula", "Šibenik", "Dubrovnik", "Karlovac", "Varaždin",
    "Sisak", "Bjelovar", "Koprivnica", "Čakovec", "Požega", "Vinkovci", "Vukovar", "Knin", "Gospić", "Krapina"
];

// Floors and units
floors.HR = ["Prizemlje", ...Array.from({ length: 5 }, (_, i) => `${i + 1}. kat`)];
units.HR = ["stan 1", "stan 2", "stan 3", "stan 4", "ured 1", "ured 2"];

// Postal code: 5 digits (10000–53296)
postalCode.HR = function() {
    return `${Math.floor(Math.random() * 43296 + 10000)}`;
};

// House number: 1–200
houseNumber.HR = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};

// United Kingdom (GB) Address Data
streetTypes.GB = [
    "Street", "Road", "Avenue", "Lane", "Drive", "Close", "Crescent", "Place", "Terrace", "Way"
];

streetNames.GB = [
    "High", "Station", "Church", "Park", "Victoria", "King", "Queen", "Main", "London", "Mill", "Market",
    "Bridge", "School", "West", "East", "North", "South", "Green", "Hill", "Chapel", "New", "Old", "Castle",
    "Manor", "Garden", "River", "George", "Albert", "York", "Oxford", "Cambridge", "Maple", "Oak", "Elm"
];

cities.GB = [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Bristol", "Sheffield", "Nottingham",
    "Leicester", "Newcastle", "Cardiff", "Edinburgh", "Glasgow", "Belfast", "Southampton", "Coventry",
    "Reading", "Brighton", "Hull", "Aberdeen"
];

// Floors and units
floors.GB = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"];
units.GB = ["Flat 1A", "Flat 2B", "Flat 3C", "Apt 1", "Apt 2", "Suite 1", "Suite 2", "Unit 3"];

// Postal code: realistic UK format (e.g., "SW1A 1AA", "BS1 5AH")
postalCode.GB = function() {
    const letters = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const nums = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
    return `${letters()}${Math.random() < 0.5 ? letters() : ""}${nums(1)}${Math.random() < 0.5 ? letters() : ""} ${nums(1)}${letters()}${letters()}`;
};

// House number: 1–999
houseNumber.GB = function() {
    const n = Math.floor(Math.random() * 999) + 1;
    const letter = Math.random() < 0.2 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : "";
    return `${n}${letter}`;
};

// Hungary (HU) Address Data
streetTypes.HU = [
    "utca", "út", "tér", "körút", "sétány"
];

streetNames.HU = [
    "Petőfi", "Rákóczi", "Kossuth Lajos", "Szabadság", "Béke", "Jókai", "Arany János", "Ady Endre",
    "Bartók Béla", "Deák Ferenc", "Táncsics Mihály", "Kazinczy", "Vörösmarty", "Rózsa", "Tavasz",
    "Hunyadi", "József Attila", "Király", "Fő", "Templom", "Iskola", "Sport", "Malom", "Árpád"
];

cities.HU = [
    "Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét", "Székesfehérvár",
    "Szombathely", "Tatabánya", "Eger", "Veszprém", "Sopron", "Zalaegerszeg", "Kaposvár", "Békéscsaba", "Érd", "Salgótarján", "Hódmezővásárhely"
];

// Floors and units
floors.HU = ["Földszint", ...Array.from({ length: 5 }, (_, i) => `${i + 1}. emelet`)];
units.HU = ["ajtó 1", "ajtó 2", "ajtó 3", "lakás 1", "lakás 2", "lakás 3"];

// Postal code: 4 digits (1000–9999)
postalCode.HU = function() {
    return `${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number: 1–200
houseNumber.HU = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};

// Ireland (IE) Address Data
streetTypes.IE = [
    "Street", "Road", "Avenue", "Drive", "Lane", "Crescent", "Place", "Terrace", "Quay", "Park"
];

streetNames.IE = [
    "Main", "Church", "High", "Bridge", "River", "School", "Market", "Castle", "Mill", "Green",
    "North", "South", "East", "West", "Georges", "Henrietta", "Camden", "Pearse", "Merrion", "Harcourt",
    "O’Connell", "Patrick", "Stephen’s Green", "Dame", "Kildare", "Leeson", "Baggot", "Talbot"
];

cities.IE = [
    "Dublin", "Cork", "Limerick", "Galway", "Waterford", "Kilkenny", "Sligo", "Wexford", "Tralee",
    "Ennis", "Athlone", "Drogheda", "Dundalk", "Bray", "Naas", "Navan", "Carlow", "Clonmel", "Letterkenny", "Tullamore"
];

floors.IE = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "Top Floor"];
units.IE = ["Apt 1", "Apt 2B", "Flat 3", "Flat 4C", "Suite 5", "Unit 2"];

// Postal code: Eircode format (e.g. A65 F4E2, D02 Y006)
postalCode.IE = function() {
    const letters = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const digits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
    return `${letters()}${digits(2)} ${letters()}${digits(3)}`;
};

// House number: 1–250
houseNumber.IE = function() {
    const n = Math.floor(Math.random() * 250) + 1;
    return `${n}`;
};

// Iceland (IS) Address Data
streetTypes.IS = [
    "gata", "vegur", "stígur", "braut", "leið"
];

streetNames.IS = [
    "Laugavegur", "Hringbraut", "Austurstræti", "Bankastræti", "Skólavörðustígur", "Borgarvegur",
    "Sólheimar", "Mýrarvegur", "Brekkugata", "Hafnarstræti", "Þórunnartún", "Vesturgata", "Lækjargata",
    "Suðurgata", "Eyrarvegur", "Fiskislóð", "Árbraut", "Hlíðarvegur", "Víkurbraut", "Klapparstígur"
];

cities.IS = [
    "Reykjavík", "Kópavogur", "Hafnarfjörður", "Akureyri", "Garðabær", "Mosfellsbær", "Akranes", "Selfoss",
    "Ísafjörður", "Egilsstaðir", "Sauðárkrókur", "Húsavík", "Grindavík", "Borgarnes", "Vík", "Hveragerði"
];

floors.IS = ["Jarðhæð", "1. hæð", "2. hæð", "3. hæð", "4. hæð"];
units.IS = ["íbúð 1", "íbúð 2", "íbúð 3", "íbúð A", "íbúð B", "íbúð C"];

// Postal code: 3 digits (e.g. 101, 220, 600)
postalCode.IS = function() {
    const codes = [101, 103, 104, 105, 107, 108, 109, 110, 200, 210, 220, 230, 260, 270, 300, 310, 600, 800, 900];
    return `${randomChoice(codes)}`;
};

// House number: 1–120
houseNumber.IS = function() {
    const n = Math.floor(Math.random() * 120) + 1;
    return `${n}`;
};

// Italy (IT) Address Data
streetTypes.IT = [
    "Via", "Viale", "Piazza", "Corso", "Largo", "Vicolo", "Strada", "Piazzale"
];

streetNames.IT = [
    "Garibaldi", "Roma", "Vittorio Emanuele II", "Cavour", "Mazzini", "Dante", "Manzoni", "Verdi", "Marconi", "Bianchi",
    "Matteotti", "Pascoli", "Puccini", "Fermi", "Rossini", "Leonardo da Vinci", "Michelangelo", "Galilei", "Torino", "Trieste",
    "Napoli", "Firenze", "Milano", "Bologna", "Genova", "Repubblica", "Unità d’Italia", "Libertà", "Italia", "Po"
];

cities.IT = [
    "Roma", "Milano", "Torino", "Napoli", "Bologna", "Firenze", "Genova", "Venezia", "Verona", "Padova",
    "Palermo", "Catania", "Bari", "Parma", "Modena", "Pisa", "Siena", "Trento", "Udine", "Perugia"
];

floors.IT = ["Piano Terra", "1º Piano", "2º Piano", "3º Piano", "Attico"];
units.IT = ["Int. 1", "Int. 2", "Int. 3", "Int. A", "Int. B", "Int. C"];

// Postal Code (CAP): 5 digits (e.g., 20121)
postalCode.IT = function() {
    return String(Math.floor(Math.random() * 90000 + 10000));
};

// House number: 1–200
houseNumber.IT = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};
// Lithuania (LT) Address Data
streetTypes.LT = ["g.", "pr.", "pl.", "al."]; // g. = street, pr. = avenue, pl. = square, al. = alley

streetNames.LT = [
    "Gedimino", "Vilniaus", "Kauno", "Sodų", "Aušros", "Laisvės", "Mindaugo", "Vytauto", "Šviesos", "Žalioji",
    "Kęstučio", "Šilo", "Parko", "Naujoji", "Senamiesčio", "Rytų", "Rasos", "Tilto", "Saulės", "Dariaus ir Girėno",
    "Taikos", "Birutės", "Ąžuolų", "Jūros", "Pavasario"
];

cities.LT = [
    "Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys", "Alytus", "Marijampolė", "Utena", "Telšiai", "Tauragė",
    "Palanga", "Biržai", "Jonava", "Ukmergė", "Raseiniai", "Plungė", "Mažeikiai", "Rokiškis", "Kėdainiai", "Ignalina"
];

floors.LT = ["1 aukštas", "2 aukštas", "3 aukštas", "4 aukštas", "5 aukštas"];
units.LT = ["buto 1", "buto 2", "buto 3", "buto A", "buto B", "buto C"];

// Postal Code: LT-XXXXX
postalCode.LT = function() {
    return `LT-${Math.floor(Math.random() * 90000 + 10000)}`;
};

// House number: 1–150
houseNumber.LT = function() {
    const n = Math.floor(Math.random() * 150) + 1;
    return `${n}`;
};
// Latvia (LV) Address Data
streetTypes.LV = ["iela", "bulvāris", "gatve", "prospekts", "ceļš", "laukums"]; // iela = street, bulvāris = boulevard, etc.

streetNames.LV = [
    "Brīvības", "Krasta", "Dzirnavu", "Kalnciema", "Krišjāņa Barona", "Elizabetes", "Valdemāra", "Baznīcas",
    "Tērbatas", "Lāčplēša", "Skolas", "Pulkveža Brieža", "Vecpilsētas", "Maskavas", "Rīgas", "Ausekļa",
    "Gaujas", "Saules", "Upes", "Liepājas", "Ziedoņa", "Rūpniecības", "Āgenskalna", "Tilta", "Daugavas"
];

cities.LV = [
    "Rīga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils", "Rēzekne", "Valmiera", "Ogre", "Cēsis",
    "Tukums", "Sigulda", "Kuldīga", "Madona", "Salaspils", "Bauska", "Alūksne", "Gulbene", "Saldus", "Smiltene"
];

floors.LV = ["1. stāvs", "2. stāvs", "3. stāvs", "4. stāvs", "5. stāvs"];
units.LV = ["dz. 1", "dz. 2", "dz. 3", "dz. A", "dz. B", "dz. C"];

// Postal Code: LV-XXXX (4 digits)
postalCode.LV = function() {
    return `LV-${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number: 1–120
houseNumber.LV = function() {
    const n = Math.floor(Math.random() * 120) + 1;
    return `${n}`;
};
// Luxembourg (LU) Address Data
streetTypes.LU = [
    "Rue", "Avenue", "Boulevard", "Place", "Chemin", "Allée", "Impasse"
];

streetNames.LU = [
    "de la Gare", "du Parc", "de l'Église", "de la Poste", "de la Liberté", "du Marché", "de Luxembourg",
    "du Château", "de la Forêt", "du Canal", "des Roses", "des Acacias", "de la Paix", "de la Fontaine",
    "de la Gare Centrale", "des Ardennes", "du Centre", "de la Vallée", "de la Montagne", "du Soleil"
];

cities.LU = [
    "Luxembourg", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Diekirch", "Wiltz", "Grevenmacher",
    "Remich", "Mersch", "Clervaux", "Junglinster", "Bettembourg", "Strassen", "Bertrange", "Mondorf-les-Bains"
];

floors.LU = ["Rez-de-chaussée", "1er étage", "2e étage", "3e étage", "Dernier étage"];
units.LU = ["App. 1", "App. 2", "App. 3", "App. A", "App. B", "App. C"];

// Postal Code: L-XXXX (4 digits)
postalCode.LU = function() {
    return `L-${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number: 1–150
houseNumber.LU = function() {
    const n = Math.floor(Math.random() * 150) + 1;
    const suffix = Math.random() < 0.3 ? String.fromCharCode(65 + Math.floor(Math.random() * 3)) : ""; // 30% chance for A/B/C
    return `${n}${suffix}`;
};
// Malta (MT) Address Data
streetTypes.MT = ["Triq", "Triq il-", "Sqaq", "Pjazza", "Vjal"]; // “Triq” = street, “Pjazza” = square, etc.

streetNames.MT = [
    "il-Kbira", "San Ġorġ", "il-Mosta", "l-Imdina", "San Pawl", "il-Forti", "Santa Marija", "il-Port", "il-Qawwi",
    "San Ġiljan", "Sant’Antnin", "il-Fjur", "il-Ħamrun", "il-Mellieħa", "il-Qawra", "San Ġwann", "tal-Katidral",
    "il-Ferrovija", "tal-Ħarruba", "il-Ħajja", "il-Baħar", "il-Furjana", "Santa Liena", "il-Qorti", "il-Gżira"
];

cities.MT = [
    "Valletta", "Birkirkara", "Mosta", "Sliema", "Qormi", "Żabbar", "San Ġwann", "Naxxar", "Rabat", "Żejtun",
    "Marsaskala", "Żebbuġ", "Birżebbuġa", "Ħamrun", "Senglea", "Cospicua", "Vittoriosa", "Mellieħa", "Mgarr", "Attard"
];

floors.MT = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "Penthouse"];
units.MT = ["Flat 1", "Flat 2", "Flat 3", "Flat A", "Flat B", "Flat C"];

// Postal Code: three-letter locality + 4 digits (e.g. BKR 9023)
postalCode.MT = function() {
    const prefixes = ["BKR", "VLT", "SLM", "QRM", "MST", "ZBG", "NXR", "RBT", "MLH", "ATD"];
    return `${randomChoice(prefixes)} ${Math.floor(Math.random() * 9000 + 1000)}`;
};

// House number or name (common in Malta)
houseNumber.MT = function() {
    const houseNames = ["Dar il-Qawwa", "Villa Marija", "Casa Bella", "Dar is-Sliem", "Villa Ħamsa", "Casa Verde"];
    if (Math.random() < 0.5) {
        return randomChoice(houseNames);
    } else {
        const n = Math.floor(Math.random() * 150) + 1;
        return `No. ${n}`;
    }
};
// Netherlands (NL) Address Data
streetTypes.NL = ["straat", "laan", "weg", "plein", "gracht", "dijk", "hof", "singel"];

streetNames.NL = [
    "Prinsen", "Keizers", "Herengracht", "Damrak", "Lange", "Korte", "Nieuw", "Oude", "Stations", "Kerk",
    "School", "Park", "Brouwers", "Vijzel", "Leidse", "Spui", "Amstel", "Noorder", "Zuid", "Wester"
];

cities.NL = [
    "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere",
    "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Arnhem", "Amersfoort", "Leiden", "Delft", "Zwolle", "Leeuwarden", "Maastricht", "Enschede"
];

floors.NL = ["Begane grond", "1e verdieping", "2e verdieping", "3e verdieping", "Zolder"];
units.NL = ["A", "B", "C", "D", "E", "F"];

// Postal Code: 4 digits + 2 uppercase letters (e.g. 1016 GV)
postalCode.NL = function() {
    const digits = Math.floor(Math.random() * 9000 + 1000);
    const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${digits} ${letters}`;
};

// House number: 1–250 + optional letter
houseNumber.NL = function() {
    const n = Math.floor(Math.random() * 250) + 1;
    const letter = Math.random() < 0.3 ? randomChoice(units.NL) : "";
    return `${n}${letter}`;
};
// New Zealand (NZ) Address Data
streetTypes.NZ = ["Street", "Road", "Avenue", "Drive", "Crescent", "Place", "Terrace", "Lane", "Boulevard"];

streetNames.NZ = [
    "Queen", "Victoria", "King", "Albert", "Princes", "High", "Manukau", "Great North", "Great South", "Khyber Pass",
    "Symonds", "Remuera", "Ponsonby", "Karangahape", "Riccarton", "Fendalton", "Cuba", "Willis", "Lambton", "Grey"
];

cities.NZ = [
    "Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier", "Dunedin", "Palmerston North",
    "Nelson", "Rotorua", "New Plymouth", "Whangārei", "Invercargill", "Queenstown", "Taupō", "Blenheim", "Gisborne"
];

floors.NZ = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "Penthouse"];
units.NZ = ["Apt 1", "Apt 2B", "Unit 3", "Flat 4A", "Suite 5", "Flat 6C"];

// Postal Code: 4 digits (e.g. 1024)
postalCode.NZ = function() {
    return String(Math.floor(Math.random() * 9000 + 1000));
};

// House Number: 1 – 500
houseNumber.NZ = function() {
    const n = Math.floor(Math.random() * 500) + 1;
    return `${n}`;
};
// Nigeria (NG) Address Data
streetTypes.NG = ["Street", "Road", "Close", "Avenue", "Drive", "Crescent", "Lane"];

streetNames.NG = [
    "Adeola Odeku", "Ahmadu Bello", "Awolowo", "Herbert Macaulay", "Allen", "Opebi", "Obafemi Awolowo",
    "Nnamdi Azikiwe", "Ogunlana", "Bode Thomas", "Isaac John", "Mobolaji Bank Anthony", "Adetokunbo Ademola",
    "Okota", "Yaba", "Lekki", "Eko", "Broad", "Ajose Adeogun", "Adeniran Ogunsanya"
];

cities.NG = [
    "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "Benin City", "Kaduna", "Abeokuta", "Jos",
    "Owerri", "Ilorin", "Uyo", "Calabar", "Asaba", "Makurdi", "Ado Ekiti", "Akure", "Bauchi", "Maiduguri"
];

floors.NG = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "Top Floor"];
units.NG = ["Flat 1", "Flat 2", "Flat 3B", "Suite 4", "Apartment 5", "Unit 6"];

// Postal Code: 6 digits (e.g. 101241)
postalCode.NG = function() {
    return String(Math.floor(Math.random() * 900000 + 100000));
};

// House Number: 1 – 300
houseNumber.NG = function() {
    const n = Math.floor(Math.random() * 300) + 1;
    return `${n}`;
};
// Norway (NO) Address Data
streetTypes.NO = ["gate", "vei", "gata", "alleen", "plass", "bakken", "stien"];

streetNames.NO = [
    "Karl Johans", "Bogstadveien", "Dronningens", "Storgata", "Grønlands", "Torggata", "Pilestredet",
    "Markveien", "Kirkeveien", "Holmenkollveien", "Parkveien", "Nordre", "Søndre", "Skovveien", "Universitetsgata",
    "Bispegata", "Haugerudveien", "Vikaveien", "Gamleveien", "Sandveien"
];

cities.NO = [
    "Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen", "Tromsø", "Kristiansand",
    "Ålesund", "Sandnes", "Bodø", "Fredrikstad", "Hamar", "Larvik", "Halden", "Moss", "Molde", "Gjøvik"
];

floors.NO = ["1. etg", "2. etg", "3. etg", "4. etg", "5. etg", "Loft"];
units.NO = ["Leil. 1", "Leil. 2A", "Leil. 3B", "Hus A", "Hus B", "Hus C"];

// Postal Code: 4 digits (e.g. 0159)
postalCode.NO = function() {
    return String(Math.floor(Math.random() * 9000 + 1000));
};

// House Number: 1–200
houseNumber.NO = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};
// Poland (PL) Address Data
streetTypes.PL = ["ul.", "al.", "pl.", "os.", "skwer", "bulwar"];

streetNames.PL = [
    "Jana Pawła II", "Marszałkowska", "Nowy Świat", "Krakowskie Przedmieście", "Piłsudskiego", "Mickiewicza",
    "Kościuszki", "Słowackiego", "3 Maja", "Warszawska", "Polna", "Lipowa", "Dworcowa", "Szkolna", "Leśna",
    "Ogrodowa", "Kwiatowa", "Krótka", "Długa", "Zielona"
];

cities.PL = [
    "Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", "Bydgoszcz",
    "Lublin", "Katowice", "Białystok", "Rzeszów", "Toruń", "Gliwice", "Olsztyn", "Radom", "Kielce", "Opole"
];

floors.PL = ["parter", "1 piętro", "2 piętro", "3 piętro", "4 piętro", "5 piętro"];
units.PL = ["m.1", "m.2", "m.3", "m.4", "m.5", "m.6"];

// Postal Code: 5 digits with hyphen (e.g. 00-175)
postalCode.PL = function() {
    return `${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 900 + 100)}`;
};

// House Number: 1–200, sometimes with flat number
houseNumber.PL = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};

// Portugal (PT) Address Data
streetTypes.PT = [
    "Rua", "Avenida", "Travessa", "Largo", "Estrada", "Alameda", "Praça", "Beco"
];

streetNames.PT = [
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

cities.PT = [
    "Lisboa","Porto","Coimbra","Braga","Faro","Aveiro","Setúbal","Évora","Viseu","Leiria",
            "Guimarães","Cascais","Sintra","Funchal","Ponta Delgada","Albufeira","Beja","Portimão","Lagos","Covilhã"
];

floors.PT = ["RC", ...Array.from({ length: 10 }, (_, i) => `${i + 1}º`)];
units.PT = ["Dto", "Esq", ...Array.from({ length: 6 }, (_, i) => String.fromCharCode(65 + i))]; // A–F

postalCode.PT = function(){
    return `${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 900 + 100)}`;
}

houseNumber.PT = function() {
    const n = Math.floor(Math.random() * 500) + 1
    return `nº ${n}`;
}

// Romania (RO) Address Data
streetTypes.RO = ["Strada", "Bulevardul", "Calea", "Piața", "Aleea"];

streetNames.RO = [
    "Mihai Eminescu", "Ion Creangă", "Nicolae Bălcescu", "Victoriei", "Republicii",
    "Independenței", "Unirii", "1 Decembrie", "Primăverii", "Muncii",
    "Avram Iancu", "Ștefan cel Mare", "Tudor Vladimirescu", "Traian", "Griviței",
    "Dorobanților", "Eroilor", "Lucian Blaga", "Decebal", "Lalelelor"
];

cities.RO = [
    "București", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Brașov", "Craiova",
    "Galați", "Ploiești", "Oradea", "Arad", "Sibiu", "Bacău", "Brăila", "Botoșani", "Pitești"
];

floors.RO = ["parter", "etaj 1", "etaj 2", "etaj 3", "etaj 4", "etaj 5", "mansardă"];
units.RO = ["ap. 1", "ap. 2", "ap. 3", "ap. 4", "ap. 5", "ap. 6", "sc. A", "sc. B"];

// Postal Code: 6 digits (e.g. 030167)
postalCode.RO = function() {
    return String(Math.floor(Math.random() * 900000 + 100000));
};

// House Number: 1–300
houseNumber.RO = function() {
    const n = Math.floor(Math.random() * 300) + 1;
    return `nr. ${n}`;
};
// Sweden (SE) Address Data
streetTypes.SE = ["gatan", "vägen", "torget", "platsen", "allén"];

streetNames.SE = [
    "Svea", "Drottning", "Kungsgatan", "Vasagatan", "Birger Jarl", "Hornsgatan",
    "Norrlandsgatan", "Odengatan", "Götgatan", "Storgatan", "Linnégatan", "Södra Vägen",
    "Kungsholms", "Hantverkargatan", "Tegelbacken", "Holländargatan", "Nybrogatan",
    "Skeppsbron", "Regeringsgatan", "Riddargatan"
];

cities.SE = [
    "Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping",
    "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Eskilstuna"
];

floors.SE = ["Bottenvåning", "1 tr", "2 tr", "3 tr", "4 tr", "5 tr"];
units.SE = ["Lgh 1001", "Lgh 1203", "Lgh 1302", "Lgh 1505", "Lgh 2101", "Lgh 2302"];

// Postal Code: 5 digits with a space after 3 digits (e.g. 113 49)
postalCode.SE = function() {
    return `${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)}`;
};

// House Number: 1–100
houseNumber.SE = function() {
    const n = Math.floor(Math.random() * 100) + 1;
    return `${n}`;
};
// Slovenia (SI) Address Data
streetTypes.SI = ["Ulica", "Cesta", "Trg", "Pot", "Nabrežje", "Avenija"];

streetNames.SI = [
    "Cankarjeva", "Prešernova", "Trubarjeva", "Celovška", "Dunajska", "Slovenska",
    "Koroška", "Vodnikova", "Partizanska", "Rožna Dolina", "Bežigrajska", "Kranjska",
    "Ljubljanska", "Gregorčičeva", "Mestni Trg", "Savska", "Nova Pot", "Goriška",
    "Valvasorjeva", "Kosovelova"
];

cities.SI = [
    "Ljubljana", "Maribor", "Celje", "Kranj", "Velenje", "Koper", "Novo Mesto", "Ptuj",
    "Trbovlje", "Kamnik", "Nova Gorica", "Murska Sobota", "Izola", "Sežana", "Jesenice"
];

floors.SI = ["pritličje", "1. nadstropje", "2. nadstropje", "3. nadstropje", "4. nadstropje", "5. nadstropje"];
units.SI = ["stan. 1", "stan. 2", "stan. 3", "stan. 4", "stan. 5", "stan. 6", "blok A", "blok B"];

// Postal Code: 4 digits (e.g. 1000)
postalCode.SI = function() {
    return String(Math.floor(Math.random() * 9000 + 1000));
};

// House Number: 1–200
houseNumber.SI = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};
// Slovakia (SK) Address Data
streetTypes.SK = ["Ulica", "Cesta", "Námestie", "Alej", "Trh"];

streetNames.SK = [
    "Hlavná", "Štúrova", "Hviezdoslavova", "SNP", "Janka Kráľa", "Námestie Slobody",
    "Mierová", "Tatranská", "Dunajská", "Kvetná", "Lesná", "Poštová", "Parková",
    "Komenského", "Letná", "Záhradná", "Školská", "Jarná", "Dlhá", "Krátka"
];

cities.SK = [
    "Bratislava", "Košice", "Prešov", "Žilina", "Nitra", "Banská Bystrica", "Trnava",
    "Martin", "Trenčín", "Poprad", "Prievidza", "Zvolen", "Považská Bystrica", "Nové Zámky"
];

floors.SK = ["prízemie", "1. poschodie", "2. poschodie", "3. poschodie", "4. poschodie"];
units.SK = ["byt 1", "byt 2", "byt 3", "byt 4", "byt 5", "byt 6", "vchod A", "vchod B"];

// Postal Code: 5 digits with space (e.g. 811 02)
postalCode.SK = function() {
    return `${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)}`;
};

// House Number: 1–200
houseNumber.SK = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    const sub = Math.floor(Math.random() * 10) + 1;
    return `${n}/${sub}`;
};
// Greece (EL) Address Data
streetTypes.EL = ["Οδός", "Λεωφόρος", "Πλατεία", "Αλέα", "Δρόμος"];

streetNames.EL = [
    "Αθηνάς", "Σόλωνος", "Βασιλίσσης Σοφίας", "Κηφισίας", "Ερμού", "Πατησίων", "Πανεπιστημίου",
    "Αιόλου", "Σταδίου", "Λεωφόρος Μεσογείων", "Ακαδημίας", "Σόλωνος", "Ρήγα Φεραίου", "Νίκης",
    "Διονυσίου Αρεοπαγίτου", "Μητροπόλεως", "Λυκούργου", "Κανάρη", "Λεωφόρος Συγγρού", "Θεμιστοκλέους"
];

cities.EL = [
    "Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο", "Λάρισα", "Βόλος", "Ιωάννινα", "Τρίκαλα",
    "Χανιά", "Καβάλα", "Ρόδος", "Κέρκυρα", "Σέρρες", "Καλαμάτα", "Ξάνθη", "Άρτα"
];

floors.EL = ["Ισόγειο", "1ος Όροφος", "2ος Όροφος", "3ος Όροφος", "4ος Όροφος"];
units.EL = ["Διαμ. 1", "Διαμ. 2", "Διαμ. 3", "Διαμ. Α", "Διαμ. Β", "Διαμ. Γ"];

// Postal Code: 5 digits (e.g. 10552)
postalCode.EL = function() {
    return String(Math.floor(Math.random() * 90000 + 10000));
};

// House Number: 1–200
houseNumber.EL = function() {
    const n = Math.floor(Math.random() * 200) + 1;
    return `${n}`;
};

// Faroe Islands (FO) Address Data
streetTypes.FO = ["vegur", "gøta", "brekka", "tún", "støð"];

streetNames.FO = [
    "Havnar", "Vágur", "Klaksvík", "Tvøroyri", "Sandoy", "Runavík", "Eysturoy", "Viðareiði",
    "Tórshavn", "Nólsoy", "Skálabotnur", "Argir", "Leynar", "Hoyvík", "Gjógv", "Skarvanes"
];

cities.FO = ["Tórshavn", "Klaksvík", "Runavík", "Tvøroyri", "Vágur", "Sandavágur", "Fuglafjørður", "Nólsoy"];

floors.FO = ["Stova", "1. hædd", "2. hædd"];
units.FO = ["Íbúð 1", "Íbúð 2", "Íbúð 3", "Íbúð A", "Íbúð B"];

// Postal Code: 3 digits (e.g. 100)
postalCode.FO = function() {
    return String(Math.floor(Math.random() * 900 + 100));
};

// House Number: 1–150
houseNumber.FO = function() {
    const n = Math.floor(Math.random() * 150) + 1;
    return `${n}`;
};
// Greenland (GL) Address Data
streetTypes.GL = ["Allé", "Gade", "Vej", "Plads", "Stræde"];

streetNames.GL = [
    "Kalaallit", "Nuussuaq", "Ilulissat", "Sisimiut", "Aasiaat", "Qaqortoq",
    "Tasiilaq", "Uummannaq", "Qaanaaq", "Narsaq", "Paamiut", "Maniitsoq"
];

cities.GL = ["Nuuk", "Sisimiut", "Ilulissat", "Qaqortoq", "Aasiaat", "Paamiut", "Maniitsoq", "Tasiilaq"];

floors.GL = ["Stueetage", "1. sal", "2. sal"];
units.GL = ["Lejlighed 1", "Lejlighed 2", "Lejlighed 3", "Lejlighed A", "Lejlighed B"];

// Postal Code: 4 digits (e.g. 3900)
postalCode.GL = function() {
    return String(Math.floor(Math.random() * 9000 + 1000));
};

// House Number: 1–100
houseNumber.GL = function() {
    const n = Math.floor(Math.random() * 100) + 1;
    return `${n}`;
};


// --------------------------------------------------------------------

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomAddress(countryCode) {
    const streetType = randomChoice(streetTypes[countryCode]);
    const streetName = randomChoice(streetNames[countryCode]);
    const house = houseNumber[countryCode]();
    let suffix = "";
    if (Math.random() <= 0.8) {
        suffix = ` ${randomChoice(floors[countryCode])} ${randomChoice(units[countryCode])}`;
    }
    const postal = postalCode[countryCode]();
    const city = randomChoice(cities[countryCode]);
    const fullAddress = `${streetType} ${streetName} ${house}${suffix}\n${postal} ${city}`;
    return fullAddress;
}
