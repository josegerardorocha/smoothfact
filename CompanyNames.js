var adjectives = {};
var nouns = {};
var prefixes = {};
var suffixes = {};
var legalDesignations = {};

// =================================================================================
// Country Data (AT, BE, BG, CY, CZ, DE, DK, EE, FI, ES, FR, HR, UK, HU, IE, IS, IT,
// LT, LV, LU, MT, NL, NZ, NG, NO, PL, PT, RO, SE, SI, SK, GR, FO, GL)
// =================================================================================

// legalDesignations.AT Data
legalDesignations.AT = [
    "GmbH", "AG", "OG", "KG"
];

// adjectives.AT Data
adjectives.AT = [
    "Global", "Digital", "Innovativ", "Strategisch", "Nachhaltig", "Dynamisch", "Visionär", "Kreativ", "Integriert", "Exzellent", "Modern", "Führend", "Pionier", "Essentiell", "Vernetzt", "Intelligent", "Umfassend", "Überlegen", "Optimiert", "Effizient"
];

// nouns.AT Data
nouns.AT = [
    "Lösungen", "Management", "Beratung", "Dienstleistungen", "Technologie", "Entwicklung", "Innovation", "Systeme", "Partnerschaften", "Markt", "Gruppe", "Kapital", "Investitionen", "Geschäfte", "Unternehmen", "Horizont", "Zukunft", "Fortschritt", "Allianz", "Netzwerk"
];

// prefixes.AT Data
prefixes.AT = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenit", "Prime", "Maxi", "Giga"
];

// suffixes.AT Data
suffixes.AT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.BE Data
legalDesignations.BE = [
    "SA", "NV", "SRL", "BV", "SC", "CV"
];

// adjectives.BE Data
adjectives.BE = [
    "Global", "Digital", "Innovant/Innovatief", "Stratégique/Strategisch", "Durable/Duurzaam", "Dynamique/Dynamisch", "Visionnaire/Visionair", "Créatif/Creatief", "Intégré/Geïntegreerd", "Excellent", "Moderne/Modern", "Leader/Leidend", "Pionnier/Pionier", "Essentiel/Essentieel", "Connecté/Verbonden", "Intelligent", "Complet/Uitgebreid", "Supérieur/Superieur", "Optimisé/Geoptimaliseerd", "Efficace/Efficiënt"
];

// nouns.BE Data
nouns.BE = [
    "Solutions/Oplossingen", "Gestion/Beheer", "Conseil/Advies", "Services/Diensten", "Technologie", "Développement/Ontwikkeling", "Innovation/Innovatie", "Systèmes/Systemen", "Partenariats/Partnerschappen", "Marché/Markt", "Groupe/Groep", "Capital/Kapitaal", "Investissements/Investeringen", "Affaires/Zaken", "Entreprise/Onderneming", "Horizon", "Futur/Toekomst", "Progrès/Vooruitgang", "Alliance/Alliantie", "Réseau/Netwerk"
];

// prefixes.BE Data
prefixes.BE = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.BE Data
suffixes.BE = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.BG Data
legalDesignations.BG = [
    "ООД", "ЕООД", "АД", "СД", "КД"
];

// adjectives.BG Data
adjectives.BG = [
    "Глобален", "Дигитален", "Иновативен", "Стратегически", "Устойчив", "Динамичен", "Визионерски", "Творчески", "Интегриран", "Отличен", "Модерен", "Водещ", "Пионерски", "Съществен", "Свързан", "Интелигентен", "Изчерпателен", "Превъзходен", "Оптимизиран", "Ефективен"
];

// nouns.BG Data
nouns.BG = [
    "Решения", "Управление", "Консултации", "Услуги", "Технологии", "Развитие", "Иновации", "Системи", "Партньорства", "Пазар", "Група", "Капитал", "Инвестиции", "Бизнес", "Компания", "Хоризонт", "Бъдеще", "Прогрес", "Алианс", "Мрежа"
];

// prefixes.BG Data
prefixes.BG = [
    "Алфа", "Бета", "Мега", "Нео", "Омни", "Про", "Ултра", "Зенит", "Прайм", "Макси", "Гига"
];

// suffixes.BG Data
suffixes.BG = [
    "Тех", "Корп", "Лабс", "Хъб", "Кънект", "Солюшънс", "Груп", "Венчърс", "Дигитал", "Глобал"
];

// legalDesignations.CY Data
legalDesignations.CY = [
    "Limited", "Ltd", "PLC"
];

// adjectives.CY Data
adjectives.CY = [
    "Global", "Digital", "Innovative", "Strategic", "Sustainable", "Dynamic", "Visionary", "Creative", "Integrated", "Excellent", "Modern", "Leading", "Pioneer", "Essential", "Connected", "Intelligent", "Comprehensive", "Superior", "Optimized", "Efficient"
];

// nouns.CY Data
nouns.CY = [
    "Solutions", "Management", "Consulting", "Services", "Technology", "Development", "Innovation", "Systems", "Partnerships", "Market", "Group", "Capital", "Investments", "Business", "Company", "Horizon", "Future", "Progress", "Alliance", "Network"
];

// prefixes.CY Data
prefixes.CY = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.CY Data
suffixes.CY = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.CZ Data
legalDesignations.CZ = [
    "s.r.o.", "a.s.", "v.o.s.", "k.s."
];

// adjectives.CZ Data
adjectives.CZ = [
    "Globální", "Digitální", "Inovativní", "Strategický", "Udržitelný", "Dynamický", "Vizionářský", "Kreativní", "Integrovaný", "Vynikající", "Moderní", "Vedoucí", "Pionýrský", "Zásadní", "Propojený", "Inteligentní", "Komplexní", "Vynikající", "Optimalizovaný", "Efektivní"
];

// nouns.CZ Data
nouns.CZ = [
    "Řešení", "Management", "Poradenství", "Služby", "Technologie", "Vývoj", "Inovace", "Systémy", "Partnerství", "Trh", "Skupina", "Kapitál", "Investice", "Podnikání", "Společnost", "Horizont", "Budoucnost", "Pokrok", "Aliance", "Síť"
];

// prefixes.CZ Data
prefixes.CZ = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.CZ Data
suffixes.CZ = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.DE Data
legalDesignations.DE = [
    "GmbH", "AG", "UG", "OHG", "KG"
];

// adjectives.DE Data
adjectives.DE = [
    "Global", "Digital", "Innovativ", "Strategisch", "Nachhaltig", "Dynamisch", "Visionär",
    "Kreativ", "Integriert", "Exzellent", "Modern", "Führend", "Pionier", "Essentiell",
    "Vernetzt", "Intelligent", "Umfassend", "Überlegen", "Optimiert", "Effizient"
];

// nouns.DE Data
nouns.DE = [
    "Lösungen", "Management", "Beratung", "Dienstleistungen", "Technologie", "Entwicklung",
    "Innovation", "Systeme", "Partnerschaften", "Markt", "Gruppe", "Kapital",
    "Investitionen", "Geschäfte", "Unternehmen", "Horizont", "Zukunft", "Fortschritt",
    "Allianz", "Netzwerk"
];

// prefixes.DE Data
prefixes.DE = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenit", "Prime", "Maxi", "Giga"
];

// suffixes.DE Data
suffixes.DE = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.DK Data
legalDesignations.DK = [
    "ApS", "A/S", "P/S"
];

// adjectives.DK Data
adjectives.DK = [
    "Global", "Digital", "Innovativ", "Strategisk", "Bæredygtig", "Dynamisk", "Visionær", "Kreativ", "Integreret", "Fremragende", "Moderne", "Ledende", "Pioner", "Væsentlig", "Forbundet", "Intelligent", "Omfattende", "Overlegen", "Optimeret", "Effektiv"
];

// nouns.DK Data
nouns.DK = [
    "Løsninger", "Ledelse", "Rådgivning", "Services", "Teknologi", "Udvikling", "Innovation", "Systemer", "Partnerskaber", "Marked", "Gruppe", "Kapital", "Investeringer", "Forretning", "Selskab", "Horisont", "Fremtid", "Fremskridt", "Alliance", "Netværk"
];

// prefixes.DK Data
prefixes.DK = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.DK Data
suffixes.DK = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.EE Data
legalDesignations.EE = [
    "OÜ", "AS", "FIE", "TÜ", "UÜ"
];

// adjectives.EE Data
adjectives.EE = [
    "Globaalne", "Digitaalne", "Innovatiivne", "Strateegiline", "Jätkusuutlik", "Dünaamiline", "Visiooniline", "Loominguline", "Integreeritud", "Suurepärane", "Moodne", "Juhtiv", "Pioneerne", "Oluline", "Ühendatud", "Intelligentne", "Põhjalik", "Kõrgem", "Optimeeritud", "Tõhus"
];

// nouns.EE Data
nouns.EE = [
    "Lahendused", "Juhtimine", "Konsultatsioon", "Teenused", "Tehnoloogia", "Arendus", "Innovatsioon", "Süsteemid", "Partnerlused", "Turg", "Grupp", "Kapital", "Investeeringud", "Äri", "Ettevõte", "Horisont", "Tulevik", "Edistys", "Allianss", "Võrgustik"
];

// prefixes.EE Data
prefixes.EE = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.EE Data
suffixes.EE = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.FI Data
legalDesignations.FI = [
    "Oy", "Oyj", "T:mi", "Ay", "Ky"
];

// adjectives.FI Data
adjectives.FI = [
    "Globaali", "Digitaalinen", "Innovatiivinen", "Strateginen", "Kestävä", "Dynaaminen", "Visionäärinen", "Luova", "Integroitu", "Erinomainen", "Moderni", "Johtava", "Pioneeri", "Olennaiset", "Yhdistetty", "Älykäs", "Kattava", "Ylivertainen", "Optimoitu", "Tehokas"
];

// nouns.FI Data
nouns.FI = [
    "Ratkaisut", "Hallinto", "Konsultointi", "Palvelut", "Teknologia", "Kehitys", "Innovaatio", "Järjestelmät", "Kumppanuudet", "Markkinat", "Ryhmä", "Pääoma", "Investoinnit", "Liiketoiminta", "Yritys", "Horisontti", "Tulevaisuus", "Edistys", "Allianssi", "Verkosto"
];

// prefixes.FI Data
prefixes.FI = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.FI Data
suffixes.FI = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.ES Data
legalDesignations.ES = [
    "S.L.", "S.A.", "S.L.N.E.", "S.C.", "S. Com."
];

// adjectives.ES Data
adjectives.ES = [
    "Global", "Digital", "Innovadora", "Estratégica", "Sostenible", "Dinámica", "Visionaria", "Creativa", "Integrada", "Excelente", "Moderna", "Líder", "Pionera", "Esencial", "Conectada", "Inteligente", "Integral", "Superior", "Optimizada", "Eficaz"
];

// nouns.ES Data
nouns.ES = [
    "Soluciones", "Gestión", "Consultoría", "Servicios", "Tecnología", "Desarrollo", "Innovación", "Sistemas", "Asociaciones", "Mercado", "Grupo", "Capital", "Inversiones", "Negocios", "Empresa", "Horizonte", "Futuro", "Progreso", "Alianza", "Red"
];

// prefixes.ES Data
prefixes.ES = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.ES Data
suffixes.ES = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.FR Data
legalDesignations.FR = [
    "SARL", "SAS", "SA", "EURL"
];

// adjectives.FR Data
adjectives.FR = [
    "Global", "Numérique", "Innovante", "Stratégique", "Durable", "Dynamique", "Visionnaire", "Créative", "Intégrée", "Excellente", "Moderne", "Leader", "Pionnière", "Essentielle", "Connectée", "Intelligente", "Complète", "Supérieure", "Optimisée", "Efficace"
];

// nouns.FR Data
nouns.FR = [
    "Solutions", "Gestion", "Conseil", "Services", "Technologie", "Développement", "Innovation", "Systèmes", "Partenariats", "Marché", "Groupe", "Capital", "Investissements", "Affaires", "Entreprise", "Horizon", "Avenir", "Progrès", "Alliance", "Réseau"
];

// prefixes.FR Data
prefixes.FR = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.FR Data
suffixes.FR = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.HR Data
legalDesignations.HR = [
    "d.o.o.", "d.d.", "j.d.o.o.", "j.t.d.", "k.d."
];

// adjectives.HR Data
adjectives.HR = [
    "Globalno", "Digitalno", "Inovativno", "Strateško", "Održivo", "Dinamično", "Vizualno", "Kreativno", "Integrirano", "Izvrsno", "Moderno", "Vodeće", "Pionirsko", "Bitno", "Povezano", "Inteligentno", "Sveobuhvatno", "Superiorno", "Optimizirano", "Učinkovito"
];

// nouns.HR Data
nouns.HR = [
    "Rješenja", "Upravljanje", "Savjetovanje", "Usluge", "Tehnologija", "Razvoj", "Inovacija", "Sustavi", "Partnerstva", "Tržište", "Grupa", "Kapital", "Investicije", "Poslovanje", "Tvrtka", "Horizont", "Budućnost", "Napredak", "Savez", "Mreža"
];

// prefixes.HR Data
prefixes.HR = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenit", "Prime", "Maxi", "Giga"
];

// suffixes.HR Data
suffixes.HR = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.UK Data
legalDesignations.UK = [
    "Ltd", "PLC", "LLP", "CIC"
];

// adjectives.UK Data
adjectives.UK = [
    "Global", "Digital", "Innovative", "Strategic", "Sustainable", "Dynamic", "Visionary", "Creative", "Integrated", "Excellent", "Modern", "Leading", "Pioneer", "Essential", "Connected", "Intelligent", "Comprehensive", "Superior", "Optimized", "Efficient"
];

// nouns.UK Data
nouns.UK = [
    "Solutions", "Management", "Consulting", "Services", "Technology", "Development", "Innovation", "Systems", "Partnerships", "Market", "Group", "Capital", "Investments", "Business", "Company", "Horizon", "Future", "Progress", "Alliance", "Network"
];

// prefixes.UK Data
prefixes.UK = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.UK Data
suffixes.UK = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.HU Data
legalDesignations.HU = [
    "Kft.", "Zrt.", "Nyrt.", "Bt.", "Kkt."
];

// adjectives.HU Data
adjectives.HU = [
    "Globális", "Digitális", "Innovatív", "Stratégiai", "Fenntartható", "Dinamikus", "Vizionárius", "Kreatív", "Integrált", "Kiváló", "Modern", "Vezető", "Úttörő", "Alapvető", "Összekapcsolt", "Intelligens", "Átfogó", "Felsőbbrendű", "Optimalizált", "Hatékony"
];

// nouns.HU Data
nouns.HU = [
    "Megoldások", "Menedzsment", "Tanácsadás", "Szolgáltatások", "Technológia", "Fejlesztés", "Innováció", "Rendszerek", "Partnerségek", "Piac", "Csoport", "Tőke", "Befektetések", "Üzlet", "Vállalat", "Horizont", "Jövő", "Haladás", "Szövetség", "Hálózat"
];

// prefixes.HU Data
prefixes.HU = [
    "Alfa", "Béta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.HU Data
suffixes.HU = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.IE Data
legalDesignations.IE = [
    "Ltd", "DAC", "CLG", "PLC"
];

// adjectives.IE Data
adjectives.IE = [
    "Global", "Digital", "Innovative", "Strategic", "Sustainable", "Dynamic", "Visionary", "Creative", "Integrated", "Excellent", "Modern", "Leading", "Pioneer", "Essential", "Connected", "Intelligent", "Comprehensive", "Superior", "Optimized", "Efficient"
];

// nouns.IE Data
nouns.IE = [
    "Solutions", "Management", "Consulting", "Services", "Technology", "Development", "Innovation", "Systems", "Partnerships", "Market", "Group", "Capital", "Investments", "Business", "Company", "Horizon", "Future", "Progress", "Alliance", "Network"
];

// prefixes.IE Data
prefixes.IE = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.IE Data
suffixes.IE = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.IS Data
legalDesignations.IS = [
    "ehf.", "hf.", "sf.", "samlagsfélag"
];

// adjectives.IS Data
adjectives.IS = [
    "Alþjóðlegt", "Stafrænt", "Nýsköpunar", "Strategic", "Sjálfbært", "Öflugt", "Framtíðarsýn", "Skapandi", "Samþætt", "Framúrskarandi", "Nútíma", "Leiðandi", "Frumkvöðull", "Nauðsynlegt", "Tengt", "Greindur", "Yfirgripsmikið", "Yfirburða", "Bjartsýni", "Hagkvæmt"
];

// nouns.IS Data
nouns.IS = [
    "Lausnir", "Stjórnun", "Ráðgjöf", "Þjónusta", "Tækni", "Þróun", "Nýsköpun", "Kerfi", "Samstarf", "Markaður", "Hópur", "Fjármagn", "Fjárfestingar", "Viðskipti", "Fyrirtæki", "Sjóndeildarhringur", "Framtíð", "Framfarir", "Bandamenn", "Net"
];

// prefixes.IS Data
prefixes.IS = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.IS Data
suffixes.IS = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.IT Data
legalDesignations.IT = [
    "S.r.l.", "S.p.A.", "S.a.p.a.", "S.n.c.", "S.a.s."
];

// adjectives.IT Data
adjectives.IT = [
    "Globale", "Digitale", "Innovativa", "Strategica", "Sostenibile", "Dinamica", "Visionaria", "Creativa", "Integrata", "Eccellente", "Moderna", "Leader", "Pionieristica", "Essenziale", "Connessa", "Intelligente", "Completa", "Superiore", "Ottimizzata", "Efficiente"
];

// nouns.IT Data
nouns.IT = [
    "Soluzioni", "Gestione", "Consulenza", "Servizi", "Tecnologia", "Sviluppo", "Innovazione", "Sistemi", "Partnership", "Mercato", "Gruppo", "Capitale", "Investimenti", "Affari", "Azienda", "Orizzonte", "Futuro", "Progresso", "Alleanza", "Rete"
];

// prefixes.IT Data
prefixes.IT = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.IT Data
suffixes.IT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.LT Data
legalDesignations.LT = [
    "UAB", "AB", "MB", "IĮ"
];

// adjectives.LT Data
adjectives.LT = [
    "Globalus", "Skaitmeninis", "Inovatyvus", "Strateginis", "Tvarus", "Dinamiškas", "Vizualus", "Kūrybinis", "Integruotas", "Puikus", "Modernus", "Pirmaujantis", "Pionierius", "Esminis", "Prijungtas", "Protingas", "Išsamus", "Aukščiausias", "Optimizuotas", "Efektyvus"
];

// nouns.LT Data
nouns.LT = [
    "Sprendimai", "Valdymas", "Konsultacijos", "Paslaugos", "Technologijos", "Plėtra", "Inovacijos", "Sistemos", "Partnerystės", "Rinka", "Grupė", "Kapitalas", "Investicijos", "Verslas", "Įmonė", "Horizontas", "Ateitis", "Pažanga", "Aljansas", "Tinklas"
];

// prefixes.LT Data
prefixes.LT = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenitas", "Prime", "Maxi", "Giga"
];

// suffixes.LT Data
suffixes.LT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.LV Data
legalDesignations.LV = [
    "SIA", "AS", "KS", "PS"
];

// adjectives.LV Data
adjectives.LV = [
    "Globāls", "Digitāls", "Inovatīvs", "Stratēģisks", "Ilgtspējīgs", "Dinamisks", "Vizionārs", "Radošs", "Integrēts", "Izcils", "Moderns", "Vadošais", "Pionieris", "Būtisks", "Savienots", "Inteliģents", "Visaptverošs", "Izcils", "Optimizēts", "Efektīvs"
];

// nouns.LV Data
nouns.LV = [
    "Risinājumi", "Vadība", "Konsultācijas", "Pakalpojumi", "Tehnoloģijas", "Attīstība", "Inovācijas", "Sistēmas", "Partnerības", "Tirgus", "Grupa", "Kapitāls", "Investīcijas", "Bizness", "Uzņēmums", "Horizonts", "Nākotne", "Progress", "Alianses", "Tīkls"
];

// prefixes.LV Data
prefixes.LV = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.LV Data
suffixes.LV = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.LU Data
legalDesignations.LU = [
    "S.à r.l.", "S.A.", "S.C.A.", "S.N.C.", "S.C.S."
];

// adjectives.LU Data
adjectives.LU = [
    "Global", "Digital", "Innovant/Innovativ", "Stratégique/Strategisch", "Durable/Nachhaltig", "Dynamique/Dynamisch", "Visionnaire/Visionär", "Créatif/Kreativ", "Intégré/Integriert", "Excellent", "Moderne/Modern", "Leader/Führend", "Pionnier/Pionier", "Essentiel/Essentiell", "Connecté/Verbonnen", "Intelligent", "Complet/Umfassend", "Supérieur/Iwwerleeën", "Optimisé/Optimiséiert", "Efficace/Effizient"
];

// nouns.LU Data
nouns.LU = [
    "Solutions/Léisungen", "Gestion/Management", "Conseil/Berodung", "Services/Servicer", "Technologie", "Développement/Entwécklung", "Innovation/Innovatioun", "Systèmes/Systemer", "Partenariats/Partnerschaften", "Marché/Maart", "Groupe/Grupp", "Capital/Kapital", "Investissements/Investitiounen", "Affaires/Geschäft", "Entreprise/Entreprise", "Horizon", "Avenir/Zukunft", "Progrès/Fortschrëtt", "Alliance/Allianz", "Réseau/Netzwierk"
];

// prefixes.LU Data
prefixes.LU = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.LU Data
suffixes.LU = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.MT Data
legalDesignations.MT = [
    "Ltd", "PLC"
];

// adjectives.MT Data
adjectives.MT = [
    "Global", "Digital", "Innovative", "Strategic", "Sustainable", "Dynamic", "Visionary", "Creative", "Integrated", "Excellent", "Modern", "Leading", "Pioneer", "Essential", "Connected", "Intelligent", "Comprehensive", "Superior", "Optimized", "Efficient"
];

// nouns.MT Data
nouns.MT = [
    "Solutions", "Management", "Consulting", "Services", "Technology", "Development", "Innovation", "Systems", "Partnerships", "Market", "Group", "Capital", "Investments", "Business", "Company", "Horizon", "Future", "Progress", "Alliance", "Network"
];

// prefixes.MT Data
prefixes.MT = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.MT Data
suffixes.MT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.NL Data
legalDesignations.NL = [
    "BV", "NV", "VOF", "CV"
];

// adjectives.NL Data
adjectives.NL = [
    "Wereldwijd", "Digitaal", "Innovatief", "Strategisch", "Duurzaam", "Dynamisch", "Visionair", "Creatief", "Geïntegreerd", "Uitstekend", "Modern", "Leidend", "Pionier", "Essentieel", "Verbonden", "Intelligent", "Uitgebreid", "Superieur", "Geoptimaliseerd", "Efficiënt"
];

// nouns.NL Data
nouns.NL = [
    "Oplossingen", "Beheer", "Advies", "Diensten", "Technologie", "Ontwikkeling", "Innovatie", "Systemen", "Partnerschappen", "Markt", "Groep", "Kapitaal", "Investeringen", "Zaken", "Onderneming", "Horizon", "Toekomst", "Vooruitgang", "Alliantie", "Netwerk"
];

// prefixes.NL Data
prefixes.NL = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.NL Data
suffixes.NL = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.NZ Data
legalDesignations.NZ = [
    "Limited", "Ltd", "LP", "GP"
];

// adjectives.NZ Data
adjectives.NZ = [
    "Global", "Digital", "Innovative", "Strategic", "Sustainable", "Dynamic", "Visionary", "Creative", "Integrated", "Excellent", "Modern", "Leading", "Pioneer", "Essential", "Connected", "Intelligent", "Comprehensive", "Superior", "Optimized", "Efficient"
];

// nouns.NZ Data
nouns.NZ = [
    "Solutions", "Management", "Consulting", "Services", "Technology", "Development", "Innovation", "Systems", "Partnerships", "Market", "Group", "Capital", "Investments", "Business", "Company", "Horizon", "Future", "Progress", "Alliance", "Network"
];

// prefixes.NZ Data
prefixes.NZ = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.NZ Data
suffixes.NZ = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.NG Data
legalDesignations.NG = [
    "Ltd/Gte", "PLC", "Unlimited"
];

// adjectives.NG Data
adjectives.NG = [
    "Global", "Digital", "Innovative", "Strategic", "Sustainable", "Dynamic", "Visionary", "Creative", "Integrated", "Excellent", "Modern", "Leading", "Pioneer", "Essential", "Connected", "Intelligent", "Comprehensive", "Superior", "Optimized", "Efficient"
];

// nouns.NG Data
nouns.NG = [
    "Solutions", "Management", "Consulting", "Services", "Technology", "Development", "Innovation", "Systems", "Partnerships", "Market", "Group", "Capital", "Investments", "Business", "Company", "Horizon", "Future", "Progress", "Alliance", "Network"
];

// prefixes.NG Data
prefixes.NG = [
    "Alpha", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.NG Data
suffixes.NG = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.NO Data
legalDesignations.NO = [
    "AS", "ASA", "DA", "ANS", "KF"
];

// adjectives.NO Data
adjectives.NO = [
    "Global", "Digital", "Innovativ", "Strategisk", "Bærekraftig", "Dynamisk", "Visjonær", "Kreativ", "Integrert", "Utmerket", "Moderne", "Ledende", "Pioner", "Viktig", "Tilkoblet", "Intelligent", "Omfattende", "Overlegen", "Optimalisert", "Effektiv"
];

// nouns.NO Data
nouns.NO = [
    "Løsninger", "Ledelse", "Rådgivning", "Tjenester", "Teknologi", "Utvikling", "Innovasjon", "Systemer", "Partnerskap", "Marked", "Gruppe", "Kapital", "Investeringer", "Virksomhet", "Selskap", "Horisont", "Fremtid", "Fremgang", "Allianse", "Nettverk"
];

// prefixes.NO Data
prefixes.NO = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.NO Data
suffixes.NO = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.PL Data
legalDesignations.PL = [
    "Sp. z o.o.", "S.A.", "Sp.j.", "Sp.k."
];

// adjectives.PL Data
adjectives.PL = [
    "Globalny", "Cyfrowy", "Innowacyjny", "Strategiczny", "Zrównoważony", "Dynamiczny", "Wizjonerski", "Kreatywny", "Zintegrowany", "Doskonały", "Nowoczesny", "Wiodący", "Pionierski", "Niezbędny", "Połączony", "Inteligentny", "Kompleksowy", "Doskonały", "Zoptymalizowany", "Efektywny"
];

// nouns.PL Data
nouns.PL = [
    "Rozwiązania", "Zarządzanie", "Doradztwo", "Usługi", "Technologia", "Rozwój", "Innowacje", "Systemy", "Partnerstwa", "Rynek", "Grupa", "Kapitał", "Inwestycje", "Biznes", "Firma", "Horyzont", "Przyszłość", "Postęp", "Sojusz", "Sieć"
];

// prefixes.PL Data
prefixes.PL = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.PL Data
suffixes.PL = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.PT Data
legalDesignations.PT = [
    "Lda.", "S.A.", "Unipessoal Lda."
];

// adjectives.PT Data
adjectives.PT = [
    "Global", "Digital", "Inovadora", "Estratégica", "Sustentável", "Dinâmica", "Visionária", "Criativa", "Integrada", "Excelência", "Moderna", "Líder", "Pioneira", "Essencial", "Conectada", "Inteligente", "Abrangente", "Superior", "Otimizada", "Eficaz"
];

// nouns.PT Data
nouns.PT = [
    "Soluções", "Gestão", "Consultoria", "Serviços", "Tecnologia", "Desenvolvimento", "Inovação", "Sistemas", "Parcerias", "Mercado", "Grupo", "Capital", "Investimento", "Negócios", "Empresa", "Horizonte", "Futuro", "Progresso", "Aliança", "Rede"
];

// prefixes.PT Data
prefixes.PT = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.PT Data
suffixes.PT = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.RO Data
legalDesignations.RO = [
    "SRL", "SA", "SNC", "SCS"
];

// adjectives.RO Data
adjectives.RO = [
    "Globală", "Digitală", "Inovatoare", "Strategică", "Durabilă", "Dinamică", "Vizionară", "Creativă", "Integrată", "Excelentă", "Modernă", "Lider", "Pionieră", "Esențială", "Conectată", "Inteligentă", "Cuprinzătoare", "Superioară", "Optimizată", "Eficientă"
];

// nouns.RO Data
nouns.RO = [
    "Soluții", "Management", "Consulting", "Servicii", "Tehnologie", "Dezvoltare", "Inovație", "Sisteme", "Parteneriate", "Piață", "Grup", "Capital", "Investiții", "Afaceri", "Companie", "Orizont", "Viitor", "Progres", "Alianță", "Rețea"
];

// prefixes.RO Data
prefixes.RO = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.RO Data
suffixes.RO = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.SE Data
legalDesignations.SE = [
    "AB", "HB", "KB", "Ek. för."
];

// adjectives.SE Data
adjectives.SE = [
    "Global", "Digital", "Innovativ", "Strategisk", "Hållbar", "Dynamisk", "Visionär", "Kreativ", "Integrerad", "Utmärkt", "Modern", "Ledande", "Pionjär", "Väsentlig", "Ansluten", "Intelligent", "Omfattande", "Överlägsen", "Optimerad", "Effektiv"
];

// nouns.SE Data
nouns.SE = [
    "Lösningar", "Management", "Rådgivning", "Tjänster", "Teknik", "Utveckling", "Innovation", "System", "Partnerskap", "Marknad", "Grupp", "Kapital", "Investeringar", "Affärer", "Företag", "Horisont", "Framtid", "Framsteg", "Allians", "Nätverk"
];

// prefixes.SE Data
prefixes.SE = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.SE Data
suffixes.SE = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.SI Data
legalDesignations.SI = [
    "d.o.o.", "d.d.", "s.p.", "d.n.o."
];

// adjectives.SI Data
adjectives.SI = [
    "Globalno", "Digitalno", "Inovativno", "Strateško", "Trajnostno", "Dinamično", "Vizualno", "Ustvarjalno", "Integrirano", "Odlično", "Moderno", "Vodilno", "Pionirsko", "Bistveno", "Povezano", "Inteligentno", "Celovito", "Vrhunsko", "Optimizirano", "Učinkovito"
];

// nouns.SI Data
nouns.SI = [
    "Rešitve", "Upravljanje", "Svetovanje", "Storitve", "Tehnologija", "Razvoj", "Inovacije", "Sistemi", "Partnerstva", "Trg", "Skupina", "Kapital", "Naložbe", "Poslovanje", "Podjetje", "Obzorje", "Prihodnost", "Napredek", "Zavezništvo", "Mreža"
];

// prefixes.SI Data
prefixes.SI = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenit", "Prime", "Maxi", "Giga"
];

// suffixes.SI Data
suffixes.SI = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.SK Data
legalDesignations.SK = [
    "s.r.o.", "a.s.", "k.s.", "v.o.s."
];

// adjectives.SK Data
adjectives.SK = [
    "Globálny", "Digitálny", "Inovatívny", "Strategický", "Udržateľný", "Dynamický", "Vizionársky", "Kreatívny", "Integrovaný", "Vynikajúci", "Moderný", "Vedúci", "Pioniersky", "Základný", "Pripojený", "Inteligentný", "Komplexný", "Vynikajúci", "Optimalizovaný", "Efektívny"
];

// nouns.SK Data
nouns.SK = [
    "Riešenia", "Manažment", "Poradenstvo", "Služby", "Technológie", "Rozvoj", "Inovácie", "Systémy", "Partnerstvá", "Trh", "Skupina", "Kapitál", "Investície", "Podnikanie", "Spoločnosť", "Horizont", "Budúcnosť", "Pokrok", "Aliancia", "Sieť"
];

// prefixes.SK Data
prefixes.SK = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.SK Data
suffixes.SK = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.GR Data
legalDesignations.GR = [
    "A.E.", "E.P.E.", "I.K.E.", "O.E.", "E.E."
];

// adjectives.GR Data
adjectives.GR = [
    "Παγκόσμια", "Ψηφιακή", "Καινοτόμος", "Στρατηγική", "Βιώσιμη", "Δυναμική", "Οραματική", "Δημιουργική", "Ολοκληρωμένη", "Εξαιρετική", "Μοντέρνα", "Ηγετική", "Πρωτοποριακή", "Ουσιαστική", "Συνδεδεμένη", "Έξυπνη", "Ολοκληρωμένη", "Ανώτερη", "Βελτιστοποιημένη", "Αποτελεσματική"
];

// nouns.GR Data
nouns.GR = [
    "Λύσεις", "Διαχείριση", "Συμβουλευτική", "Υπηρεσίες", "Τεχνολογία", "Ανάπτυξη", "Καινοτομία", "Συστήματα", "Συνεργασίες", "Αγορά", "Όμιλος", "Κεφάλαιο", "Επενδύσεις", "Επιχειρήσεις", "Εταιρεία", "Ορίζοντας", "Μέλλον", "Πρόοδος", "Συμμαχία", "Δίκτυο"
];

// prefixes.GR Data
prefixes.GR = [
    "Άλφα", "Βήτα", "Μέγα", "Νέο", "Όμνι", "Προ", "Ούλτρα", "Ζενίθ", "Πράιμ", "Μάξι", "Γίγα"
];

// suffixes.GR Data
suffixes.GR = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.FO Data
legalDesignations.FO = [
    "Sp/F", "P/F"
];

// adjectives.FO Data
adjectives.FO = [
    "Global", "Digital", "Nýskapan", "Strategisk", "Burðardyggan", "Dynamisk", "Visjónær", "Kreativ", "Integrerað", "Framúrskarandi", "Nútímans", "Leiðandi", "Pioner", "Grundleggjandi", "Tengt", "Greindur", "Umfevnandi", "Framúr", "Optimerað", "Effektivt"
];

// nouns.FO Data
nouns.FO = [
    "Løysnir", "Leiðsla", "Ráðgeving", "Tænastur", "Tøkni", "Útvegan", "Nýskapan", "Skipanir", "Samstarv", "Marknaður", "Bólkur", "Kapitalur", "Íløgur", "Virksemi", "Felag", "Sjónarringur", "Framtíð", "Framgongd", "Samgonga", "Netverk"
];

// prefixes.FO Data
prefixes.FO = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.FO Data
suffixes.FO = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// legalDesignations.GL Data
legalDesignations.GL = [
    "ApS", "A/S"
];

// adjectives.GL Data
adjectives.GL = [
    "Silarsuaq", "Digital", "Nutaanik", "Pilertortumik", "Atuagassamik", "Silaqassuseq", "Takorluugaq", "Pinngortitaq", "Kattussisoq", "Pingaartumik", "Nutaaq", "Siuttuuvoq", "Siulleq", "Pingaaruteqarpoq", "Attaveqaat", "Eqqarsartartoq", "Nalinginnaasoq", "Qaffasissuseq", "Pingaartumik", "Isumaqatigiissut"
];

// nouns.GL Data
nouns.GL = [
    "Aaqqiissutit", "Aqutsineq", "Siunnersuineq", "Sullissinerit", "Teknologi", "Ineriartorneq", "Nutarterineq", "Aaqqissuussaanerit", "Suleqatigiinneq", "Niuerfik", "Suleqatigiit", "Aningaasaq", "Aningaasaliissutit", "Niueqatigiinneq", "Selskab", "Isikkivik", "Siumut", "Siuliani", "Alliancer", "Attaveqaat"
];

// prefixes.GL Data
prefixes.GL = [
    "Alfa", "Beta", "Mega", "Neo", "Omni", "Pro", "Ultra", "Zenith", "Prime", "Maxi", "Giga"
];

// suffixes.GL Data
suffixes.GL = [
    "Tech", "Corp", "Labs", "Hub", "Connect", "Solutions", "Group", "Ventures", "Digital", "Global"
];

// =================================================================================
// Core Logic
// =================================================================================

function getRandomElement(arr) {
    if (!arr || arr.length === 0) {
        return ""; // Handle empty or undefined array gracefully
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCompanyName(countryCode) {
    // Convert countryCode to uppercase to match data structure keys
    const code = countryCode.toUpperCase();

    // Check if data for the country code exists
    if (!legalDesignations[code] || !adjectives[code] || !nouns[code] || !prefixes[code] || !suffixes[code]) {
        console.error(`Error: Data for country code ${code} is missing.`);
        return `[Error: Missing data for ${code}]`;
    }

    let name = "";
    // 0: Noun + Designation
    // 1: Adjective + Noun + Designation
    // 2: Prefix + Noun + Designation (Prefix is often merged with Noun, as in "AlphaSolutions")
    // 3: Noun + Suffix + Designation (Suffix is often merged with Noun, as in "SolutionsTech")
    const structureType = Math.floor(Math.random() * 4);

    switch (structureType) {
        case 0:
            name = `${getRandomElement(nouns[code])} ${getRandomElement(legalDesignations[code])}`;
            break;
        case 1:
            name = `${getRandomElement(adjectives[code])} ${getRandomElement(nouns[code])} ${getRandomElement(legalDesignations[code])}`;
            break;
        case 2:
            // For a more integrated name, we can join the prefix and noun without a space.
            name = `${getRandomElement(prefixes[code])}${getRandomElement(nouns[code])} ${getRandomElement(legalDesignations[code])}`;
            break;
        case 3:
            // For a more integrated name, we can join the noun and suffix without a space.
            name = `${getRandomElement(nouns[code])}${getRandomElement(suffixes[code])} ${getRandomElement(legalDesignations[code])}`;
            break;
    }

    // Clean up potential double spaces or leading/trailing spaces
    return name.replace(/\s\s+/g, ' ').trim();
}

// module.exports = generateCompanyName;

