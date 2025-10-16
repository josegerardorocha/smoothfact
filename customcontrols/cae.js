.pragma library
var data = [
    {
        "Seccao":"A",
        "Designacao":"Agricultura, floresta e pesca."
    },
    {
        "Divisao":1,
        "Designacao":"Agricultura, produção animal, caça e atividades dos serviços relacionados."
    },
    {
        "Grupo":11,
        "Designacao":"Culturas temporárias."
    },
    {
        "Classe":111,
        "Designacao":"Cultura de cereais (exceto arroz), leguminosas e sementes oleaginosas."
    },
    {
        "Subclasse":1111,
        "Designacao":"Cerealicultura (exceto arroz)."
    },
    {
        "Subclasse":1112,
        "Designacao":"Cultura de leguminosas secas e sementes oleaginosas."
    },
    {
        "Classe":112,
        "Subclasse":1120,
        "Designacao":"Cultura de arroz."
    },
    {
        "Classe":113,
        "Subclasse":1130,
        "Designacao":"Cultura de produtos hortícolas e melões, raízes e tubérculos."
    },
    {
        "Classe":114,
        "Subclasse":1140,
        "Designacao":"Cultura de cana-de-açúcar."
    },
    {
        "Classe":115,
        "Subclasse":1150,
        "Designacao":"Cultura de tabaco."
    },
    {
        "Classe":116,
        "Subclasse":1160,
        "Designacao":"Cultura de plantas têxteis."
    },
    {
        "Classe":119,
        "Designacao":"Outras culturas temporárias."
    },
    {
        "Subclasse":1191,
        "Designacao":"Cultura de flores e de plantas ornamentais."
    },
    {
        "Subclasse":1192,
        "Designacao":"Outras culturas temporárias, n. e."
    },
    {
        "Grupo":12,
        "Designacao":"Culturas permanentes"
    },
    {
        "Classe":121,
        "Subclasse":1210,
        "Designacao":"Viticultura."
    },
    {
        "Classe":122,
        "Subclasse":1220,
        "Designacao":"Cultura de frutos tropicais e subtropicais."
    },
    {
        "Classe":123,
        "Subclasse":1230,
        "Designacao":"Cultura de citrinos."
    },
    {
        "Classe":124,
        "Subclasse":1240,
        "Designacao":"Cultura de pomóideas e prunóideas."
    },
    {
        "Classe":125,
        "Designacao":"Cultura de outros frutos (incluindo casca rija) em árvores e arbustos."
    },
    {
        "Subclasse":1251,
        "Designacao":"Cultura de frutos de casca rija."
    },
    {
        "Subclasse":1252,
        "Designacao":"Cultura de outros frutos em árvores e arbustos."
    },
    {
        "Classe":126,
        "Designacao":"Cultura de frutos oleaginosos."
    },
    {
        "Subclasse":1261,
        "Designacao":"Olivicultura."
    },
    {
        "Subclasse":1262,
        "Designacao":"Cultura de outros frutos oleaginosos."
    },
    {
        "Classe":127,
        "Subclasse":1270,
        "Designacao":"Cultura de plantas destinadas à preparação de bebidas."
    },
    {
        "Classe":128,
        "Subclasse":1280,
        "Designacao":"Cultura de especiarias, plantas aromáticas, medicinais e farmacêuticas."
    },
    {
        "Classe":129,
        "Subclasse":1290,
        "Designacao":"Outras culturas permanentes."
    },
    {
        "Grupo":13,
        "Classe":130,
        "Subclasse":1300,
        "Designacao":"Propagação de plantas."
    },
    {
        "Grupo":14,
        "Designacao":"Produção animal."
    },
    {
        "Classe":141,
        "Subclasse":1410,
        "Designacao":"Criação de bovinos para produção de leite."
    },
    {
        "Classe":142,
        "Subclasse":1420,
        "Designacao":"Criação de outros bovinos e búfalos."
    },
    {
        "Classe":143,
        "Subclasse":1430,
        "Designacao":"Criação de cavalos e outros equídeos."
    },
    {
        "Classe":144,
        "Subclasse":1440,
        "Designacao":"Criação de camelos e camelídeos."
    },
    {
        "Classe":145,
        "Subclasse":1450,
        "Designacao":"Criação de ovinos e caprinos."
    },
    {
        "Classe":146,
        "Subclasse":1460,
        "Designacao":"Suinicultura."
    },
    {
        "Classe":147,
        "Subclasse":1470,
        "Designacao":"Avicultura."
    },
    {
        "Classe":148,
        "Designacao":"Outra produção animal."
    },
    {
        "Subclasse":1481,
        "Designacao":"Apicultura."
    },
    {
        "Subclasse":1482,
        "Designacao":"Cunicultura."
    },
    {
        "Subclasse":1483,
        "Designacao":"Criação de animais de companhia."
    },
    {
        "Subclasse":1484,
        "Designacao":"Criação de insetos para alimentação."
    },
    {
        "Subclasse":1485,
        "Designacao":"Outra produção animal, n. e."
    },
    {
        "Grupo":15,
        "Classe":150,
        "Subclasse":1500,
        "Designacao":"Produções agrícola e animal combinadas."
    },
    {
        "Grupo":16,
        "Designacao":"Atividades de apoio à agricultura e à produção animal, e atividades pós-colheita."
    },
    {
        "Classe":161,
        "Subclasse":1610,
        "Designacao":"Atividades de apoio à agricultura."
    },
    {
        "Classe":162,
        "Subclasse":1620,
        "Designacao":"Atividades de apoio à produção animal."
    },
    {
        "Classe":163,
        "Designacao":"Atividades pós-colheita e tratamento de sementes para propagação."
    },
    {
        "Subclasse":1631,
        "Designacao":"Preparação de produtos agrícolas para venda."
    },
    {
        "Subclasse":1632,
        "Designacao":"Preparação e tratamento de sementes para propagação."
    },
    {
        "Grupo":17,
        "Classe":170,
        "Designacao":"Caça, captura de animais e atividades dos serviços relacionados."
    },
    {
        "Subclasse":1701,
        "Designacao":"Caça e repovoamento cinegético."
    },
    {
        "Subclasse":1702,
        "Designacao":"Atividades dos serviços relacionados com caça e repovoamento cinegético."
    },
    {
        "Divisao":2,
        "Designacao":"Silvicultura e exploração florestal."
    },
    {
        "Grupo":21,
        "Classe":210,
        "Subclasse":2100,
        "Designacao":"Silvicultura e outras atividades florestais."
    },
    {
        "Grupo":22,
        "Classe":220,
        "Subclasse":2200,
        "Designacao":"Exploração florestal."
    },
    {
        "Grupo":23,
        "Classe":230,
        "Subclasse":2300,
        "Designacao":"Extração de cortiça, resina e de outros produtos florestais, exceto madeira."
    },
    {
        "Grupo":24,
        "Classe":240,
        "Subclasse":2400,
        "Designacao":"Serviços de apoio à silvicultura e à exploração florestal."
    },
    {
        "Divisao":3,
        "Designacao":"Pesca e aquicultura."
    },
    {
        "Grupo":31,
        "Designacao":"Pesca."
    },
    {
        "Classe":311,
        "Designacao":"Pesca marítima."
    },
    {
        "Subclasse":3111,
        "Designacao":"Pesca marítima, exceto apanha de algas e de outros produtos do mar."
    },
    {
        "Subclasse":3112,
        "Designacao":"Apanha de algas e de outros produtos do mar."
    },
    {
        "Classe":312,
        "Designacao":"Pesca em água doce"
    },
    {
        "Subclasse":3121,
        "Designacao":"Pesca em água doce, exceto apanha de produtos em água doce."
    },
    {
        "Subclasse":3122,
        "Designacao":"Apanha de produtos em água doce."
    },
    {
        "Grupo":32,
        "Designacao":"Aquicultura."
    },
    {
        "Classe":321,
        "Subclasse":3210,
        "Designacao":"Aquicultura em águas salgadas e salobras."
    },
    {
        "Classe":322,
        "Subclasse":3220,
        "Designacao":"Aquicultura em água doce."
    },
    {
        "Grupo":33,
        "Classe":330,
        "Subclasse":3300,
        "Designacao":"Atividades de apoio à pesca e à aquicultura."
    },
    {
        "Seccao":"B",
        "Designacao":"Indústrias extrativas."
    },
    {
        "Divisao":5,
        "Designacao":"Extração de carvão e lenhite."
    },
    {
        "Grupo":51,
        "Classe":510,
        "Subclasse":5100,
        "Designacao":"Extração de hulha."
    },
    {
        "Grupo":52,
        "Classe":520,
        "Subclasse":5200,
        "Designacao":"Extração de lenhite."
    },
    {
        "Divisao":6,
        "Designacao":"Extração de petróleo bruto e gás natural."
    },
    {
        "Grupo":61,
        "Classe":610,
        "Subclasse":6100,
        "Designacao":"Extração de petróleo bruto."
    },
    {
        "Grupo":62,
        "Classe":620,
        "Subclasse":6200,
        "Designacao":"Extração de gás natural."
    },
    {
        "Divisao":7,
        "Designacao":"Extração de minérios metálicos."
    },
    {
        "Grupo":71,
        "Classe":710,
        "Subclasse":7100,
        "Designacao":"Extração de minérios de ferro."
    },
    {
        "Grupo":72,
        "Designacao":"Extração de minérios metálicos não ferrosos."
    },
    {
        "Classe":721,
        "Subclasse":7210,
        "Designacao":"Extração de minérios de urânio e de tório."
    },
    {
        "Classe":729,
        "Subclasse":7290,
        "Designacao":"Extração de outros minérios metálicos não ferrosos."
    },
    {
        "Divisao":8,
        "Designacao":"Outras indústrias extrativas."
    },
    {
        "Grupo":81,
        "Designacao":"Extração de pedra, areia e argila."
    },
    {
        "Classe":811,
        "Designacao":"Extração de rochas ornamentais, calcário, gesso, ardósia e outras rochas."
    },
    {
        "Subclasse":8111,
        "Designacao":"Extração de mármore e outras rochas carbonatadas."
    },
    {
        "Subclasse":8112,
        "Designacao":"Extração de granito ornamental e rochas similares."
    },
    {
        "Subclasse":8113,
        "Designacao":"Extração de calcário, cré e gesso."
    },
    {
        "Subclasse":8114,
        "Designacao":"Extração de ardósia."
    },
    {
        "Classe":812,
        "Designacao":"Extração de saibro, areia e pedra britada e extração de argilas e caulino."
    },
    {
        "Subclasse":8121,
        "Designacao":"Extração de saibro, areia e pedra britada."
    },
    {
        "Subclasse":8122,
        "Designacao":"Extração de argilas e caulino."
    },
    {
        "Grupo":89,
        "Designacao":"Indústrias extrativas, n. e."
    },
    {
        "Classe":891,
        "Subclasse":8910,
        "Designacao":"Extração de minerais para a indústria química e para a fabricação de adubos."
    },
    {
        "Classe":892,
        "Subclasse":8920,
        "Designacao":"Extração de turfa."
    },
    {
        "Classe":893,
        "Designacao":"Extração de sal."
    },
    {
        "Subclasse":8931,
        "Designacao":"Extração de sal marinho."
    },
    {
        "Subclasse":8932,
        "Designacao":"Extração de sal-gema."
    },
    {
        "Classe":899,
        "Subclasse":8990,
        "Designacao":"Outras indústrias extrativas, n. e."
    },
    {
        "Divisao":9,
        "Designacao":"Atividades de serviços de apoio às indústrias extrativas."
    },
    {
        "Grupo":91,
        "Classe":910,
        "Subclasse":9100,
        "Designacao":"Atividades de apoio à extração de petróleo e de gás natural."
    },
    {
        "Grupo":99,
        "Classe":990,
        "Subclasse":9900,
        "Designacao":"Atividades de apoio a outras indústrias extrativas."
    },
    {
        "Seccao":"C",
        "Designacao":"Indústrias transformadoras."
    },
    {
        "Divisao":10,
        "Designacao":"Indústrias alimentares."
    },
    {
        "Grupo":101,
        "Designacao":"Processamento e conservação de carne e fabricação de produtos à base de carne."
    },
    {
        "Classe":1011,
        "Subclasse":10110,
        "Designacao":"Processamento e conservação de carne, exceto carne de aves."
    },
    {
        "Classe":1012,
        "Subclasse":10120,
        "Designacao":"Processamento e conservação de carne de aves."
    },
    {
        "Classe":1013,
        "Subclasse":10130,
        "Designacao":"Fabricação de produtos à base de carne."
    },
    {
        "Grupo":102,
        "Classe":1020,
        "Designacao":"Processamento e conservação de peixes, crustáceos e moluscos."
    },
    {
        "Subclasse":10201,
        "Designacao":"Preparação de produtos da pesca e da aquicultura."
    },
    {
        "Subclasse":10202,
        "Designacao":"Congelação de produtos da pesca e da aquicultura."
    },
    {
        "Subclasse":10203,
        "Designacao":"Conservação de produtos da pesca e da aquicultura em azeite e outros óleos vegetais e outros molhos."
    },
    {
        "Subclasse":10204,
        "Designacao":"Salga, secagem e outras atividades de transformação de produtos da pesca e aquicultura."
    },
    {
        "Grupo":103,
        "Designacao":"Processamento e conservação de frutos e de produtos hortícolas."
    },
    {
        "Classe":1031,
        "Subclasse":10310,
        "Designacao":"Processamento e conservação de batatas."
    },
    {
        "Classe":1032,
        "Subclasse":10320,
        "Designacao":"Fabricação de sumos de frutos e de produtos hortícolas."
    },
    {
        "Classe":1039,
        "Designacao":"Outro processamento e conservação de frutos e de produtos hortícolas."
    },
    {
        "Subclasse":10391,
        "Designacao":"Congelação de frutos e de produtos hortícolas."
    },
    {
        "Subclasse":10392,
        "Designacao":"Secagem e desidratação de frutos e de produtos hortícolas."
    },
    {
        "Subclasse":10393,
        "Designacao":"Fabricação de doces, compotas, geleias e marmelada."
    },
    {
        "Subclasse":10394,
        "Designacao":"Descasque e transformação de frutos de casca rija comestíveis."
    },
    {
        "Subclasse":10395,
        "Designacao":"Preparação e conservação de frutos e de produtos hortícolas por outros processos."
    },
    {
        "Grupo":104,
        "Designacao":"Produção de óleos e gorduras animais e vegetais."
    },
    {
        "Classe":1041,
        "Designacao":"Produção de óleos e gorduras."
    },
    {
        "Subclasse":10411,
        "Designacao":"Produção de óleos e gorduras animais brutos."
    },
    {
        "Subclasse":10412,
        "Designacao":"Produção de azeite."
    },
    {
        "Subclasse":10413,
        "Designacao":"Produção de óleos vegetais brutos (exceto azeite)."
    },
    {
        "Subclasse":10414,
        "Designacao":"Refinação de azeite, óleos e gorduras."
    },
    {
        "Classe":1042,
        "Subclasse":10420,
        "Designacao":"Fabricação de margarinas e de gorduras alimentares similares."
    },
    {
        "Grupo":105,
        "Designacao":"Indústria de laticínios; fabricação de gelados e sorvetes."
    },
    {
        "Classe":1051,
        "Subclasse":10510,
        "Designacao":"Indústria de laticínios."
    },
    {
        "Classe":1052,
        "Subclasse":10520,
        "Designacao":"Fabricação de gelados e sorvetes."
    },
    {
        "Grupo":106,
        "Designacao":"Transformação de cereais e leguminosas; fabricação de amidos, féculas e produtos afins."
    },
    {
        "Classe":1061,
        "Designacao":"Transformação de cereais e leguminosas.."
    },
    {
        "Subclasse":10611,
        "Designacao":"Moagem de cereais."
    },
    {
        "Subclasse":10612,
        "Designacao":"Descasque, branqueamento e outros tratamentos do arroz."
    },
    {
        "Subclasse":10613,
        "Designacao":"Transformação de cereais e leguminosas, n. e."
    },
    {
        "Classe":1062,
        "Subclasse":10620,
        "Designacao":"Fabricação de amidos, féculas e produtos afins."
    },
    {
        "Grupo":107,
        "Designacao":"Fabricação de produtos de padaria e outros produtos à base de farinha."
    },
    {
        "Classe":1071,
        "Designacao":"Panificação e pastelaria fresca."
    },
    {
        "Subclasse":10711,
        "Designacao":"Panificação."
    },
    {
        "Subclasse":10712,
        "Designacao":"Pastelaria fresca."
    },
    {
        "Classe":1072,
        "Subclasse":10720,
        "Designacao":"Fabricação de bolachas, biscoitos, tostas e pastelaria de conservação."
    },
    {
        "Classe":1073,
        "Subclasse":10730,
        "Designacao":"Fabricação de produtos à base de farinha."
    },
    {
        "Grupo":108,
        "Designacao":"Fabricação de outros produtos alimentares."
    },
    {
        "Classe":1081,
        "Subclasse":10810,
        "Designacao":"Indústria do açúcar."
    },
    {
        "Classe":1082,
        "Designacao":"Indústria do cacau, do chocolate e dos produtos de confeitaria à base de açúcar."
    },
    {
        "Subclasse":10821,
        "Designacao":"Fabricação de cacau e de chocolate."
    },
    {
        "Subclasse":10822,
        "Designacao":"Fabricação de produtos de confeitaria."
    },
    {
        "Classe":1083,
        "Subclasse":10830,
        "Designacao":"Indústria do café e do chá."
    },
    {
        "Classe":1084,
        "Subclasse":10840,
        "Designacao":"Fabricação de condimentos e temperos."
    },
    {
        "Classe":1085,
        "Subclasse":10850,
        "Designacao":"Fabricação de refeições e pratos pré-cozinhados."
    },
    {
        "Classe":1086,
        "Subclasse":10860,
        "Designacao":"Fabricação de alimentos homogeneizados e dietéticos."
    },
    {
        "Classe":1089,
        "Designacao":"Fabricação de outros produtos alimentares, n. e."
    },
    {
        "Subclasse":10891,
        "Designacao":"Fabricação de fermentos, leveduras e adjuvantes para panificação e pastelaria."
    },
    {
        "Subclasse":10892,
        "Designacao":"Fabricação de caldos, sopas e sobremesas."
    },
    {
        "Subclasse":10893,
        "Designacao":"Fabricação de suplementos alimentares."
    },
    {
        "Subclasse":10894,
        "Designacao":"Fabricação de produtos alternativos aos produtos lácteos."
    },
    {
        "Subclasse":10895,
        "Designacao":"Fabricação de outros produtos alimentares diversos, n. e."
    },
    {
        "Grupo":109,
        "Designacao":"Fabricação de alimentos preparados para animais."
    },
    {
        "Classe":1091,
        "Designacao":"Fabricação de alimentos para animais de criação."
    },
    {
        "Subclasse":10911,
        "Designacao":"Fabricação de pré-misturas."
    },
    {
        "Subclasse":10912,
        "Designacao":"Fabricação de alimentos para animais de criação (exceto para aquicultura)."
    },
    {
        "Subclasse":10913,
        "Designacao":"Fabricação de alimentos para aquicultura."
    },
    {
        "Classe":1092,
        "Subclasse":10920,
        "Designacao":"Fabricação de alimentos para animais de estimação."
    },
    {
        "Divisao":11,
        "Designacao":"Indústria das bebidas."
    },
    {
        "Grupo":110,
        "Designacao":"Indústria das bebidas."
    },
    {
        "Classe":1101,
        "Designacao":"Fabricação de bebidas alcoólicas destiladas."
    },
    {
        "Subclasse":11011,
        "Designacao":"Fabricação de aguardentes preparadas."
    },
    {
        "Subclasse":11012,
        "Designacao":"Fabricação de aguardentes não preparadas."
    },
    {
        "Subclasse":11013,
        "Designacao":"Produção de licores e de outras bebidas destiladas."
    },
    {
        "Classe":1102,
        "Designacao":"Indústria do vinho."
    },
    {
        "Subclasse":11021,
        "Designacao":"Produção de vinhos comuns e licorosos."
    },
    {
        "Subclasse":11022,
        "Designacao":"Produção de vinhos espumantes e espumosos."
    },
    {
        "Classe":1103,
        "Subclasse":11030,
        "Designacao":"Fabricação de sidra e outras bebidas fermentadas de frutos."
    },
    {
        "Classe":1104,
        "Subclasse":11040,
        "Designacao":"Fabricação de vermutes e de outras bebidas fermentadas não destiladas."
    },
    {
        "Classe":1105,
        "Subclasse":11050,
        "Designacao":"Fabricação de cerveja."
    },
    {
        "Classe":1106,
        "Subclasse":11060,
        "Designacao":"Fabricação de malte."
    },
    {
        "Classe":1107,
        "Designacao":"Produção de bebidas refrigerantes não alcoólicas e de águas engarrafadas."
    },
    {
        "Subclasse":11071,
        "Designacao":"Engarrafamento de águas minerais naturais e de nascente."
    },
    {
        "Subclasse":11072,
        "Designacao":"Fabricação de refrigerantes e de outras bebidas não alcoólicas, n. e."
    },
    {
        "Divisao":12,
        "Grupo":120,
        "Classe":1200,
        "Subclasse":12000,
        "Designacao":"Indústria do tabaco."
    },
    {
        "Divisao":13,
        "Designacao":"Fabricação de têxteis."
    },
    {
        "Grupo":131,
        "Classe":1310,
        "Designacao":"Preparação e fiação de fibras têxteis."
    },
    {
        "Subclasse":13101,
        "Designacao":"Preparação e fiação de fibras do tipo algodão, lã, seda, linho e outras fibras têxteis; preparação e texturização de filamentos sintéticos e artificiais."
    },
    {
        "Subclasse":13102,
        "Designacao":"Fabricação de linhas de costura."
    },
    {
        "Grupo":132,
        "Classe":1320,
        "Subclasse":13200,
        "Designacao":"Tecelagem de têxteis."
    },
    {
        "Grupo":133,
        "Classe":1330,
        "Designacao":"Acabamento de têxteis."
    },
    {
        "Subclasse":13301,
        "Designacao":"Branqueamento e tingimento."
    },
    {
        "Subclasse":13302,
        "Designacao":"Estampagem."
    },
    {
        "Subclasse":13303,
        "Designacao":"Acabamento de fios, tecidos e artigos têxteis, n. e."
    },
    {
        "Grupo":139,
        "Designacao":"Fabricação de outros têxteis."
    },
    {
        "Classe":1391,
        "Subclasse":13910,
        "Designacao":"Fabricação de tecidos de malha."
    },
    {
        "Classe":1392,
        "Subclasse":13920,
        "Designacao":"Fabricação de têxteis para uso doméstico e de artigos têxteis de decoração confecionados."
    },
    {
        "Classe":1393,
        "Subclasse":13930,
        "Designacao":"Fabricação de tapetes e carpetes."
    },
    {
        "Classe":1394,
        "Designacao":"Fabricação de cordoaria e redes."
    },
    {
        "Subclasse":13941,
        "Designacao":"Fabricação de cordoaria."
    },
    {
        "Subclasse":13942,
        "Designacao":"Fabricação de redes."
    },
    {
        "Classe":1395,
        "Subclasse":13950,
        "Designacao":"Fabricação de têxteis não tecidos e respetivos artigos."
    },
    {
        "Classe":1396,
        "Designacao":"Fabricação de têxteis para uso técnico e industrial."
    },
    {
        "Subclasse":13961,
        "Designacao":"Fabricação de passamanarias e sirgarias."
    },
    {
        "Subclasse":13962,
        "Designacao":"Fabricação de outros têxteis para uso técnico e industrial, n. e."
    },
    {
        "Classe":1399,
        "Designacao":"Fabricação de outros têxteis, n. e."
    },
    {
        "Subclasse":13991,
        "Designacao":"Fabricação de bordados."
    },
    {
        "Subclasse":13992,
        "Designacao":"Fabricação de rendas."
    },
    {
        "Subclasse":13993,
        "Designacao":"Fabricação de outros têxteis diversos, n. e."
    },
    {
        "Divisao":14,
        "Designacao":"Indústria do vestuário."
    },
    {
        "Grupo":141,
        "Classe":1410,
        "Designacao":"Fabricação de vestuário de malha."
    },
    {
        "Subclasse":14101,
        "Designacao":"Fabricação de meias e similares de malha."
    },
    {
        "Subclasse":14102,
        "Designacao":"Fabricação de outro vestuário de malha."
    },
    {
        "Grupo":142,
        "Designacao":"Confeção de outros artigos e acessórios de vestuário."
    },
    {
        "Classe":1421,
        "Designacao":"Confeção de vestuário exterior."
    },
    {
        "Subclasse":14211,
        "Designacao":"Confeção de vestuário exterior em série."
    },
    {
        "Subclasse":14212,
        "Designacao":"Confeção de vestuário exterior por medida."
    },
    {
        "Subclasse":14213,
        "Designacao":"Atividades de acabamento de artigos de vestuário."
    },
    {
        "Classe":1422,
        "Subclasse":14220,
        "Designacao":"Confeção de vestuário interior."
    },
    {
        "Classe":1423,
        "Subclasse":14230,
        "Designacao":"Confeção de vestuário de trabalho."
    },
    {
        "Classe":1424,
        "Designacao":"Confeção de vestuário em couro e de artigos de peles com pelo."
    },
    {
        "Subclasse":14241,
        "Designacao":"Confeção de vestuário em couro."
    },
    {
        "Subclasse":14242,
        "Designacao":"Confeção de artigos de peles com pelo."
    },
    {
        "Classe":1429,
        "Subclasse":14290,
        "Designacao":"Confeção de outros artigos e acessórios de vestuário, n. e."
    },
    {
        "Divisao":15,
        "Designacao":"Indústria do couro, dos produtos do couro e produtos similares de outros materiais."
    },
    {
        "Grupo":151,
        "Designacao":"Curtimenta, tingimento e acabamento de couro e peles com pelo; fabricação de artigos de viagem, marroquinaria, arreios e selas."
    },
    {
        "Classe":1511,
        "Designacao":"Curtimenta, acabamento e tingimento de couros e peles com pelo."
    },
    {
        "Subclasse":15111,
        "Designacao":"Curtimenta, acabamento e tingimento de peles sem pelo."
    },
    {
        "Subclasse":15112,
        "Designacao":"Fabricação de couro reconstituído."
    },
    {
        "Subclasse":15113,
        "Designacao":"Curtimenta e acabamento de peles com pelo."
    },
    {
        "Classe":1512,
        "Subclasse":15120,
        "Designacao":"Fabricação de artigos de viagem, marroquinaria, arreios e selas de qualquer material."
    },
    {
        "Grupo":152,
        "Classe":1520,
        "Designacao":"Indústria do calçado."
    },
    {
        "Subclasse":15201,
        "Designacao":"Fabricação de calçado."
    },
    {
        "Subclasse":15202,
        "Designacao":"Fabricação de componentes para calçado."
    },
    {
        "Divisao":16,
        "Designacao":"Indústria da madeira e dos produtos da madeira e cortiça, exceto mobiliário; Fabricação de artigos de espartaria e cestaria."
    },
    {
        "Grupo":161,
        "Designacao":"Serração e aplainamento da madeira; processamento e acabamento da madeira."
    },
    {
        "Classe":1611,
        "Subclasse":16110,
        "Designacao":"Serração e aplainamento da madeira."
    },
    {
        "Classe":1612,
        "Subclasse":16120,
        "Designacao":"Processamento e acabamento da madeira."
    },
    {
        "Grupo":162,
        "Designacao":"Fabricação de artigos de madeira, de cortiça, de espartaria e cestaria."
    },
    {
        "Classe":1621,
        "Designacao":"Fabricação de folheados e painéis à base de madeira."
    },
    {
        "Subclasse":16211,
        "Designacao":"Fabricação de painéis de partículas de madeira."
    },
    {
        "Subclasse":16212,
        "Designacao":"Fabricação de painéis de fibras de madeira."
    },
    {
        "Subclasse":16213,
        "Designacao":"Fabricação de folheados, contraplacados, lamelados e de outros painéis."
    },
    {
        "Classe":1622,
        "Subclasse":16220,
        "Designacao":"Fabricação de pavimentos em painéis montados."
    },
    {
        "Classe":1623,
        "Subclasse":16230,
        "Designacao":"Fabricação de outros produtos de carpintaria para a construção."
    },
    {
        "Classe":1624,
        "Subclasse":16240,
        "Designacao":"Fabricação de embalagens de madeira."
    },
    {
        "Classe":1625,
        "Subclasse":16250,
        "Designacao":"Fabricação de portas e janelas de madeira."
    },
    {
        "Classe":1626,
        "Subclasse":16260,
        "Designacao":"Fabricação de combustíveis sólidos a partir de biomassa vegetal."
    },
    {
        "Classe":1627,
        "Subclasse":16270,
        "Designacao":"Acabamento de produtos de madeira."
    },
    {
        "Classe":1628,
        "Designacao":"Fabricação de outros produtos de madeira e artigos de cortiça, de espartaria e cestaria."
    },
    {
        "Subclasse":16281,
        "Designacao":"Fabricação de outras obras de madeira."
    },
    {
        "Subclasse":16282,
        "Designacao":"Fabricação de obras de cestaria e de espartaria."
    },
    {
        "Subclasse":16283,
        "Designacao":"Indústria de preparação da cortiça."
    },
    {
        "Subclasse":16284,
        "Designacao":"Fabricação de rolhas de cortiça."
    },
    {
        "Subclasse":16285,
        "Designacao":"Fabricação de outros produtos de cortiça."
    },
    {
        "Divisao":17,
        "Designacao":"Fabricação de papel e produtos do papel."
    },
    {
        "Grupo":171,
        "Designacao":"Fabricação de pasta, de papel e cartão (exceto canelado)."
    },
    {
        "Classe":1711,
        "Subclasse":17110,
        "Designacao":"Fabricação de pasta."
    },
    {
        "Classe":1712,
        "Subclasse":17120,
        "Designacao":"Fabricação de papel e de cartão (exceto canelado)."
    },
    {
        "Grupo":172,
        "Designacao":"Fabricação de artigos de papel e de cartão."
    },
    {
        "Classe":1721,
        "Designacao":"Fabricação de papel e de cartão canelados e de embalagens de papel e cartão."
    },
    {
        "Subclasse":17211,
        "Designacao":"Fabricação de papel e de cartão canelados (inclui embalagens)."
    },
    {
        "Subclasse":17212,
        "Designacao":"Fabricação de outras embalagens de papel e de cartão."
    },
    {
        "Classe":1722,
        "Subclasse":17220,
        "Designacao":"Fabricação de artigos de papel para uso doméstico e sanitário."
    },
    {
        "Classe":1723,
        "Subclasse":17230,
        "Designacao":"Fabricação de artigos de papel para papelaria."
    },
    {
        "Classe":1724,
        "Subclasse":17240,
        "Designacao":"Fabricação de papel de parede."
    },
    {
        "Classe":1725,
        "Subclasse":17250,
        "Designacao":"Fabricação de outros artigos de papel e de cartão."
    },
    {
        "Divisao":18,
        "Designacao":"Impressão e reprodução de suportes gravados."
    },
    {
        "Grupo":181,
        "Designacao":"Impressão e serviços relacionados com a impressão."
    },
    {
        "Classe":1811,
        "Subclasse":18110,
        "Designacao":"Impressão de jornais."
    },
    {
        "Classe":1812,
        "Subclasse":18120,
        "Designacao":"Outra impressão."
    },
    {
        "Classe":1813,
        "Subclasse":18130,
        "Designacao":"Serviços de pré-impressão e pré-media."
    },
    {
        "Classe":1814,
        "Subclasse":18140,
        "Designacao":"Encadernação e atividades relacionadas."
    },
    {
        "Grupo":182,
        "Classe":1820,
        "Subclasse":18200,
        "Designacao":"Reprodução de suportes gravados."
    },
    {
        "Divisao":19,
        "Designacao":"Fabricação de coque e de produtos petrolíferos refinados."
    },
    {
        "Grupo":191,
        "Classe":1910,
        "Subclasse":19100,
        "Designacao":"Fabricação de produtos de coqueria."
    },
    {
        "Grupo":192,
        "Classe":1920,
        "Designacao":"Fabricação de produtos petrolíferos refinados e de produtos de combustíveis fósseis."
    },
    {
        "Subclasse":19201,
        "Designacao":"Fabricação de produtos petrolíferos refinados."
    },
    {
        "Subclasse":19202,
        "Designacao":"Fabricação de produtos petrolíferos a partir de resíduos."
    },
    {
        "Subclasse":19203,
        "Designacao":"Fabricação de briquetes e aglomerados de hulha e lenhite."
    },
    {
        "Divisao":20,
        "Designacao":"Fabricação de produtos químicos e de fibras sintéticas e artificiais."
    },
    {
        "Grupo":201,
        "Designacao":"Fabricação de produtos químicos de base, adubos e compostos azotados, matérias plásticas e borracha sintética, sob formas primárias."
    },
    {
        "Classe":2011,
        "Subclasse":20110,
        "Designacao":"Fabricação de gases industriais."
    },
    {
        "Classe":2012,
        "Subclasse":20120,
        "Designacao":"Fabricação de corantes e pigmentos."
    },
    {
        "Classe":2013,
        "Subclasse":20130,
        "Designacao":"Fabricação de outros produtos químicos inorgânicos de base."
    },
    {
        "Classe":2014,
        "Designacao":"Fabricação de outros produtos químicos orgânicos de base."
    },
    {
        "Subclasse":20141,
        "Designacao":"Fabricação de resinosos e seus derivados."
    },
    {
        "Subclasse":20142,
        "Designacao":"Fabricação de carvão (vegetal e animal) e produtos associados."
    },
    {
        "Subclasse":20143,
        "Designacao":"Fabricação de álcool etílico de fermentação."
    },
    {
        "Subclasse":20144,
        "Designacao":"Fabricação de outros produtos químicos orgânicos de base, n. e."
    },
    {
        "Classe":2015,
        "Designacao":"Fabricação de adubos e de compostos azotados."
    },
    {
        "Subclasse":20151,
        "Designacao":"Fabricação de adubos químicos ou minerais e de compostos azotados."
    },
    {
        "Subclasse":20152,
        "Designacao":"Fabricação de adubos orgânicos e organo-minerais."
    },
    {
        "Classe":2016,
        "Subclasse":20160,
        "Designacao":"Fabricação de matérias plásticas em formas primárias."
    },
    {
        "Classe":2017,
        "Subclasse":20170,
        "Designacao":"Fabricação de borracha sintética em formas primárias."
    },
    {
        "Grupo":202,
        "Classe":2020,
        "Subclasse":20200,
        "Designacao":"Fabricação de pesticidas, desinfetantes e outros produtos agroquímicos."
    },
    {
        "Grupo":203,
        "Classe":2030,
        "Designacao":"Fabricação de tintas, vernizes e produtos similares, tintas de impressão e mástiques."
    },
    {
        "Subclasse":20301,
        "Designacao":"Fabricação de tintas (exceto impressão), vernizes, mastiques e produtos similares."
    },
    {
        "Subclasse":20302,
        "Designacao":"Fabricação de tintas de impressão."
    },
    {
        "Subclasse":20303,
        "Designacao":"Fabricação de pigmentos preparados, composições vitrificáveis e afins."
    },
    {
        "Grupo":204,
        "Designacao":"Fabricação de produtos para lavagem, limpeza e polimento."
    },
    {
        "Classe":2041,
        "Designacao":"Fabricação de sabões e detergentes, produtos de limpeza e de polimento."
    },
    {
        "Subclasse":20411,
        "Designacao":"Fabricação de sabões, detergentes e glicerina."
    },
    {
        "Subclasse":20412,
        "Designacao":"Fabricação de produtos de limpeza, polimento e proteção."
    },
    {
        "Classe":2042,
        "Subclasse":20420,
        "Designacao":"Fabricação de perfumes, de cosméticos e de produtos de higiene."
    },
    {
        "Grupo":205,
        "Designacao":"Fabricação de outros produtos químicos."
    },
    {
        "Classe":2051,
        "Subclasse":20510,
        "Designacao":"Fabricação de biocombustíveis líquidos."
    },
    {
        "Classe":2059,
        "Designacao":"Fabricação de outros produtos químicos, n. e."
    },
    {
        "Subclasse":20591,
        "Designacao":"Fabricação de explosivos e artigos de pirotecnia."
    },
    {
        "Subclasse":20592,
        "Designacao":"Fabricação de colas."
    },
    {
        "Subclasse":20593,
        "Designacao":"Fabricação de óleos essenciais."
    },
    {
        "Subclasse":20594,
        "Designacao":"Fabricação de produtos químicos auxiliares para uso industrial."
    },
    {
        "Subclasse":20595,
        "Designacao":"Fabricação de outros produtos químicos diversos, n. e."
    },
    {
        "Grupo":206,
        "Classe":2060,
        "Subclasse":20600,
        "Designacao":"Fabricação de fibras sintéticas ou artificiais."
    },
    {
        "Divisao":21,
        "Designacao":"Fabricação de produtos farmacêuticos de base e de preparações farmacêuticas."
    },
    {
        "Grupo":211,
        "Classe":2110,
        "Subclasse":21100,
        "Designacao":"Fabricação de produtos farmacêuticos de base."
    },
    {
        "Grupo":212,
        "Classe":2120,
        "Designacao":"Fabricação de preparações farmacêuticas."
    },
    {
        "Subclasse":21201,
        "Designacao":"Fabricação de medicamentos."
    },
    {
        "Subclasse":21202,
        "Designacao":"Fabricação de outras preparações e de artigos farmacêuticos."
    },
    {
        "Divisao":22,
        "Designacao":"Fabricação de artigos de borracha e de matérias plásticas."
    },
    {
        "Grupo":221,
        "Designacao":"Fabricação de artigos de borracha."
    },
    {
        "Classe":2211,
        "Designacao":"Fabricação, recauchutagem e reconstrução de pneus e fabricação de câmaras de ar."
    },
    {
        "Subclasse":22111,
        "Designacao":"Fabricação de pneus e câmaras de ar."
    },
    {
        "Subclasse":22112,
        "Designacao":"Reconstrução de pneus."
    },
    {
        "Classe":2212,
        "Subclasse":22120,
        "Designacao":"Fabricação de outros produtos de borracha."
    },
    {
        "Grupo":222,
        "Designacao":"Fabricação de artigos de matérias plásticas."
    },
    {
        "Classe":2221,
        "Subclasse":22210,
        "Designacao":"Fabricação de chapas, folhas, tubos e perfis de plástico."
    },
    {
        "Classe":2222,
        "Subclasse":22220,
        "Designacao":"Fabricação de embalagens de plástico."
    },
    {
        "Classe":2223,
        "Subclasse":22230,
        "Designacao":"Fabricação de portas e janelas de plástico."
    },
    {
        "Classe":2224,
        "Subclasse":22240,
        "Designacao":"Fabricação de artigos de plástico para a construção."
    },
    {
        "Classe":2225,
        "Subclasse":22250,
        "Designacao":"Processamento e acabamento de produtos de plástico."
    },
    {
        "Classe":2226,
        "Subclasse":22260,
        "Designacao":"Fabricação de outros artigos de plástico."
    },
    {
        "Divisao":23,
        "Designacao":"Fabricação de outros produtos minerais não metálicos."
    },
    {
        "Grupo":231,
        "Designacao":"Fabricação de vidro e artigos de vidro."
    },
    {
        "Classe":2311,
        "Subclasse":23110,
        "Designacao":"Fabricação de vidro plano."
    },
    {
        "Classe":2312,
        "Subclasse":23120,
        "Designacao":"Moldagem e processamento de vidro plano."
    },
    {
        "Classe":2313,
        "Designacao":"Fabricação de vidro de embalagem e cristalaria (vidro oco)."
    },
    {
        "Subclasse":23131,
        "Designacao":"Fabricação de vidro de embalagem."
    },
    {
        "Subclasse":23132,
        "Designacao":"Cristalaria."
    },
    {
        "Classe":2314,
        "Subclasse":23140,
        "Designacao":"Fabricação de fibras de vidro."
    },
    {
        "Classe":2315,
        "Subclasse":23150,
        "Designacao":"Fabricação e processamento de outro vidro (incluindo vidro técnico)."
    },
    {
        "Grupo":232,
        "Classe":2320,
        "Subclasse":23200,
        "Designacao":"Fabricação de produtos cerâmicos refratários."
    },
    {
        "Grupo":233,
        "Designacao":"Fabricação de produtos de barro para a construção."
    },
    {
        "Classe":2331,
        "Designacao":"Fabricação de azulejos, ladrilhos, mosaicos e lajes de cerâmica."
    },
    {
        "Subclasse":23311,
        "Designacao":"Fabricação de azulejos."
    },
    {
        "Subclasse":23312,
        "Designacao":"Fabricação de ladrilhos, mosaicos e lajes de cerâmica."
    },
    {
        "Classe":2332,
        "Designacao":"Fabricação de tijolos, telhas e de outros produtos de barro para a construção."
    },
    {
        "Subclasse":23321,
        "Designacao":"Fabricação de tijolos e abobadilhas."
    },
    {
        "Subclasse":23322,
        "Designacao":"Fabricação de telhas."
    },
    {
        "Subclasse":23323,
        "Designacao":"Fabricação de outros produtos de cerâmicos para a construção."
    },
    {
        "Grupo":234,
        "Designacao":"Fabricação de outros produtos de porcelana e cerâmica."
    },
    {
        "Classe":2341,
        "Designacao":"Fabricação de artigos cerâmicos de uso doméstico e ornamental."
    },
    {
        "Subclasse":23411,
        "Designacao":"Olaria de barro."
    },
    {
        "Subclasse":23412,
        "Designacao":"Fabricação de artigos de uso doméstico de faiança, porcelana e grés fino."
    },
    {
        "Subclasse":23413,
        "Designacao":"Fabricação de artigos de ornamentação de faiança, porcelana e grés fino."
    },
    {
        "Subclasse":23414,
        "Designacao":"Atividades de decoração de artigos cerâmicos de uso doméstico e ornamental."
    },
    {
        "Classe":2342,
        "Subclasse":23420,
        "Designacao":"Fabricação de artigos cerâmicos para usos sanitários."
    },
    {
        "Classe":2343,
        "Subclasse":23430,
        "Designacao":"Fabricação de isoladores e peças isolantes em cerâmica."
    },
    {
        "Classe":2344,
        "Subclasse":23440,
        "Designacao":"Fabricação de outros produtos em cerâmica para usos técnicos."
    },
    {
        "Classe":2345,
        "Subclasse":23450,
        "Designacao":"Fabricação de outros produtos cerâmicos."
    },
    {
        "Grupo":235,
        "Designacao":"Fabricação de cimento, cal e gesso."
    },
    {
        "Classe":2351,
        "Subclasse":23510,
        "Designacao":"Fabricação de cimento."
    },
    {
        "Classe":2352,
        "Designacao":"Fabricação de cal e gesso."
    },
    {
        "Subclasse":23521,
        "Designacao":"Fabricação de cal."
    },
    {
        "Subclasse":23522,
        "Designacao":"Fabricação de gesso."
    },
    {
        "Grupo":236,
        "Designacao":"Fabricação de produtos de betão, cimento e gesso."
    },
    {
        "Classe":2361,
        "Subclasse":23610,
        "Designacao":"Fabricação de produtos de betão para a construção."
    },
    {
        "Classe":2362,
        "Subclasse":23620,
        "Designacao":"Fabricação de produtos de gesso para a construção."
    },
    {
        "Classe":2363,
        "Subclasse":23630,
        "Designacao":"Fabricação de betão pronto."
    },
    {
        "Classe":2364,
        "Subclasse":23640,
        "Designacao":"Fabricação de argamassas."
    },
    {
        "Classe":2365,
        "Subclasse":23650,
        "Designacao":"Fabricação de produtos de fibrocimento."
    },
    {
        "Classe":2366,
        "Subclasse":23660,
        "Designacao":"Fabricação de outros produtos de betão, cimento e gesso."
    },
    {
        "Grupo":237,
        "Classe":2370,
        "Designacao":"Serragem, corte e acabamento de pedra."
    },
    {
        "Subclasse":23701,
        "Designacao":"Fabricação de artigos de mármore e de rochas similares."
    },
    {
        "Subclasse":23702,
        "Designacao":"Fabricação de artigos em ardósia (lousa)."
    },
    {
        "Subclasse":23703,
        "Designacao":"Fabricação de artigos de granito e de rochas, n. e."
    },
    {
        "Grupo":239,
        "Designacao":"Fabricação de produtos abrasivos e produtos minerais não metálicos, n. e."
    },
    {
        "Classe":2391,
        "Subclasse":23910,
        "Designacao":"Fabricação de produtos abrasivos."
    },
    {
        "Classe":2399,
        "Designacao":"Fabricação de outros produtos minerais não metálicos, n. e."
    },
    {
        "Subclasse":23991,
        "Designacao":"Fabricação de misturas betuminosas."
    },
    {
        "Subclasse":23992,
        "Designacao":"Fabricação de outros produtos minerais não metálicos diversos, n. e."
    },
    {
        "Divisao":24,
        "Designacao":"Indústrias metalúrgicas de base."
    },
    {
        "Grupo":241,
        "Classe":2410,
        "Subclasse":24100,
        "Designacao":"Siderurgia e fabricação de ferro-ligas."
    },
    {
        "Grupo":242,
        "Classe":2420,
        "Subclasse":24200,
        "Designacao":"Fabricação de tubos, condutas, perfis ocos e respetivos acessórios, de aço."
    },
    {
        "Grupo":243,
        "Designacao":"Fabricação de outros produtos da primeira transformação do aço."
    },
    {
        "Classe":2431,
        "Subclasse":24310,
        "Designacao":"Estiragem a frio de barras."
    },
    {
        "Classe":2432,
        "Subclasse":24320,
        "Designacao":"Laminagem a frio de arco ou banda."
    },
    {
        "Classe":2433,
        "Subclasse":24330,
        "Designacao":"Perfilagem a frio."
    },
    {
        "Classe":2434,
        "Subclasse":24340,
        "Designacao":"Trefilagem a frio."
    },
    {
        "Grupo":244,
        "Designacao":"Produção de metais básicos e preciosos e outros metais não ferrosos."
    },
    {
        "Classe":2441,
        "Subclasse":24410,
        "Designacao":"Produção de metais preciosos."
    },
    {
        "Classe":2442,
        "Subclasse":24420,
        "Designacao":"Produção de alumínio."
    },
    {
        "Classe":2443,
        "Subclasse":24430,
        "Designacao":"Produção de chumbo, zinco e estanho."
    },
    {
        "Classe":2444,
        "Subclasse":24440,
        "Designacao":"Produção de cobre."
    },
    {
        "Classe":2445,
        "Subclasse":24450,
        "Designacao":"Produção de outros metais não ferrosos."
    },
    {
        "Classe":2446,
        "Subclasse":24460,
        "Designacao":"Processamento de combustível nuclear."
    },
    {
        "Grupo":245,
        "Designacao":"Fundição de metais."
    },
    {
        "Classe":2451,
        "Subclasse":24510,
        "Designacao":"Fundição de ferro."
    },
    {
        "Classe":2452,
        "Subclasse":24520,
        "Designacao":"Fundição de aço."
    },
    {
        "Classe":2453,
        "Subclasse":24530,
        "Designacao":"Fundição de metais leves."
    },
    {
        "Classe":2454,
        "Subclasse":24540,
        "Designacao":"Fundição de outros metais não ferrosos."
    },
    {
        "Divisao":25,
        "Designacao":"Fabricação de produtos metálicos, exceto máquinas e equipamentos."
    },
    {
        "Grupo":251,
        "Designacao":"Fabricação de elementos de construção em metal."
    },
    {
        "Classe":2511,
        "Subclasse":25110,
        "Designacao":"Fabricação de estruturas e partes de estruturas metálicas."
    },
    {
        "Classe":2512,
        "Subclasse":25120,
        "Designacao":"Fabricação de portas e janelas metálicas."
    },
    {
        "Grupo":252,
        "Designacao":"Fabricação de tanques, reservatórios e contentores metálicos."
    },
    {
        "Classe":2521,
        "Designacao":"Fabricação de radiadores para aquecimento central, geradores de vapor e caldeiras."
    },
    {
        "Subclasse":25211,
        "Designacao":"Fabricação de radiadores para aquecimento central e caldeiras."
    },
    {
        "Subclasse":25212,
        "Designacao":"Fabricação de geradores de vapor."
    },
    {
        "Classe":2522,
        "Subclasse":25220,
        "Designacao":"Fabricação de outros tanques, reservatórios e contentores metálicos."
    },
    {
        "Grupo":253,
        "Classe":2530,
        "Designacao":"Fabricação de armas e munições."
    },
    {
        "Subclasse":25301,
        "Designacao":"Fabricação de armas de caça, de desporto e defesa."
    },
    {
        "Subclasse":25302,
        "Designacao":"Fabricação de armamento."
    },
    {
        "Grupo":254,
        "Classe":2540,
        "Subclasse":25400,
        "Designacao":"Forjamento e moldagem de metais e pulverometalurgia."
    },
    {
        "Grupo":255,
        "Designacao":"Tratamento e revestimento de metais; atividades de maquinagem de metais."
    },
    {
        "Classe":2551,
        "Subclasse":25510,
        "Designacao":"Revestimento de metais."
    },
    {
        "Classe":2552,
        "Subclasse":25520,
        "Designacao":"Tratamento térmico de metais."
    },
    {
        "Classe":2553,
        "Subclasse":25530,
        "Designacao":"Maquinagem de metais."
    },
    {
        "Grupo":256,
        "Designacao":"Fabricação de cutelaria, ferramentas e ferragens."
    },
    {
        "Classe":2561,
        "Subclasse":25610,
        "Designacao":"Fabricação de cutelaria."
    },
    {
        "Classe":2562,
        "Subclasse":25620,
        "Designacao":"Fabricação de fechaduras, dobradiças e outras ferragens."
    },
    {
        "Classe":2563,
        "Designacao":"Fabricação de ferramentas."
    },
    {
        "Subclasse":25631,
        "Designacao":"Fabricação de ferramentas manuais."
    },
    {
        "Subclasse":25632,
        "Designacao":"Fabricação de ferramentas mecânicas."
    },
    {
        "Subclasse":25633,
        "Designacao":"Fabricação de peças sinterizadas."
    },
    {
        "Subclasse":25634,
        "Designacao":"Fabricação de moldes metálicos."
    },
    {
        "Grupo":259,
        "Designacao":"Fabricação de outros produtos metálicos."
    },
    {
        "Classe":2591,
        "Subclasse":25910,
        "Designacao":"Fabricação de bidões, tonéis e outros recipientes similares de aço."
    },
    {
        "Classe":2592,
        "Subclasse":25920,
        "Designacao":"Fabricação de embalagens metálicas ligeiras."
    },
    {
        "Classe":2593,
        "Designacao":"Fabricação de produtos de arame, correntes e molas metálicas."
    },
    {
        "Subclasse":25931,
        "Designacao":"Fabricação de produtos de arame."
    },
    {
        "Subclasse":25932,
        "Designacao":"Fabricação de molas."
    },
    {
        "Subclasse":25933,
        "Designacao":"Fabricação de correntes metálicas."
    },
    {
        "Classe":2594,
        "Subclasse":25940,
        "Designacao":"Fabricação de rebites, parafusos e porcas."
    },
    {
        "Classe":2599,
        "Designacao":"Fabricação de outros produtos metálicos, n. e."
    },
    {
        "Subclasse":25991,
        "Designacao":"Fabricação de louça metálica e artigos de uso doméstico."
    },
    {
        "Subclasse":25992,
        "Designacao":"Fabricação de outros produtos metálicos diversos, n. e."
    },
    {
        "Divisao":26,
        "Designacao":"Fabricação de equipamentos informáticos e para comunicações, produtos eletrónicos e óticos."
    },
    {
        "Grupo":261,
        "Designacao":"Fabricação de componentes e placas eletrónicos."
    },
    {
        "Classe":2611,
        "Subclasse":26110,
        "Designacao":"Fabricação de componentes eletrónicos."
    },
    {
        "Classe":2612,
        "Subclasse":26120,
        "Designacao":"Fabricação de placas de circuitos eletrónicos."
    },
    {
        "Grupo":262,
        "Classe":2620,
        "Subclasse":26200,
        "Designacao":"Fabricação de computadores e de equipamento periférico."
    },
    {
        "Grupo":263,
        "Classe":2630,
        "Subclasse":26300,
        "Designacao":"Fabricação de aparelhos e de equipamentos para comunicações."
    },
    {
        "Grupo":264,
        "Classe":2640,
        "Subclasse":26400,
        "Designacao":"Fabricação de produtos eletrónicos de consumo."
    },
    {
        "Grupo":265,
        "Designacao":"Fabricação de instrumentos de medição e verificação, relógios e material de relojoaria."
    },
    {
        "Classe":2651,
        "Designacao":"Fabricação de instrumentos e aparelhos de medição, verificação e navegação."
    },
    {
        "Subclasse":26511,
        "Designacao":"Fabricação de contadores de eletricidade, gás, água e de outros líquidos."
    },
    {
        "Subclasse":26512,
        "Designacao":"Fabricação de instrumentos e aparelhos de medida, verificação, navegação e outros fins, n. e."
    },
    {
        "Classe":2652,
        "Subclasse":26520,
        "Designacao":"Fabricação de relógios e material de relojoaria."
    },
    {
        "Grupo":266,
        "Classe":2660,
        "Subclasse":26600,
        "Designacao":"Fabricação de equipamentos de irradiação, eletromedicina e eletroterapêutico."
    },
    {
        "Grupo":267,
        "Classe":2670,
        "Designacao":"Fabricação de instrumentos óticos, suportes de informação magnéticos e óticos e equipamentos fotográficos."
    },
    {
        "Subclasse":26701,
        "Designacao":"Fabricação de instrumentos e equipamentos óticos não oftálmicos e suportes de informação magnéticos e óticos."
    },
    {
        "Subclasse":26702,
        "Designacao":"Fabricação de material fotográfico e cinematográfico."
    },
    {
        "Divisao":27,
        "Designacao":"Fabricação de equipamento elétrico."
    },
    {
        "Grupo":271,
        "Designacao":"Fabricação de motores, geradores e transformadores elétricos e fabricação de material de distribuição e de controlo para instalações elétricas."
    },
    {
        "Classe":2711,
        "Subclasse":27110,
        "Designacao":"Fabricação de motores, geradores e transformadores elétricos."
    },
    {
        "Classe":2712,
        "Designacao":"Fabricação de material de distribuição e de controlo para instalações elétricas."
    },
    {
        "Subclasse":27121,
        "Designacao":"Fabricação de material de distribuição e de controlo para instalações elétricas de alta tensão."
    },
    {
        "Subclasse":27122,
        "Designacao":"Fabricação de material de distribuição e de controlo para instalações elétricas de baixa tensão."
    },
    {
        "Grupo":272,
        "Classe":2720,
        "Subclasse":27200,
        "Designacao":"Fabricação de acumuladores e pilhas."
    },
    {
        "Grupo":273,
        "Designacao":"Fabricação de fios e cabos isolados e seus acessórios."
    },
    {
        "Classe":2731,
        "Subclasse":27310,
        "Designacao":"Fabricação de cabos de fibra ótica."
    },
    {
        "Classe":2732,
        "Subclasse":27320,
        "Designacao":"Fabricação de outros fios e cabos elétricos e eletrónicos."
    },
    {
        "Classe":2733,
        "Subclasse":27330,
        "Designacao":"Fabricação de acessórios para fios e cabos."
    },
    {
        "Grupo":274,
        "Classe":2740,
        "Subclasse":27400,
        "Designacao":"Fabricação de material de iluminação."
    },
    {
        "Grupo":275,
        "Designacao":"Fabricação de aparelhos para uso doméstico."
    },
    {
        "Classe":2751,
        "Subclasse":27510,
        "Designacao":"Fabricação de aparelhos eletrodomésticos."
    },
    {
        "Classe":2752,
        "Subclasse":27520,
        "Designacao":"Fabricação de aparelhos não elétricos para uso doméstico."
    },
    {
        "Grupo":279,
        "Classe":2790,
        "Subclasse":27900,
        "Designacao":"Fabricação de outro equipamento elétrico."
    },
    {
        "Divisao":28,
        "Designacao":"Fabricação de máquinas e equipamentos, n. e."
    },
    {
        "Grupo":281,
        "Designacao":"Fabricação de máquinas e de equipamentos para uso geral."
    },
    {
        "Classe":2811,
        "Subclasse":28110,
        "Designacao":"Fabricação de motores e turbinas, exceto motores para aeronaves, automóveis e motociclos e ciclomotores."
    },
    {
        "Classe":2812,
        "Subclasse":28120,
        "Designacao":"Fabricação de equipamento hidráulico e pneumático."
    },
    {
        "Classe":2813,
        "Subclasse":28130,
        "Designacao":"Fabricação de outras bombas e compressores."
    },
    {
        "Classe":2814,
        "Subclasse":28140,
        "Designacao":"Fabricação de outras torneiras e válvulas."
    },
    {
        "Classe":2815,
        "Subclasse":28150,
        "Designacao":"Fabricação de rolamentos, de engrenagens e de outros órgãos de transmissão."
    },
    {
        "Grupo":282,
        "Designacao":"Fabricação de outras máquinas para uso geral."
    },
    {
        "Classe":2821,
        "Subclasse":28210,
        "Designacao":"Fabricação de fornos e equipamento de aquecimento doméstico fixo."
    },
    {
        "Classe":2822,
        "Designacao":"Fabricação de equipamento de elevação e de movimentação."
    },
    {
        "Subclasse":28221,
        "Designacao":"Fabricação de ascensores e monta cargas, escadas e passadeiras rolantes."
    },
    {
        "Subclasse":28222,
        "Designacao":"Fabricação de equipamentos de elevação e de movimentação, n. e."
    },
    {
        "Classe":2823,
        "Subclasse":28230,
        "Designacao":"Fabricação de máquinas e equipamento de escritório (exceto computadores e equipamento periférico)."
    },
    {
        "Classe":2824,
        "Subclasse":28240,
        "Designacao":"Fabricação de máquinas-ferramentas portáteis com motor."
    },
    {
        "Classe":2825,
        "Subclasse":28250,
        "Designacao":"Fabricação de equipamento não doméstico de ar condicionado."
    },
    {
        "Classe":2829,
        "Designacao":"Fabricação de outras máquinas para uso geral, n. e."
    },
    {
        "Subclasse":28291,
        "Designacao":"Fabricação de máquinas de acondicionamento e de embalagem."
    },
    {
        "Subclasse":28292,
        "Designacao":"Fabricação de balanças e de outro equipamento para pesagem."
    },
    {
        "Subclasse":28293,
        "Designacao":"Fabricação de outras máquinas diversas de uso geral, n. e."
    },
    {
        "Grupo":283,
        "Classe":2830,
        "Subclasse":28300,
        "Designacao":"Fabricação de máquinas e de tratores para a agricultura, pecuária e silvicultura."
    },
    {
        "Grupo":284,
        "Designacao":"Fabricação de máquinas de moldagem de metais e máquinas-ferramentas."
    },
    {
        "Classe":2841,
        "Subclasse":28410,
        "Designacao":"Fabricação de máquinas de moldagem de metais e de máquinas-ferramentas para trabalhar metais."
    },
    {
        "Classe":2842,
        "Subclasse":28420,
        "Designacao":"Fabricação de outras máquinas-ferramentas."
    },
    {
        "Grupo":289,
        "Designacao":"Fabricação de outras máquinas e equipamento para uso específico."
    },
    {
        "Classe":2891,
        "Subclasse":28910,
        "Designacao":"Fabricação de máquinas para a metalurgia."
    },
    {
        "Classe":2892,
        "Subclasse":28920,
        "Designacao":"Fabricação de máquinas para as indústrias extrativas e para a construção."
    },
    {
        "Classe":2893,
        "Subclasse":28930,
        "Designacao":"Fabricação de máquinas para as indústrias alimentares, das bebidas e do tabaco."
    },
    {
        "Classe":2894,
        "Subclasse":28940,
        "Designacao":"Fabricação de máquinas para as indústrias têxtil, do vestuário e do couro."
    },
    {
        "Classe":2895,
        "Subclasse":28950,
        "Designacao":"Fabricação de máquinas para as indústrias do papel e do cartão."
    },
    {
        "Classe":2896,
        "Subclasse":28960,
        "Designacao":"Fabricação de máquinas para as indústrias do plástico e da borracha."
    },
    {
        "Classe":2897,
        "Subclasse":28970,
        "Designacao":"Fabricação de máquinas para o fabrico aditivo."
    },
    {
        "Classe":2899,
        "Designacao":"Fabricação de outras máquinas para uso específico, n. e."
    },
    {
        "Subclasse":28991,
        "Designacao":"Fabricação de máquinas para as indústrias de materiais de construção, cerâmica e vidro."
    },
    {
        "Subclasse":28992,
        "Designacao":"Fabricação de outras máquinas diversas para uso específico, n. e."
    },
    {
        "Divisao":29,
        "Designacao":"Fabricação de veículos a motor, reboques e semirreboques."
    },
    {
        "Grupo":291,
        "Classe":2910,
        "Subclasse":29100,
        "Designacao":"Fabricação de veículos a motor."
    },
    {
        "Grupo":292,
        "Classe":2920,
        "Subclasse":29200,
        "Designacao":"Fabricação de carroçarias para veículos a motor, reboques e semirreboques."
    },
    {
        "Grupo":293,
        "Designacao":"Fabricação de peças e acessórios para veículos a motor."
    },
    {
        "Classe":2931,
        "Subclasse":29310,
        "Designacao":"Fabricação de equipamento elétrico e eletrónico para veículos a motor."
    },
    {
        "Classe":2932,
        "Subclasse":29320,
        "Designacao":"Fabricação de outros componentes e acessórios para veículos a motor."
    },
    {
        "Divisao":30,
        "Designacao":"Fabricação de outro equipamento de transporte."
    },
    {
        "Grupo":301,
        "Designacao":"Construção naval."
    },
    {
        "Classe":3011,
        "Designacao":"Construção de embarcações e estruturas flutuantes civis."
    },
    {
        "Subclasse":30111,
        "Designacao":"Construção de embarcações metálicas e estruturas flutuantes civis, exceto de recreio e desporto."
    },
    {
        "Subclasse":30112,
        "Designacao":"Construção de embarcações não metálicas civis, exceto de recreio e desporto."
    },
    {
        "Classe":3012,
        "Subclasse":30120,
        "Designacao":"Construção de embarcações de recreio e desporto."
    },
    {
        "Classe":3013,
        "Subclasse":30130,
        "Designacao":"Construção de navios e embarcações militares"
    },
    {
        "Grupo":302,
        "Classe":3020,
        "Subclasse":30200,
        "Designacao":"Fabricação de material circulante para caminhos de ferro."
    },
    {
        "Grupo":303,
        "Designacao":"Fabricação de aeronaves, veículos espaciais e equipamento relacionado."
    },
    {
        "Classe":3031,
        "Subclasse":30310,
        "Designacao":"Fabricação de aeronaves e veículos espaciais civis e equipamento relacionado."
    },
    {
        "Classe":3032,
        "Subclasse":30320,
        "Designacao":"Fabricação de aeronaves e veículos espaciais militares e equipamento relacionado."
    },
    {
        "Grupo":304,
        "Classe":3040,
        "Subclasse":30400,
        "Designacao":"Fabricação de veículos militares de combate."
    },
    {
        "Grupo":309,
        "Designacao":"Fabricação de equipamento de transporte, n. e."
    },
    {
        "Classe":3091,
        "Subclasse":30910,
        "Designacao":"Fabricação de motociclos."
    },
    {
        "Classe":3092,
        "Subclasse":30920,
        "Designacao":"Fabricação de bicicletas e de veículos para inválidos."
    },
    {
        "Classe":3099,
        "Subclasse":30990,
        "Designacao":"Fabricação de outro equipamento de transporte, n. e."
    },
    {
        "Divisao":31,
        "Grupo":310,
        "Classe":3100,
        "Designacao":"Fabricação de mobiliário."
    },
    {
        "Subclasse":31001,
        "Designacao":"Fabricação de mobiliário para escritório e comércio."
    },
    {
        "Subclasse":31002,
        "Designacao":"Fabricação de mobiliário de cozinha."
    },
    {
        "Subclasse":31003,
        "Designacao":"Fabricação de colchoaria."
    },
    {
        "Subclasse":31004,
        "Designacao":"Fabricação de mobiliário de madeira para outros fins."
    },
    {
        "Subclasse":31005,
        "Designacao":"Fabricação de mobiliário metálico para outros fins."
    },
    {
        "Subclasse":31006,
        "Designacao":"Fabricação de mobiliário de outros materiais para outros fins."
    },
    {
        "Subclasse":31007,
        "Designacao":"Atividades de acabamento de mobiliário."
    },
    {
        "Divisao":32,
        "Designacao":"Outras indústrias transformadoras."
    },
    {
        "Grupo":321,
        "Designacao":"Fabricação de joalharia, ourivesaria, bijutaria e artigos similares."
    },
    {
        "Classe":3211,
        "Subclasse":32110,
        "Designacao":"Cunhagem de moedas."
    },
    {
        "Classe":3212,
        "Designacao":"Fabricação de joalharia, ourivesaria e artigos similares."
    },
    {
        "Subclasse":32121,
        "Designacao":"Fabricação de filigranas."
    },
    {
        "Subclasse":32122,
        "Designacao":"Fabricação de artigos de joalharia e de outros artigos de ourivesaria."
    },
    {
        "Subclasse":32123,
        "Designacao":"Trabalho de diamantes e de outras pedras preciosas ou semipreciosas para joalharia e uso industrial."
    },
    {
        "Classe":3213,
        "Subclasse":32130,
        "Designacao":"Fabricação de bijutarias."
    },
    {
        "Grupo":322,
        "Classe":3220,
        "Subclasse":32200,
        "Designacao":"Fabricação de instrumentos musicais."
    },
    {
        "Grupo":323,
        "Classe":3230,
        "Subclasse":32300,
        "Designacao":"Fabricação de artigos de desporto."
    },
    {
        "Grupo":324,
        "Classe":3240,
        "Subclasse":32400,
        "Designacao":"Fabricação de jogos e de brinquedos."
    },
    {
        "Grupo":325,
        "Classe":3250,
        "Designacao":"Fabricação de instrumentos e materiais médicos e dentários."
    },
    {
        "Subclasse":32501,
        "Designacao":"Fabricação de material ótico oftálmico."
    },
    {
        "Subclasse":32502,
        "Designacao":"Fabricação de material ortopédico e próteses e de instrumentos médico-cirúrgicos."
    },
    {
        "Grupo":329,
        "Designacao":"Indústrias transformadoras, n. e."
    },
    {
        "Classe":3291,
        "Subclasse":32910,
        "Designacao":"Fabricação de vassouras, escovas e pincéis."
    },
    {
        "Classe":3299,
        "Designacao":"Outras indústrias transformadoras, n. e."
    },
    {
        "Subclasse":32991,
        "Designacao":"Fabricação de canetas, lápis e similares."
    },
    {
        "Subclasse":32992,
        "Designacao":"Fabricação de fechos de correr, botões e similares."
    },
    {
        "Subclasse":32993,
        "Designacao":"Fabricação de guarda-sóis e chapéus de chuva."
    },
    {
        "Subclasse":32994,
        "Designacao":"Fabricação de equipamento de proteção e segurança."
    },
    {
        "Subclasse":32995,
        "Designacao":"Fabricação de caixões mortuários em madeira."
    },
    {
        "Subclasse":32996,
        "Designacao":"Outras indústrias transformadoras diversas, n. e."
    },
    {
        "Divisao":33,
        "Designacao":"Reparação, manutenção e instalação de máquinas e equipamentos."
    },
    {
        "Grupo":331,
        "Designacao":"Reparação e manutenção de produtos metálicos, máquinas e equipamento."
    },
    {
        "Classe":3311,
        "Subclasse":33110,
        "Designacao":"Reparação e manutenção de produtos metálicos."
    },
    {
        "Classe":3312,
        "Subclasse":33120,
        "Designacao":"Reparação e manutenção de máquinas."
    },
    {
        "Classe":3313,
        "Subclasse":33130,
        "Designacao":"Reparação e manutenção de equipamento eletrónico e ótico."
    },
    {
        "Classe":3314,
        "Subclasse":33140,
        "Designacao":"Reparação e manutenção de equipamento elétrico."
    },
    {
        "Classe":3315,
        "Subclasse":33150,
        "Designacao":"Reparação e manutenção de embarcações civis."
    },
    {
        "Classe":3316,
        "Subclasse":33160,
        "Designacao":"Reparação e manutenção de aeronaves e de veículos espaciais civis."
    },
    {
        "Classe":3317,
        "Subclasse":33170,
        "Designacao":"Reparação e manutenção de outro equipamento de transporte civil."
    },
    {
        "Classe":3318,
        "Subclasse":33180,
        "Designacao":"Reparação e manutenção de veículos de combate, navios, embarcações, aeronaves e veículos espaciais militares."
    },
    {
        "Classe":3319,
        "Subclasse":33190,
        "Designacao":"Reparação e manutenção de outro equipamento."
    },
    {
        "Grupo":332,
        "Classe":3320,
        "Subclasse":33200,
        "Designacao":"Instalação de máquinas e de equipamentos industriais."
    },
    {
        "Seccao":"D",
        "Designacao":"Produção e distribuição de eletricidade, gás, vapor e ar condicionado."
    },
    {
        "Divisao":35,
        "Designacao":"Produção e distribuição de eletricidade, gás, vapor e ar condicionado."
    },
    {
        "Grupo":351,
        "Designacao":"Produção, transporte e distribuição de energia elétrica."
    },
    {
        "Classe":3511,
        "Subclasse":35110,
        "Designacao":"Produção de eletricidade a partir de fontes não renováveis."
    },
    {
        "Classe":3512,
        "Designacao":"Produção de eletricidade a partir de fontes renováveis."
    },
    {
        "Subclasse":35121,
        "Designacao":"Produção de eletricidade de origem hídrica."
    },
    {
        "Subclasse":35122,
        "Designacao":"Produção de eletricidade de origem eólica."
    },
    {
        "Subclasse":35123,
        "Designacao":"Produção de eletricidade de origem solar."
    },
    {
        "Subclasse":35124,
        "Designacao":"Produção de eletricidade a partir de biomassa."
    },
    {
        "Subclasse":35125,
        "Designacao":"Produção de eletricidade de origem geotérmica e de outra origem renovável."
    },
    {
        "Classe":3513,
        "Subclasse":35130,
        "Designacao":"Transporte de eletricidade."
    },
    {
        "Classe":3514,
        "Subclasse":35140,
        "Designacao":"Distribuição de eletricidade."
    },
    {
        "Classe":3515,
        "Designacao":"Comércio de eletricidade."
    },
    {
        "Subclasse":35151,
        "Designacao":"Comércio de eletricidade, exceto para mobilidade elétrica."
    },
    {
        "Subclasse":35152,
        "Designacao":"Comércio de eletricidade para mobilidade elétrica."
    },
    {
        "Classe":3516,
        "Subclasse":35160,
        "Designacao":"Armazenamento de eletricidade."
    },
    {
        "Grupo":352,
        "Designacao":"Produção de gás e distribuição de combustíveis gasosos por condutas."
    },
    {
        "Classe":3521,
        "Subclasse":35210,
        "Designacao":"Produção de gás."
    },
    {
        "Classe":3522,
        "Subclasse":35220,
        "Designacao":"Distribuição de combustíveis gasosos por condutas."
    },
    {
        "Classe":3523,
        "Subclasse":35230,
        "Designacao":"Comércio de gás por condutas."
    },
    {
        "Classe":3524,
        "Subclasse":35240,
        "Designacao":"Armazenamento de gás como parte dos serviços de abastecimento da rede."
    },
    {
        "Grupo":353,
        "Designacao":"Produção e distribuição de vapor e ar condicionado."
    },
    {
        "Classe":3530,
        "Designacao":"Produção e distribuição de vapor e ar condicionado."
    },
    {
        "Subclasse":35301,
        "Designacao":"Produção e distribuição de vapor, água quente e fria e ar frio por conduta."
    },
    {
        "Subclasse":35302,
        "Designacao":"Produção de gelo."
    },
    {
        "Grupo":354,
        "Classe":3540,
        "Subclasse":35400,
        "Designacao":"Atividades dos corretores e agentes de energia elétrica e gás natural."
    },
    {
        "Seccao":"E",
        "Designacao":"Captação, tratamento e distribuição de água; saneamento, gestão de resíduos e despoluição."
    },
    {
        "Divisao":36,
        "Grupo":360,
        "Classe":3600,
        "Designacao":"Captação, tratamento e distribuição de água."
    },
    {
        "Subclasse":36001,
        "Designacao":"Captação e tratamento de água."
    },
    {
        "Subclasse":36002,
        "Designacao":"Distribuição de água."
    },
    {
        "Divisao":37,
        "Grupo":370,
        "Classe":3700,
        "Designacao":"Recolha e tratamento de águas residuais."
    },
    {
        "Subclasse":37001,
        "Designacao":"Recolha e drenagem de águas residuais."
    },
    {
        "Subclasse":37002,
        "Designacao":"Tratamento de águas residuais."
    },
    {
        "Divisao":38,
        "Designacao":"Recolha, valorização e eliminação de resíduos."
    },
    {
        "Grupo":381,
        "Designacao":"Recolha de resíduos."
    },
    {
        "Classe":3811,
        "Designacao":"Recolha de resíduos não perigosos."
    },
    {
        "Subclasse":38111,
        "Designacao":"Recolha de resíduos inertes."
    },
    {
        "Subclasse":38112,
        "Designacao":"Recolha de outros resíduos não perigosos."
    },
    {
        "Classe":3812,
        "Subclasse":38120,
        "Designacao":"Recolha de resíduos perigosos."
    },
    {
        "Grupo":382,
        "Designacao":"Valorização de resíduos."
    },
    {
        "Classe":3821,
        "Designacao":"Valorização de materiais."
    },
    {
        "Subclasse":38211,
        "Designacao":"Desmantelamento de veículos automóveis, em fim de vida."
    },
    {
        "Subclasse":38212,
        "Designacao":"Desmantelamento de equipamentos elétricos e eletrónicos, em fim de vida."
    },
    {
        "Subclasse":38213,
        "Designacao":"Desmantelamento de outros equipamentos e bens, em fim de vida."
    },
    {
        "Subclasse":38214,
        "Designacao":"Valorização de resíduos metálicos."
    },
    {
        "Subclasse":38215,
        "Designacao":"Valorização de resíduos não metálicos."
    },
    {
        "Classe":3822,
        "Subclasse":38220,
        "Designacao":"Valorização energética."
    },
    {
        "Classe":3823,
        "Subclasse":38230,
        "Designacao":"Outras operações de valorizações de resíduos."
    },
    {
        "Grupo":383,
        "Designacao":"Eliminação de resíduos, sem valorização."
    },
    {
        "Classe":3831,
        "Subclasse":38310,
        "Designacao":"Incineração sem valorização energética."
    },
    {
        "Classe":3832,
        "Subclasse":38320,
        "Designacao":"Deposição em aterro ou armazenamento permanente."
    },
    {
        "Classe":3833,
        "Subclasse":38330,
        "Designacao":"Outras operações de eliminação de resíduos."
    },
    {
        "Divisao":39,
        "Grupo":390,
        "Classe":3900,
        "Subclasse":39000,
        "Designacao":"Remediação e outras atividades dos serviços de gestão de resíduos."
    },
    {
        "Seccao":"F",
        "Designacao":"Construção."
    },
    {
        "Divisao":41,
        "Grupo":410,
        "Classe":4100,
        "Subclasse":41000,
        "Designacao":"Construção de edifícios residenciais e não residenciais."
    },
    {
        "Divisao":42,
        "Designacao":"Engenharia civil."
    },
    {
        "Grupo":421,
        "Designacao":"Construção de estradas e vias-férreas."
    },
    {
        "Classe":4211,
        "Subclasse":42110,
        "Designacao":"Construção de estradas e autoestradas."
    },
    {
        "Classe":4212,
        "Subclasse":42120,
        "Designacao":"Construção de vias-férreas de superfície e subterrâneas."
    },
    {
        "Classe":4213,
        "Subclasse":42130,
        "Designacao":"Construção de pontes e túneis."
    },
    {
        "Grupo":422,
        "Designacao":"Construção de redes de transporte de águas, de esgotos, de distribuição de energia, de telecomunicações e de outras redes."
    },
    {
        "Classe":4221,
        "Subclasse":42210,
        "Designacao":"Construção de redes de transporte de águas, de esgotos e de outros fluidos."
    },
    {
        "Classe":4222,
        "Subclasse":42220,
        "Designacao":"Construção de redes de transporte e distribuição de eletricidade e redes de telecomunicações."
    },
    {
        "Grupo":429,
        "Designacao":"Construção de outros projetos de engenharia civil."
    },
    {
        "Classe":4291,
        "Subclasse":42910,
        "Designacao":"Engenharia hidráulica."
    },
    {
        "Classe":4299,
        "Subclasse":42990,
        "Designacao":"Construção de outras obras de engenharia civil, n. e."
    },
    {
        "Divisao":43,
        "Designacao":"Atividades especializadas de construção."
    },
    {
        "Grupo":431,
        "Designacao":"Demolição e preparação dos locais de construção."
    },
    {
        "Classe":4311,
        "Subclasse":43110,
        "Designacao":"Demolição."
    },
    {
        "Classe":4312,
        "Subclasse":43120,
        "Designacao":"Preparação dos locais de construção."
    },
    {
        "Classe":4313,
        "Subclasse":43130,
        "Designacao":"Perfurações e sondagens."
    },
    {
        "Grupo":432,
        "Designacao":"Instalação elétrica, de canalizações e outras instalações."
    },
    {
        "Classe":4321,
        "Subclasse":43210,
        "Designacao":"Instalação elétrica."
    },
    {
        "Classe":4322,
        "Designacao":"Instalação de canalizações e de climatização."
    },
    {
        "Subclasse":43221,
        "Designacao":"Instalação de canalizações."
    },
    {
        "Subclasse":43222,
        "Designacao":"Instalação de climatização."
    },
    {
        "Classe":4323,
        "Subclasse":43230,
        "Designacao":"Instalação de isolamento."
    },
    {
        "Classe":4324,
        "Subclasse":43240,
        "Designacao":"Outras instalações em construções."
    },
    {
        "Grupo":433,
        "Designacao":"Atividades de acabamento em edifícios."
    },
    {
        "Classe":4331,
        "Subclasse":43310,
        "Designacao":"Estucagem."
    },
    {
        "Classe":4332,
        "Subclasse":43320,
        "Designacao":"Montagem de trabalhos de carpintaria e de caixilharia."
    },
    {
        "Classe":4333,
        "Subclasse":43330,
        "Designacao":"Revestimento de pavimentos e de paredes."
    },
    {
        "Classe":4334,
        "Subclasse":43340,
        "Designacao":"Pintura e colocação de vidros."
    },
    {
        "Classe":4335,
        "Subclasse":43350,
        "Designacao":"Outras atividades de acabamento em edifícios."
    },
    {
        "Grupo":434,
        "Designacao":"Atividades especializadas de construção na construção de edifícios."
    },
    {
        "Classe":4341,
        "Subclasse":43410,
        "Designacao":"Atividades de colocação de telhados e coberturas."
    },
    {
        "Classe":4342,
        "Subclasse":43420,
        "Designacao":"Outras atividades especializadas de construção na construção de edifícios."
    },
    {
        "Grupo":435,
        "Classe":4350,
        "Subclasse":43500,
        "Designacao":"Atividades especializadas de construção em engenharia civil."
    },
    {
        "Grupo":436,
        "Classe":4360,
        "Subclasse":43600,
        "Designacao":"Atividades de serviços de intermediação para serviços especializados de construção."
    },
    {
        "Grupo":439,
        "Designacao":"Outras atividades especializadas de construção."
    },
    {
        "Classe":4391,
        "Subclasse":43910,
        "Designacao":"Atividades de alvenaria e assentamento de tijolos."
    },
    {
        "Classe":4399,
        "Designacao":"Outras atividades especializadas de construção, n. e."
    },
    {
        "Subclasse":43991,
        "Designacao":"Aluguer de equipamento de construção e de demolição, com operador."
    },
    {
        "Subclasse":43992,
        "Designacao":"Outras atividades especializadas de construção diversas, n. e."
    },
    {
        "Seccao":"G",
        "Designacao":"Comércio por grosso e a retalho."
    },
    {
        "Divisao":46,
        "Designacao":"Comércio por grosso."
    },
    {
        "Grupo":461,
        "Designacao":"Agentes do comércio por grosso."
    },
    {
        "Classe":4611,
        "Subclasse":46110,
        "Designacao":"Atividades dos agentes do comércio por grosso de matérias-primas agrícolas e têxteis, animais vivos e produtos semiacabados."
    },
    {
        "Classe":4612,
        "Subclasse":46120,
        "Designacao":"Atividades dos agentes do comércio por grosso de combustíveis, minérios, metais e de produtos químicos para a indústria."
    },
    {
        "Classe":4613,
        "Subclasse":46130,
        "Designacao":"Atividades dos agentes do comércio por grosso de madeira e materiais de construção."
    },
    {
        "Classe":4614,
        "Subclasse":46140,
        "Designacao":"Atividades dos agentes do comércio por grosso de máquinas, equipamento industrial, embarcações e aeronaves."
    },
    {
        "Classe":4615,
        "Subclasse":46150,
        "Designacao":"Atividades dos agentes do comércio por grosso de mobiliário, artigos para uso doméstico e ferragens."
    },
    {
        "Classe":4616,
        "Subclasse":46160,
        "Designacao":"Atividades dos agentes do comércio por grosso de têxteis, vestuário, calçado e artigos de couro e pele."
    },
    {
        "Classe":4617,
        "Subclasse":46170,
        "Designacao":"Atividades dos agentes do comércio por grosso de produtos alimentares, bebidas e tabaco"
    },
    {
        "Classe":4618,
        "Subclasse":46180,
        "Designacao":"Atividades dos agentes do comércio por grosso de outros produtos."
    },
    {
        "Classe":4619,
        "Subclasse":46190,
        "Designacao":"Atividades dos agentes do comércio por grosso não especializado."
    },
    {
        "Grupo":462,
        "Designacao":"Comércio por grosso de produtos agrícolas brutos e animais vivos."
    },
    {
        "Classe":4621,
        "Designacao":"Comércio por grosso de cereais, tabaco em bruto, sementes e alimentos para animais."
    },
    {
        "Subclasse":46211,
        "Designacao":"Comércio por grosso de alimentos para animais."
    },
    {
        "Subclasse":46212,
        "Designacao":"Comércio por grosso de tabaco em bruto."
    },
    {
        "Subclasse":46213,
        "Designacao":"Comércio por grosso de cortiça em bruto."
    },
    {
        "Subclasse":46214,
        "Designacao":"Comércio por grosso de cereais, sementes, leguminosas, oleaginosas e outras matérias-primas agrícolas."
    },
    {
        "Classe":4622,
        "Subclasse":46220,
        "Designacao":"Comércio por grosso de flores e plantas."
    },
    {
        "Classe":4623,
        "Subclasse":46230,
        "Designacao":"Comércio por grosso de animais vivos."
    },
    {
        "Classe":4624,
        "Subclasse":46240,
        "Designacao":"Comércio por grosso de peles e couro."
    },
    {
        "Grupo":463,
        "Designacao":"Comércio por grosso de produtos alimentares, bebidas e tabaco."
    },
    {
        "Classe":4631,
        "Designacao":"Comércio por grosso de fruta e de produtos hortícolas."
    },
    {
        "Subclasse":46311,
        "Designacao":"Comércio por grosso de fruta e de produtos hortícolas, exceto batata."
    },
    {
        "Subclasse":46312,
        "Designacao":"Comércio por grosso de batata."
    },
    {
        "Classe":4632,
        "Designacao":"Comércio por grosso de carne, produtos à base de carne, peixe e produtos à base de peixe."
    },
    {
        "Subclasse":46321,
        "Designacao":"Comércio por grosso de carne e produtos à base de carne."
    },
    {
        "Subclasse":46322,
        "Designacao":"Comércio por grosso de peixe, crustáceos e moluscos e produtos à base de peixe."
    },
    {
        "Classe":4633,
        "Designacao":"Comércio por grosso de leite e derivados, ovos, azeite, óleos e gorduras alimentares."
    },
    {
        "Subclasse":46331,
        "Designacao":"Comércio por grosso de leite, seus derivados e ovos."
    },
    {
        "Subclasse":46332,
        "Designacao":"Comércio por grosso de azeite, óleos e gorduras alimentares."
    },
    {
        "Classe":4634,
        "Designacao":"Comércio por grosso de bebidas."
    },
    {
        "Subclasse":46341,
        "Designacao":"Comércio por grosso de bebidas alcoólicas."
    },
    {
        "Subclasse":46342,
        "Designacao":"Comércio por grosso de bebidas não alcoólicas."
    },
    {
        "Classe":4635,
        "Subclasse":46350,
        "Designacao":"Comércio por grosso de tabaco."
    },
    {
        "Classe":4636,
        "Designacao":"Comércio por grosso de açúcar, chocolate e produtos de confeitaria."
    },
    {
        "Subclasse":46361,
        "Designacao":"Comércio por grosso de açúcar."
    },
    {
        "Subclasse":46362,
        "Designacao":"Comércio por grosso de chocolate e de produtos de confeitaria."
    },
    {
        "Classe":4637,
        "Subclasse":46370,
        "Designacao":"Comércio por grosso de café, chá, cacau e especiarias."
    },
    {
        "Classe":4638,
        "Subclasse":46380,
        "Designacao":"Comércio por grosso de outros produtos alimentares."
    },
    {
        "Classe":4639,
        "Subclasse":46390,
        "Designacao":"Comércio por grosso não especializado de produtos alimentares, bebidas e tabaco."
    },
    {
        "Grupo":464,
        "Designacao":"Comércio por grosso de bens de consumo, exceto alimentares, bebidas e tabaco."
    },
    {
        "Classe":4641,
        "Subclasse":46410,
        "Designacao":"Comércio por grosso de têxteis."
    },
    {
        "Classe":4642,
        "Designacao":"Comércio por grosso de vestuário e calçado."
    },
    {
        "Subclasse":46421,
        "Designacao":"Comércio por grosso de vestuário e de acessórios."
    },
    {
        "Subclasse":46422,
        "Designacao":"Comércio por grosso de calçado."
    },
    {
        "Classe":4643,
        "Subclasse":46430,
        "Designacao":"Comércio por grosso de eletrodomésticos."
    },
    {
        "Classe":4644,
        "Designacao":"Comércio por grosso de louças em cerâmica e em vidro e produtos de limpeza."
    },
    {
        "Subclasse":46441,
        "Designacao":"Comércio por grosso de louças em cerâmica e em vidro."
    },
    {
        "Subclasse":46442,
        "Designacao":"Comércio por grosso de produtos de limpeza."
    },
    {
        "Classe":4645,
        "Subclasse":46450,
        "Designacao":"Comércio por grosso de perfumes e de produtos de higiene."
    },
    {
        "Classe":4646,
        "Subclasse":46460,
        "Designacao":"Comércio por grosso de produtos farmacêuticos e médicos."
    },
    {
        "Classe":4647,
        "Designacao":"Comércio por grosso de mobiliário para uso doméstico, para escritório e comércio, de carpetes, tapetes e artigos de iluminação."
    },
    {
        "Subclasse":46471,
        "Designacao":"Comércio por grosso de mobiliário para uso doméstico, carpetes, tapetes e artigos de iluminação."
    },
    {
        "Subclasse":46472,
        "Designacao":"Comércio por grosso de mobiliário de escritório."
    },
    {
        "Classe":4648,
        "Subclasse":46480,
        "Designacao":"Comércio por grosso de relógios e de artigos de ourivesaria e joalharia."
    },
    {
        "Classe":4649,
        "Designacao":"Outro comércio por grosso de bens de consumo."
    },
    {
        "Subclasse":46491,
        "Designacao":"Comércio por grosso de artigos de papelaria."
    },
    {
        "Subclasse":46492,
        "Designacao":"Comércio por grosso de livros, revistas e jornais."
    },
    {
        "Subclasse":46493,
        "Designacao":"Comércio por grosso de brinquedos, jogos e artigos de desporto."
    },
    {
        "Subclasse":46494,
        "Designacao":"Outro comércio por grosso de bens de consumo, n. e."
    },
    {
        "Grupo":465,
        "Classe":4650,
        "Designacao":"Comércio por grosso de equipamento de informação e comunicação."
    },
    {
        "Subclasse":46501,
        "Designacao":"Comércio por grosso de computadores, equipamentos periféricos e programas informáticos."
    },
    {
        "Subclasse":46502,
        "Designacao":"Comércio por grosso de equipamentos eletrónicos, de telecomunicações e suas partes."
    },
    {
        "Subclasse":46503,
        "Designacao":"Comércio por grosso de outras máquinas e material de escritório."
    },
    {
        "Grupo":466,
        "Designacao":"Comércio por grosso de outras máquinas, equipamentos e suas partes."
    },
    {
        "Classe":4661,
        "Subclasse":46610,
        "Designacao":"Comércio por grosso de máquinas e equipamentos agrícolas e suas peças e acessórios."
    },
    {
        "Classe":4662,
        "Subclasse":46620,
        "Designacao":"Comércio por grosso de máquinas-ferramentas"
    },
    {
        "Classe":4663,
        "Subclasse":46630,
        "Designacao":"Comércio por grosso de máquinas para a indústria extrativa, construção e engenharia civil"
    },
    {
        "Classe":4664,
        "Designacao":"Comércio por grosso de outras máquinas e equipamentos."
    },
    {
        "Subclasse":46641,
        "Designacao":"Comércio por grosso de máquinas para a indústria têxtil, máquinas de costura e de tricotar."
    },
    {
        "Subclasse":46642,
        "Designacao":"Comércio por grosso de outras máquinas e equipamentos, n. e."
    },
    {
        "Grupo":467,
        "Designacao":"Comércio por grosso de veículos automóveis, motociclos, suas partes e acessórios."
    },
    {
        "Classe":4671,
        "Designacao":"Comércio por grosso de veículos automóveis."
    },
    {
        "Subclasse":46711,
        "Designacao":"Comércio por grosso de veículos automóveis ligeiros."
    },
    {
        "Subclasse":46712,
        "Designacao":"Comércio por grosso de outros veículos automóveis."
    },
    {
        "Classe":4672,
        "Subclasse":46720,
        "Designacao":"Comércio por grosso de peças e acessórios para veículos automóveis."
    },
    {
        "Classe":4673,
        "Subclasse":46730,
        "Designacao":"Comércio por grosso de motociclos, suas partes e acessórios."
    },
    {
        "Grupo":468,
        "Designacao":"Outro comércio por grosso especializado."
    },
    {
        "Classe":4681,
        "Designacao":"Comércio por grosso de combustíveis sólidos, líquidos, gasosos e produtos derivados."
    },
    {
        "Subclasse":46811,
        "Designacao":"Comércio por grosso de produtos petrolíferos."
    },
    {
        "Subclasse":46812,
        "Designacao":"Comércio por grosso de combustíveis sólidos, líquidos e gasosos, não derivados do petróleo."
    },
    {
        "Classe":4682,
        "Subclasse":46820,
        "Designacao":"Comércio por grosso de minérios e de metais."
    },
    {
        "Classe":4683,
        "Designacao":"Comércio por grosso de madeira, de materiais de construção e equipamento sanitário."
    },
    {
        "Subclasse":46831,
        "Designacao":"Comércio por grosso de madeira em bruto e de produtos derivados."
    },
    {
        "Subclasse":46832,
        "Designacao":"Comércio por grosso de materiais de construção (exceto madeira) e equipamento sanitário."
    },
    {
        "Classe":4684,
        "Subclasse":46840,
        "Designacao":"Comércio por grosso de ferragens, ferramentas manuais e artigos para canalizações e aquecimento."
    },
    {
        "Classe":4685,
        "Subclasse":46850,
        "Designacao":"Comércio por grosso de produtos químicos."
    },
    {
        "Classe":4686,
        "Designacao":"Comércio por grosso de outros bens intermédios."
    },
    {
        "Subclasse":46861,
        "Designacao":"Comércio por grosso de fibras têxteis naturais, artificiais e sintéticas."
    },
    {
        "Subclasse":46862,
        "Designacao":"Comércio por grosso de outros bens intermédios, n. e."
    },
    {
        "Classe":4687,
        "Designacao":"Comércio por grosso de desperdícios e sucata."
    },
    {
        "Subclasse":46871,
        "Designacao":"Comércio por grosso de sucatas e de desperdícios metálicos."
    },
    {
        "Subclasse":46872,
        "Designacao":"Comércio por grosso de desperdícios têxteis, de cartão e papéis velhos."
    },
    {
        "Subclasse":46873,
        "Designacao":"Comércio por grosso de desperdícios de materiais, n. e."
    },
    {
        "Classe":4689,
        "Subclasse":46890,
        "Designacao":"Outro comércio por grosso especializado, n. e."
    },
    {
        "Grupo":469,
        "Classe":4690,
        "Subclasse":46900,
        "Designacao":"Comércio por grosso não especializado."
    },
    {
        "Divisao":47,
        "Designacao":"Comércio a retalho."
    },
    {
        "Grupo":471,
        "Designacao":"Comércio a retalho não especializado."
    },
    {
        "Classe":4711,
        "Designacao":"Comércio a retalho não especializado, com predominância de produtos alimentares, bebidas ou tabaco."
    },
    {
        "Subclasse":47111,
        "Designacao":"Comércio a retalho em supermercados e hipermercados."
    },
    {
        "Subclasse":47112,
        "Designacao":"Comércio a retalho em outros estabelecimentos não especializados, com predominância de produtos alimentares, bebidas ou tabaco."
    },
    {
        "Subclasse":47113,
        "Designacao":"Comércio a retalho não especializado, em bancas, feiras e unidades móveis de venda, de produtos alimentares, bebidas e tabaco."
    },
    {
        "Subclasse":47114,
        "Designacao":"Comércio a retalho não especializado, por correspondência ou via Internet, com predominância de produtos alimentares, bebidas e tabaco."
    },
    {
        "Subclasse":47115,
        "Designacao":"Comércio a retalho não especializado, por outros métodos, com predominância de produtos alimentares, bebidas e tabaco."
    },
    {
        "Classe":4712,
        "Designacao":"Outro comércio a retalho não especializado."
    },
    {
        "Subclasse":47121,
        "Designacao":"Comércio a retalho não especializado, sem predominância de produtos alimentares, bebidas e tabaco, em grandes armazéns e similares."
    },
    {
        "Subclasse":47122,
        "Designacao":"Comércio a retalho em outros estabelecimentos não especializados, sem predominância de produtos alimentares, bebidas ou tabaco."
    },
    {
        "Subclasse":47123,
        "Designacao":"Comércio a retalho não especializado em bancas, feiras e unidades móveis de venda, de têxteis, vestuário, calçado, malas e similares."
    },
    {
        "Subclasse":47124,
        "Designacao":"Comércio a retalho não especializado, em bancas, feiras e unidades móveis de venda, de outros produtos, sem predominância de produtos alimentares, bebidas e tabaco."
    },
    {
        "Subclasse":47125,
        "Designacao":"Comércio a retalho não especializado, por correspondência ou via Internet, sem predominância de produtos alimentares, bebidas e tabaco."
    },
    {
        "Subclasse":47126,
        "Designacao":"Comércio a retalho não especializado, por outros métodos, sem predominância de produtos alimentares, bebidas e tabaco."
    },
    {
        "Grupo":472,
        "Designacao":"Comércio a retalho de produtos alimentares, bebidas e tabaco."
    },
    {
        "Classe":4721,
        "Subclasse":47210,
        "Designacao":"Comércio a retalho de frutas e produtos hortícolas."
    },
    {
        "Classe":4722,
        "Subclasse":47220,
        "Designacao":"Comércio a retalho de carne e produtos à base de carne."
    },
    {
        "Classe":4723,
        "Subclasse":47230,
        "Designacao":"Comércio a retalho de peixe, crustáceos e moluscos."
    },
    {
        "Classe":4724,
        "Subclasse":47240,
        "Designacao":"Comércio a retalho de pão, de produtos de pastelaria e de confeitaria."
    },
    {
        "Classe":4725,
        "Subclasse":47250,
        "Designacao":"Comércio a retalho de bebidas."
    },
    {
        "Classe":4726,
        "Subclasse":47260,
        "Designacao":"Comércio a retalho de produtos do tabaco."
    },
    {
        "Classe":4727,
        "Designacao":"Comércio a retalho de outros produtos alimentares."
    },
    {
        "Subclasse":47271,
        "Designacao":"Comércio a retalho de leite e de derivados."
    },
    {
        "Subclasse":47272,
        "Designacao":"Comércio a retalho de produtos alimentares, naturais e dietéticos."
    },
    {
        "Subclasse":47273,
        "Designacao":"Outro comércio a retalho de produtos alimentares."
    },
    {
        "Grupo":473,
        "Classe":4730,
        "Subclasse":47300,
        "Designacao":"Comércio a retalho de combustível para veículos a motor."
    },
    {
        "Grupo":474,
        "Classe":4740,
        "Designacao":"Comércio a retalho de equipamento das tecnologias de informação e comunicação (TIC)."
    },
    {
        "Subclasse":47401,
        "Designacao":"Comércio a retalho de computadores, unidades periféricas e programas informáticos."
    },
    {
        "Subclasse":47402,
        "Designacao":"Comércio a retalho de equipamento de telecomunicações."
    },
    {
        "Subclasse":47403,
        "Designacao":"Comércio a retalho de equipamento audiovisual."
    },
    {
        "Grupo":475,
        "Designacao":"Comércio a retalho de outro equipamento para uso doméstico."
    },
    {
        "Classe":4751,
        "Subclasse":47510,
        "Designacao":"Comércio a retalho de têxteis."
    },
    {
        "Classe":4752,
        "Designacao":"Comércio a retalho de ferragens, materiais de construção, tintas e vidros."
    },
    {
        "Subclasse":47521,
        "Designacao":"Comércio a retalho de ferragens e de vidro plano."
    },
    {
        "Subclasse":47522,
        "Designacao":"Comércio a retalho de tintas, vernizes e produtos similares."
    },
    {
        "Subclasse":47523,
        "Designacao":"Comércio a retalho de material de bricolage, equipamento sanitário, ladrilhos e materiais de construção similares."
    },
    {
        "Classe":4753,
        "Subclasse":47530,
        "Designacao":"Comércio a retalho de carpetes, tapetes, cortinados e revestimentos para paredes e pavimentos."
    },
    {
        "Classe":4754,
        "Subclasse":47540,
        "Designacao":"Comércio a retalho de eletrodomésticos."
    },
    {
        "Classe":4755,
        "Designacao":"Comércio a retalho de móveis, de artigos de iluminação, louças e de outros artigos para o lar."
    },
    {
        "Subclasse":47551,
        "Designacao":"Comércio a retalho de mobiliário e artigos de iluminação."
    },
    {
        "Subclasse":47552,
        "Designacao":"Comércio a retalho de louças, cutelaria e de outros artigos similares para uso doméstico."
    },
    {
        "Subclasse":47553,
        "Designacao":"Comércio a retalho de outros artigos para o lar, n. e."
    },
    {
        "Grupo":476,
        "Designacao":"Comércio a retalho de bens culturais e recreativos."
    },
    {
        "Classe":4761,
        "Subclasse":47610,
        "Designacao":"Comércio a retalho de livros."
    },
    {
        "Classe":4762,
        "Designacao":"Comércio a retalho de jornais, revistas e outras publicações periódicas e artigos de papelaria."
    },
    {
        "Subclasse":47621,
        "Designacao":"Comércio a retalho de jornais, revistas e outras publicações periódicas e artigos de papelaria, exceto máquinas e outro material de escritório."
    },
    {
        "Subclasse":47622,
        "Designacao":"Comércio a retalho de máquinas e de outro material de escritório."
    },
    {
        "Classe":4763,
        "Subclasse":47630,
        "Designacao":"Comércio a retalho de artigos de desporto."
    },
    {
        "Classe":4764,
        "Subclasse":47640,
        "Designacao":"Comércio a retalho de jogos e brinquedos."
    },
    {
        "Classe":4769,
        "Subclasse":47690,
        "Designacao":"Comércio a retalho de bens culturais e recreativos, n. e."
    },
    {
        "Grupo":477,
        "Designacao":"Comércio a retalho de outros produtos, exceto veículos automóveis e motociclos."
    },
    {
        "Classe":4771,
        "Designacao":"Comércio a retalho de vestuário."
    },
    {
        "Subclasse":47711,
        "Designacao":"Comércio a retalho de vestuário para adultos."
    },
    {
        "Subclasse":47712,
        "Designacao":"Comércio a retalho de vestuário para bebés e crianças."
    },
    {
        "Classe":4772,
        "Designacao":"Comércio a retalho de calçado e artigos de couro."
    },
    {
        "Subclasse":47721,
        "Designacao":"Comércio a retalho de calçado."
    },
    {
        "Subclasse":47722,
        "Designacao":"Comércio a retalho de marroquinaria e artigos de viagem."
    },
    {
        "Classe":4773,
        "Subclasse":47730,
        "Designacao":"Comércio a retalho de produtos farmacêuticos."
    },
    {
        "Classe":4774,
        "Designacao":"Comércio a retalho de produtos médicos e ortopédicos."
    },
    {
        "Subclasse":47741,
        "Designacao":"Comércio a retalho de produtos médicos (exceto material ótico oftálmico) e ortopédicos."
    },
    {
        "Subclasse":47742,
        "Designacao":"Comércio a retalho de material ótico oftálmico."
    },
    {
        "Classe":4775,
        "Subclasse":47750,
        "Designacao":"Comércio a retalho de produtos cosméticos e de higiene."
    },
    {
        "Classe":4776,
        "Designacao":"Comércio a retalho de flores, plantas, fertilizantes, animais de estimação e respetivos alimentos."
    },
    {
        "Subclasse":47761,
        "Designacao":"Comércio a retalho de flores, plantas, sementes e fertilizantes."
    },
    {
        "Subclasse":47762,
        "Designacao":"Comércio a retalho de animais de companhia e respetivos alimentos."
    },
    {
        "Classe":4777,
        "Subclasse":47770,
        "Designacao":"Comércio a retalho de relógios e de artigos de ourivesaria e joalharia."
    },
    {
        "Classe":4778,
        "Designacao":"Comércio a retalho de outros produtos novos."
    },
    {
        "Subclasse":47781,
        "Designacao":"Comércio a retalho de material ótico, exceto oftálmico, fotográfico, cinematográfico e de instrumentos de precisão."
    },
    {
        "Subclasse":47782,
        "Designacao":"Comércio a retalho de combustíveis para uso doméstico."
    },
    {
        "Subclasse":47783,
        "Designacao":"Comércio a retalho de outros produtos novos, n. e."
    },
    {
        "Classe":4779,
        "Subclasse":47790,
        "Designacao":"Comércio a retalho de artigos em segunda mão."
    },
    {
        "Grupo":478,
        "Designacao":"Comércio a retalho de veículos automóveis, motociclos, suas partes e acessórios."
    },
    {
        "Classe":4781,
        "Designacao":"Comércio a retalho de veículos automóveis."
    },
    {
        "Subclasse":47811,
        "Designacao":"Comércio a retalho de veículos automóveis ligeiros."
    },
    {
        "Subclasse":47812,
        "Designacao":"Comércio a retalho de outros veículos automóveis."
    },
    {
        "Classe":4782,
        "Subclasse":47820,
        "Designacao":"Comércio a retalho de peças e acessórios para veículos automóveis."
    },
    {
        "Classe":4783,
        "Subclasse":47830,
        "Designacao":"Comércio a retalho de motociclos, suas partes e acessórios."
    },
    {
        "Grupo":479,
        "Designacao":"Atividades de serviços de intermediação no comércio a retalho."
    },
    {
        "Classe":4791,
        "Subclasse":47910,
        "Designacao":"Atividades de serviços de intermediação no comércio a retalho não especializado."
    },
    {
        "Classe":4792,
        "Subclasse":47920,
        "Designacao":"Atividades de serviços de intermediação no comércio a retalho especializado."
    },
    {
        "Seccao":"H",
        "Designacao":"Transportes e armazenagem."
    },
    {
        "Divisao":49,
        "Designacao":"Transportes terrestres e transportes por oleodutos ou gasodutos."
    },
    {
        "Grupo":491,
        "Designacao":"Transporte ferroviário de passageiros."
    },
    {
        "Classe":4911,
        "Subclasse":49110,
        "Designacao":"Transporte de passageiros por ferrovia pesada."
    },
    {
        "Classe":4912,
        "Subclasse":49120,
        "Designacao":"Outro transporte ferroviário de passageiros."
    },
    {
        "Grupo":492,
        "Classe":4920,
        "Subclasse":49200,
        "Designacao":"Transporte ferroviário de mercadorias."
    },
    {
        "Grupo":493,
        "Designacao":"Outros transportes terrestres de passageiros."
    },
    {
        "Classe":4931,
        "Designacao":"Transporte rodoviário regular de passageiros."
    },
    {
        "Subclasse":49311,
        "Designacao":"Transporte rodoviário regular, urbano e suburbano de passageiros."
    },
    {
        "Subclasse":49312,
        "Designacao":"Transporte regular interurbano em autocarros."
    },
    {
        "Classe":4932,
        "Subclasse":49320,
        "Designacao":"Transporte rodoviário não regular de passageiros."
    },
    {
        "Classe":4933,
        "Subclasse":49330,
        "Designacao":"Atividades de serviços de transporte de passageiros, a pedido, em veículo com condutor."
    },
    {
        "Classe":4934,
        "Subclasse":49340,
        "Designacao":"Transporte de passageiros por instalações por cabo (teleféricos, telesquis e outras)."
    },
    {
        "Classe":4939,
        "Subclasse":49390,
        "Designacao":"Outros transportes terrestres de passageiros, n. e."
    },
    {
        "Grupo":494,
        "Designacao":"Transportes rodoviários de mercadorias e serviços de mudanças."
    },
    {
        "Classe":4941,
        "Subclasse":49410,
        "Designacao":"Transportes rodoviários de mercadorias."
    },
    {
        "Classe":4942,
        "Subclasse":49420,
        "Designacao":"Serviços de mudanças."
    },
    {
        "Grupo":495,
        "Classe":4950,
        "Subclasse":49500,
        "Designacao":"Transportes por oleodutos ou gasodutos."
    },
    {
        "Divisao":50,
        "Designacao":"Transportes por água."
    },
    {
        "Grupo":501,
        "Classe":5010,
        "Designacao":"Transportes marítimos de passageiros."
    },
    {
        "Subclasse":50101,
        "Designacao":"Transportes marítimos não costeiros de passageiros."
    },
    {
        "Subclasse":50102,
        "Designacao":"Transportes costeiros e locais de passageiros, para fins não turísticos."
    },
    {
        "Subclasse":50103,
        "Designacao":"Transportes costeiros e locais de passageiros, para fins turísticos."
    },
    {
        "Grupo":502,
        "Classe":5020,
        "Subclasse":50200,
        "Designacao":"Transportes marítimos de mercadorias."
    },
    {
        "Grupo":503,
        "Classe":5030,
        "Designacao":"Transportes de passageiros por vias navegáveis interiores."
    },
    {
        "Subclasse":50301,
        "Designacao":"Transportes de passageiros por vias navegáveis interiores, para fins não turísticos."
    },
    {
        "Subclasse":50302,
        "Designacao":"Transportes de passageiros por vias navegáveis interiores, para fins turísticos."
    },
    {
        "Grupo":504,
        "Classe":5040,
        "Subclasse":50400,
        "Designacao":"Transportes de mercadorias por vias navegáveis interiores."
    },
    {
        "Divisao":51,
        "Designacao":"Transportes aéreos."
    },
    {
        "Grupo":511,
        "Classe":5110,
        "Subclasse":51100,
        "Designacao":"Transportes aéreos de passageiros."
    },
    {
        "Grupo":512,
        "Designacao":"Transportes aéreos de mercadorias e transportes espaciais."
    },
    {
        "Classe":5121,
        "Subclasse":51210,
        "Designacao":"Transportes aéreos de mercadorias."
    },
    {
        "Classe":5122,
        "Subclasse":51220,
        "Designacao":"Transportes espaciais."
    },
    {
        "Divisao":52,
        "Designacao":"Armazenagem e atividades auxiliares dos transportes."
    },
    {
        "Grupo":521,
        "Classe":5210,
        "Designacao":"Armazenagem."
    },
    {
        "Subclasse":52101,
        "Designacao":"Armazenagem frigorífica."
    },
    {
        "Subclasse":52102,
        "Designacao":"Armazenagem não frigorífica."
    },
    {
        "Grupo":522,
        "Designacao":"Atividades auxiliares dos transportes."
    },
    {
        "Classe":5221,
        "Designacao":"Atividades auxiliares dos transportes terrestres."
    },
    {
        "Subclasse":52211,
        "Designacao":"Gestão de infraestruturas dos transportes terrestres."
    },
    {
        "Subclasse":52212,
        "Designacao":"Assistência a veículos na estrada."
    },
    {
        "Subclasse":52213,
        "Designacao":"Outras atividades auxiliares dos transportes terrestres."
    },
    {
        "Classe":5222,
        "Subclasse":52220,
        "Designacao":"Atividades auxiliares dos transportes por água."
    },
    {
        "Classe":5223,
        "Subclasse":52230,
        "Designacao":"Atividades auxiliares dos transportes aéreos."
    },
    {
        "Classe":5224,
        "Subclasse":52240,
        "Designacao":"Manuseamento de carga."
    },
    {
        "Classe":5225,
        "Subclasse":52250,
        "Designacao":"Atividades dos serviços de logística."
    },
    {
        "Classe":5226,
        "Designacao":"Outras atividades de apoio ao transporte."
    },
    {
        "Subclasse":52261,
        "Designacao":"Agentes aduaneiros e similares de apoio ao transporte."
    },
    {
        "Subclasse":52262,
        "Designacao":"Outras atividades de apoio ao transporte, n. e."
    },
    {
        "Grupo":523,
        "Designacao":"Atividades de serviços de intermediação dos transportes."
    },
    {
        "Classe":5231,
        "Subclasse":52310,
        "Designacao":"Atividades de serviços de intermediação dos transportes de mercadorias."
    },
    {
        "Classe":5232,
        "Subclasse":52320,
        "Designacao":"Atividades de serviços de intermediação dos transportes de passageiros."
    },
    {
        "Divisao":53,
        "Designacao":"Atividades postais e de correios."
    },
    {
        "Grupo":531,
        "Classe":5310,
        "Subclasse":53100,
        "Designacao":"Atividades postais sujeitas a obrigações de serviço universal."
    },
    {
        "Grupo":532,
        "Classe":5320,
        "Designacao":"Outras atividades postais e de correios."
    },
    {
        "Subclasse":53201,
        "Designacao":"Outras atividades postais e de correios, exceto entregas ao domicílio sem tratamento ou triagem."
    },
    {
        "Subclasse":53202,
        "Designacao":"Atividades de serviços de entrega ao domicílio sem tratamento ou triagem."
    },
    {
        "Grupo":533,
        "Classe":5330,
        "Subclasse":53300,
        "Designacao":"Atividades de serviços de intermediação de atividades postais e de correios."
    },
    {
        "Seccao":"I",
        "Designacao":"Atividades de alojamento e restauração."
    },
    {
        "Divisao":55,
        "Designacao":"Alojamento."
    },
    {
        "Grupo":551,
        "Classe":5510,
        "Designacao":"Estabelecimentos hoteleiros."
    },
    {
        "Subclasse":55101,
        "Designacao":"Hotéis, exceto hotéis rurais."
    },
    {
        "Subclasse":55102,
        "Designacao":"Hotéis-apartamentos."
    },
    {
        "Subclasse":55103,
        "Designacao":"Pousadas."
    },
    {
        "Subclasse":55104,
        "Designacao":"Aldeamentos turísticos."
    },
    {
        "Subclasse":55105,
        "Designacao":"Apartamentos turísticos"
    },
    {
        "Subclasse":55106,
        "Designacao":"Hotéis rurais."
    },
    {
        "Subclasse":55107,
        "Designacao":"Outros estabelecimentos hoteleiros."
    },
    {
        "Grupo":552,
        "Classe":5520,
        "Designacao":"Alojamentos de férias e outros alojamentos de curta duração."
    },
    {
        "Subclasse":55201,
        "Designacao":"Alojamento mobilado para turistas."
    },
    {
        "Subclasse":55202,
        "Designacao":"Alojamento em estabelecimentos de turismo no espaço rural, exceto hotéis rurais."
    },
    {
        "Subclasse":55203,
        "Designacao":"Alojamento em estabelecimentos de turismo de habitação."
    },
    {
        "Subclasse":55204,
        "Designacao":"Estabelecimentos de hospedagem, exceto hostels."
    },
    {
        "Subclasse":55205,
        "Designacao":"Hostels."
    },
    {
        "Subclasse":55206,
        "Designacao":"Colónias e campos de férias."
    },
    {
        "Subclasse":55207,
        "Designacao":"Outros locais de alojamento de curta duração."
    },
    {
        "Grupo":553,
        "Classe":5530,
        "Subclasse":55300,
        "Designacao":"Parques de campismo e de caravanismo."
    },
    {
        "Grupo":554,
        "Classe":5540,
        "Subclasse":55400,
        "Designacao":"Atividades de serviços de intermediação de alojamento."
    },
    {
        "Grupo":559,
        "Classe":5590,
        "Subclasse":55900,
        "Designacao":"Outros locais de alojamento."
    },
    {
        "Divisao":56,
        "Designacao":"Restauração."
    },
    {
        "Grupo":561,
        "Designacao":"Restaurantes, incluindo alimentação em meios móveis."
    },
    {
        "Classe":5611,
        "Designacao":"Atividades de restauração."
    },
    {
        "Subclasse":56111,
        "Designacao":"Restaurantes tipo tradicional."
    },
    {
        "Subclasse":56112,
        "Designacao":"Restaurantes com lugares ao balcão."
    },
    {
        "Subclasse":56113,
        "Designacao":"Restaurantes sem serviço de mesa."
    },
    {
        "Subclasse":56114,
        "Designacao":"Restaurantes típicos."
    },
    {
        "Subclasse":56115,
        "Designacao":"Restaurantes com espaço de dança."
    },
    {
        "Subclasse":56116,
        "Designacao":"Confeção de refeições prontas a levar para casa."
    },
    {
        "Subclasse":56117,
        "Designacao":"Restaurantes, n. e."
    },
    {
        "Classe":5612,
        "Subclasse":56120,
        "Designacao":"Atividades de serviços de alimentação em meios móveis."
    },
    {
        "Grupo":562,
        "Designacao":"Fornecimento de refeições para eventos, atividades de serviços de fornecimento de refeições por contrato e outras atividades de serviços de alimentação."
    },
    {
        "Classe":5621,
        "Subclasse":56210,
        "Designacao":"Fornecimento de refeições para eventos."
    },
    {
        "Classe":5622,
        "Subclasse":56220,
        "Designacao":"Atividades de serviço de fornecimento de refeições por contrato e outras atividades de serviço de alimentação."
    },
    {
        "Grupo":563,
        "Classe":5630,
        "Designacao":"Atividades de estabelecimentos de bebidas."
    },
    {
        "Subclasse":56301,
        "Designacao":"Cafés."
    },
    {
        "Subclasse":56302,
        "Designacao":"Bares."
    },
    {
        "Subclasse":56303,
        "Designacao":"Pastelarias e casas de chá."
    },
    {
        "Subclasse":56304,
        "Designacao":"Outros estabelecimentos de bebidas sem espetáculo, exceto itinerantes."
    },
    {
        "Subclasse":56305,
        "Designacao":"Estabelecimentos de bebidas com espaço de dança."
    },
    {
        "Subclasse":56306,
        "Designacao":"Estabelecimentos de bebidas itinerantes."
    },
    {
        "Grupo":564,
        "Classe":5640,
        "Subclasse":56400,
        "Designacao":"Atividades de serviços de intermediação relativas a atividades de serviços de restauração."
    },
    {
        "Seccao":"J",
        "Designacao":"Atividades de edição, difusão e produção e distribuição de conteúdos."
    },
    {
        "Divisao":58,
        "Designacao":"Atividades de edição."
    },
    {
        "Grupo":581,
        "Designacao":"Edição de livros, jornais e de outras publicações, exceto edição de programas informáticos."
    },
    {
        "Classe":5811,
        "Subclasse":58110,
        "Designacao":"Edição de livros."
    },
    {
        "Classe":5812,
        "Subclasse":58120,
        "Designacao":"Edição de jornais."
    },
    {
        "Classe":5813,
        "Subclasse":58130,
        "Designacao":"Edição de revistas e de outras publicações periódicas."
    },
    {
        "Classe":5819,
        "Subclasse":58190,
        "Designacao":"Outras atividades de edição, exceto edição de programas informáticos."
    },
    {
        "Grupo":582,
        "Designacao":"Edição de programas informáticos."
    },
    {
        "Classe":5821,
        "Subclasse":58210,
        "Designacao":"Edição de jogos de vídeo."
    },
    {
        "Classe":5829,
        "Subclasse":58290,
        "Designacao":"Edição de outros programas informáticos."
    },
    {
        "Divisao":59,
        "Designacao":"Atividades de produção de filmes, de vídeos e de programas de televisão, de gravação de som e de edição de música."
    },
    {
        "Grupo":591,
        "Designacao":"Atividades cinematográficas, de vídeos e de programas de televisão."
    },
    {
        "Classe":5911,
        "Subclasse":59110,
        "Designacao":"Atividades de produção de filmes, de vídeos e de programas de televisão."
    },
    {
        "Classe":5912,
        "Subclasse":59120,
        "Designacao":"Atividades de pós-produção de filmes, de vídeos e de programas de televisão."
    },
    {
        "Classe":5913,
        "Subclasse":59130,
        "Designacao":"Atividades de distribuição de filmes e de vídeos."
    },
    {
        "Classe":5914,
        "Subclasse":59140,
        "Designacao":"Atividades de projeção de filmes."
    },
    {
        "Grupo":592,
        "Classe":5920,
        "Subclasse":59200,
        "Designacao":"Atividades de gravação de som e edição de música."
    },
    {
        "Divisao":60,
        "Designacao":"Atividades de programação, difusão de rádio e de televisão, de agências de notícias e outras atividades de distribuição de conteúdos."
    },
    {
        "Grupo":601,
        "Classe":6010,
        "Subclasse":60100,
        "Designacao":"Atividades de radiodifusão e de distribuição de áudio."
    },
    {
        "Grupo":602,
        "Classe":6020,
        "Subclasse":60200,
        "Designacao":"Atividades de programação e difusão de televisão e de distribuição de vídeo."
    },
    {
        "Grupo":603,
        "Designacao":"Atividades das agências de notícias e outras atividades de distribuição de conteúdos."
    },
    {
        "Classe":6031,
        "Subclasse":60310,
        "Designacao":"Atividades das agências de notícias."
    },
    {
        "Classe":6039,
        "Subclasse":60390,
        "Designacao":"Outras atividades de distribuição de conteúdos."
    },
    {
        "Seccao":"K",
        "Designacao":"Telecomunicações, programação informática, consultoria, infraestruturas de computação e outras atividades dos serviços de informação."
    },
    {
        "Divisao":61,
        "Designacao":"Telecomunicações."
    },
    {
        "Grupo":611,
        "Classe":6110,
        "Designacao":"Atividades de telecomunicações por fios, sem fios e por satélites."
    },
    {
        "Subclasse":61101,
        "Designacao":"Atividades de telecomunicações por cabo."
    },
    {
        "Subclasse":61102,
        "Designacao":"Atividades de telecomunicações sem fios."
    },
    {
        "Subclasse":61103,
        "Designacao":"Atividades de telecomunicações por satélite."
    },
    {
        "Grupo":612,
        "Classe":6120,
        "Subclasse":61200,
        "Designacao":"Atividades de revenda de telecomunicações e atividades de serviços de intermediação no domínio das telecomunicações."
    },
    {
        "Grupo":619,
        "Classe":6190,
        "Subclasse":61900,
        "Designacao":"Outras atividades de telecomunicações."
    },
    {
        "Divisao":62,
        "Designacao":"Consultoria, programação informática e atividades relacionadas."
    },
    {
        "Grupo":621,
        "Classe":6210,
        "Subclasse":62100,
        "Designacao":"Atividades de programação informática."
    },
    {
        "Grupo":622,
        "Classe":6220,
        "Designacao":"Atividades de consultoria informática e de gestão de instalações informáticas."
    },
    {
        "Subclasse":62201,
        "Designacao":"Atividades de consultoria em informática."
    },
    {
        "Subclasse":62202,
        "Designacao":"Gestão e exploração de instalações informáticas."
    },
    {
        "Grupo":629,
        "Classe":6290,
        "Subclasse":62900,
        "Designacao":"Outras atividades de serviços relacionados com as tecnologias da informação e informática."
    },
    {
        "Divisao":63,
        "Designacao":"Infraestruturas de computação, atividades de processamento de dados, domiciliação de informação e outras atividades dos serviços de informação."
    },
    {
        "Grupo":631,
        "Classe":6310,
        "Subclasse":63100,
        "Designacao":"Infraestruturas de computação, atividades de processamento de dados, domiciliação de informação e atividades relacionadas."
    },
    {
        "Grupo":639,
        "Designacao":"Atividades de portais de pesquisa web e outras atividades dos serviços de informação."
    },
    {
        "Classe":6391,
        "Subclasse":63910,
        "Designacao":"Atividades de portais de pesquisa web."
    },
    {
        "Classe":6392,
        "Subclasse":63920,
        "Designacao":"Outras atividades de serviços de informação."
    },
    {
        "Seccao":"L",
        "Designacao":"Atividades financeiras e de seguros."
    },
    {
        "Divisao":64,
        "Designacao":"Atividades de serviços financeiros, exceto seguros e fundos de pensões."
    },
    {
        "Grupo":641,
        "Designacao":"Intermediação monetária."
    },
    {
        "Classe":6411,
        "Subclasse":64110,
        "Designacao":"Banco central."
    },
    {
        "Classe":6419,
        "Subclasse":64190,
        "Designacao":"Outra intermediação monetária."
    },
    {
        "Grupo":642,
        "Designacao":"Atividades das sociedades gestoras de participações sociais e canais de financiamento (financing conduits)."
    },
    {
        "Classe":6421,
        "Designacao":"Atividades das sociedades gestoras de participações sociais."
    },
    {
        "Subclasse":64211,
        "Designacao":"Atividades das sociedades gestoras de participações sociais financeiras."
    },
    {
        "Subclasse":64212,
        "Designacao":"Atividades das sociedades gestoras de participações sociais não financeiras."
    },
    {
        "Classe":6422,
        "Subclasse":64220,
        "Designacao":"Atividades de canais de financiamento (financing conduits)."
    },
    {
        "Grupo":643,
        "Designacao":"Atividades de trusts, fundos e entidades financeiras semelhantes."
    },
    {
        "Classe":6431,
        "Subclasse":64310,
        "Designacao":"Atividades dos fundos de investimento do mercado monetário e do mercado não monetário."
    },
    {
        "Classe":6432,
        "Subclasse":64320,
        "Designacao":"Atividades de trusts, patrimónios e contas fiduciárias (estate and agency accounts)."
    },
    {
        "Grupo":649,
        "Designacao":"Outras atividades de serviços financeiros, exceto seguros e fundos de pensões."
    },
    {
        "Classe":6491,
        "Subclasse":64910,
        "Designacao":"Locação financeira."
    },
    {
        "Classe":6492,
        "Designacao":"Outras atividades de crédito."
    },
    {
        "Subclasse":64921,
        "Designacao":"Atividades das instituições financeiras de crédito."
    },
    {
        "Subclasse":64922,
        "Designacao":"Atividades das sociedades financeiras para aquisições a crédito."
    },
    {
        "Subclasse":64923,
        "Designacao":"Atividades de factoring."
    },
    {
        "Subclasse":64924,
        "Designacao":"Outras atividades de crédito, n. e., exceto factoring."
    },
    {
        "Classe":6499,
        "Subclasse":64990,
        "Designacao":"Outras atividades de serviços financeiros, n. e., exceto seguros e fundos de pensões."
    },
    {
        "Divisao":65,
        "Designacao":"Seguros, resseguros e fundos de pensões, exceto segurança social obrigatória."
    },
    {
        "Grupo":651,
        "Designacao":"Seguros."
    },
    {
        "Classe":6511,
        "Designacao":"Seguros de vida."
    },
    {
        "Subclasse":65111,
        "Designacao":"Seguros de vida, exceto outras atividades complementares de segurança social."
    },
    {
        "Subclasse":65112,
        "Designacao":"Outras atividades complementares de segurança social."
    },
    {
        "Classe":6512,
        "Subclasse":65120,
        "Designacao":"Seguros não vida."
    },
    {
        "Grupo":652,
        "Classe":6520,
        "Subclasse":65200,
        "Designacao":"Resseguros."
    },
    {
        "Grupo":653,
        "Classe":6530,
        "Subclasse":65300,
        "Designacao":"Fundos de pensões."
    },
    {
        "Divisao":66,
        "Designacao":"Atividades auxiliares de serviços financeiros e das atividades dos seguros."
    },
    {
        "Grupo":661,
        "Designacao":"Atividades auxiliares de serviços financeiros, exceto seguros e fundos de pensões."
    },
    {
        "Classe":6611,
        "Subclasse":66110,
        "Designacao":"Administração de mercados financeiros."
    },
    {
        "Classe":6612,
        "Subclasse":66120,
        "Designacao":"Atividades de negociação por conta de terceiros em valores mobiliários e outros instrumentos financeiros."
    },
    {
        "Classe":6619,
        "Subclasse":66190,
        "Designacao":"Outras atividades auxiliares de serviços financeiros, exceto seguros e fundos de pensões."
    },
    {
        "Grupo":662,
        "Designacao":"Atividades auxiliares de seguros e de fundos de pensões."
    },
    {
        "Classe":6621,
        "Subclasse":66210,
        "Designacao":"Avaliação de riscos e danos."
    },
    {
        "Classe":6622,
        "Subclasse":66220,
        "Designacao":"Atividades de mediadores de seguros."
    },
    {
        "Classe":6629,
        "Subclasse":66290,
        "Designacao":"Atividades auxiliares de seguros e fundos de pensões, n. e."
    },
    {
        "Grupo":663,
        "Classe":6630,
        "Subclasse":66300,
        "Designacao":"Atividades de gestão de fundos."
    },
    {
        "Seccao":"M",
        "Designacao":"Atividades imobiliárias."
    },
    {
        "Divisao":68,
        "Designacao":"Atividades imobiliárias."
    },
    {
        "Grupo":681,
        "Designacao":"Atividades imobiliárias com bens imobiliários próprios e desenvolvimento de projetos de edifícios."
    },
    {
        "Classe":6811,
        "Subclasse":68110,
        "Designacao":"Compra e venda de bens imobiliários."
    },
    {
        "Classe":6812,
        "Subclasse":68120,
        "Designacao":"Desenvolvimento de projetos de edifícios."
    },
    {
        "Grupo":682,
        "Classe":6820,
        "Subclasse":68200,
        "Designacao":"Arrendamento e exploração de bens imobiliários próprios ou em locação."
    },
    {
        "Grupo":683,
        "Designacao":"Atividades imobiliárias por conta de outrem."
    },
    {
        "Classe":6831,
        "Subclasse":68310,
        "Designacao":"Atividades de serviços de intermediação de atividades imobiliárias."
    },
    {
        "Classe":6832,
        "Designacao":"Outras atividades imobiliárias por conta de outrem."
    },
    {
        "Subclasse":68321,
        "Designacao":"Administração de imóveis por conta de outrem."
    },
    {
        "Subclasse":68322,
        "Designacao":"Administração de condomínios."
    },
    {
        "Subclasse":68323,
        "Designacao":"Atividades de angariação imobiliária."
    },
    {
        "Subclasse":68324,
        "Designacao":"Atividades de avaliação imobiliária."
    },
    {
        "Seccao":"N",
        "Designacao":"Atividades de consultoria, científicas, técnicas e similares."
    },
    {
        "Divisao":69,
        "Designacao":"Atividades jurídicas e de contabilidade."
    },
    {
        "Grupo":691,
        "Classe":6910,
        "Designacao":"Atividades jurídicas."
    },
    {
        "Subclasse":69101,
        "Designacao":"Atividades jurídicas, exceto dos cartórios notariais."
    },
    {
        "Subclasse":69102,
        "Designacao":"Atividades dos cartórios notariais."
    },
    {
        "Grupo":692,
        "Classe":6920,
        "Designacao":"Atividades de contabilidade e auditoria; consultoria fiscal."
    },
    {
        "Subclasse":69201,
        "Designacao":"Atividades de contabilidade e consultoria fiscal."
    },
    {
        "Subclasse":69202,
        "Designacao":"Atividades de auditoria e revisão de contas."
    },
    {
        "Divisao":70,
        "Designacao":"Atividades das sedes sociais e de consultoria para a gestão."
    },
    {
        "Grupo":701,
        "Classe":7010,
        "Subclasse":70100,
        "Designacao":"Atividades das sedes sociais."
    },
    {
        "Grupo":702,
        "Classe":7020,
        "Subclasse":70200,
        "Designacao":"Atividades de consultoria para os negócios e outra consultoria para a gestão."
    },
    {
        "Divisao":71,
        "Designacao":"Atividades de arquitetura e de engenharia; atividades de ensaios e de análises técnicas."
    },
    {
        "Grupo":711,
        "Designacao":"Atividades de arquitetura, de engenharia e técnicas afins."
    },
    {
        "Classe":7111,
        "Subclasse":71110,
        "Designacao":"Atividades de arquitetura."
    },
    {
        "Classe":7112,
        "Subclasse":71120,
        "Designacao":"Atividades de engenharia e técnicas afins."
    },
    {
        "Grupo":712,
        "Classe":7120,
        "Subclasse":71200,
        "Designacao":"Atividades de ensaios e análises técnicas."
    },
    {
        "Divisao":72,
        "Designacao":"Investigação científica e desenvolvimento."
    },
    {
        "Grupo":721,
        "Classe":7210,
        "Designacao":"Investigação e desenvolvimento das ciências físicas e naturais."
    },
    {
        "Subclasse":72101,
        "Designacao":"Investigação e desenvolvimento em biotecnologia."
    },
    {
        "Subclasse":72102,
        "Designacao":"Outra investigação e desenvolvimento das ciências físicas e naturais."
    },
    {
        "Grupo":722,
        "Classe":7220,
        "Subclasse":72200,
        "Designacao":"Investigação e desenvolvimento das ciências sociais e humanas."
    },
    {
        "Divisao":73,
        "Designacao":"Atividades de publicidade, estudos de mercado e relações públicas"
    },
    {
        "Grupo":731,
        "Designacao":"Publicidade."
    },
    {
        "Classe":7311,
        "Subclasse":73110,
        "Designacao":"Atividades das agências de publicidade."
    },
    {
        "Classe":7312,
        "Subclasse":73120,
        "Designacao":"Atividades de representação nos meios de comunicação."
    },
    {
        "Grupo":732,
        "Classe":7320,
        "Subclasse":73200,
        "Designacao":"Estudos de mercado e sondagens de opinião."
    },
    {
        "Grupo":733,
        "Classe":7330,
        "Subclasse":73300,
        "Designacao":"Atividades de relações públicas e comunicação."
    },
    {
        "Divisao":74,
        "Designacao":"Outras atividades de consultoria, científicas, técnicas e similares."
    },
    {
        "Grupo":741,
        "Designacao":"Atividades especializadas de design."
    },
    {
        "Classe":7411,
        "Subclasse":74110,
        "Designacao":"Atividades de design de produtos industriais e de moda."
    },
    {
        "Classe":7412,
        "Subclasse":74120,
        "Designacao":"Atividades de design gráfico e de comunicação visual."
    },
    {
        "Classe":7413,
        "Subclasse":74130,
        "Designacao":"Atividades de design de interiores."
    },
    {
        "Classe":7414,
        "Subclasse":74140,
        "Designacao":"Outras atividades especializadas de design."
    },
    {
        "Grupo":742,
        "Classe":7420,
        "Subclasse":74200,
        "Designacao":"Atividades fotográficas."
    },
    {
        "Grupo":743,
        "Classe":7430,
        "Subclasse":74300,
        "Designacao":"Atividades de tradução e interpretação."
    },
    {
        "Grupo":749,
        "Designacao":"Outras atividades de consultoria, científicas, técnicas e similares, n. e."
    },
    {
        "Classe":7491,
        "Subclasse":74910,
        "Designacao":"Atividades de serviços de comercialização e corretagem de patentes."
    },
    {
        "Classe":7499,
        "Designacao":"Todas as outras atividades de consultoria, científicas, técnicas e similares, n. e."
    },
    {
        "Subclasse":74991,
        "Designacao":"Atividades de agentes de profissionais desportivos."
    },
    {
        "Subclasse":74992,
        "Designacao":"Outras atividades de consultoria, científicas, técnicas e similares, diversas, n. e., exceto agentes de profissionais desportivos."
    },
    {
        "Divisao":75,
        "Grupo":750,
        "Classe":7500,
        "Subclasse":75000,
        "Designacao":"Atividades veterinárias."
    },
    {
        "Seccao":"O",
        "Designacao":"Atividades administrativas e dos serviços de apoio."
    },
    {
        "Divisao":77,
        "Designacao":"Atividades de aluguer."
    },
    {
        "Grupo":771,
        "Designacao":"Aluguer de veículos automóveis."
    },
    {
        "Classe":7711,
        "Designacao":"Aluguer de veículos automóveis ligeiros."
    },
    {
        "Subclasse":77111,
        "Designacao":"Aluguer de veículos automóveis ligeiros de curto prazo."
    },
    {
        "Subclasse":77112,
        "Designacao":"Aluguer operacional de veículos automóveis ligeiros."
    },
    {
        "Classe":7712,
        "Subclasse":77120,
        "Designacao":"Aluguer de veículos automóveis pesados."
    },
    {
        "Grupo":772,
        "Designacao":"Aluguer de bens de uso pessoal e doméstico."
    },
    {
        "Classe":7721,
        "Designacao":"Aluguer de bens recreativos e desportivos."
    },
    {
        "Subclasse":77211,
        "Designacao":"Aluguer de bicicletas e similares."
    },
    {
        "Subclasse":77212,
        "Designacao":"Aluguer de outros bens recreativos e desportivos."
    },
    {
        "Classe":7722,
        "Subclasse":77220,
        "Designacao":"Aluguer de outros bens de uso pessoal e doméstico."
    },
    {
        "Grupo":773,
        "Designacao":"Aluguer de outras máquinas, equipamentos e bens tangíveis."
    },
    {
        "Classe":7731,
        "Subclasse":77310,
        "Designacao":"Aluguer de máquinas e equipamentos agrícolas."
    },
    {
        "Classe":7732,
        "Subclasse":77320,
        "Designacao":"Aluguer de máquinas e equipamentos para a construção e engenharia civil."
    },
    {
        "Classe":7733,
        "Subclasse":77330,
        "Designacao":"Aluguer de máquinas e equipamentos de escritório e de computadores."
    },
    {
        "Classe":7734,
        "Subclasse":77340,
        "Designacao":"Aluguer de meios de transporte marítimo e fluvial."
    },
    {
        "Classe":7735,
        "Subclasse":77350,
        "Designacao":"Aluguer de meios de transporte aéreo."
    },
    {
        "Classe":7739,
        "Subclasse":77390,
        "Designacao":"Aluguer de outras máquinas, equipamentos e bens tangíveis, n. e."
    },
    {
        "Grupo":774,
        "Classe":7740,
        "Subclasse":77400,
        "Designacao":"Locação de propriedade intelectual e produtos semelhantes, excetuando obras protegidas por direitos de autor."
    },
    {
        "Grupo":775,
        "Designacao":"Atividades de serviços de intermediação de aluguer e locação de bens corpóreos e ativos incorpóreos não financeiros."
    },
    {
        "Classe":7751,
        "Subclasse":77510,
        "Designacao":"Atividades de serviços de intermediação de aluguer e locação de automóveis, autocaravanas e reboques."
    },
    {
        "Classe":7752,
        "Subclasse":77520,
        "Designacao":"Atividades de serviços de intermediação de aluguer e locação de outros bens corpóreos e ativos incorpóreos não financeiros."
    },
    {
        "Divisao":78,
        "Designacao":"Atividades de emprego."
    },
    {
        "Grupo":781,
        "Classe":7810,
        "Subclasse":78100,
        "Designacao":"Atividades das empresas de seleção e colocação de pessoal."
    },
    {
        "Grupo":782,
        "Classe":7820,
        "Designacao":"Atividades das empresas de trabalho temporário e outro fornecimento de recursos humanos."
    },
    {
        "Subclasse":78201,
        "Designacao":"Atividades das empresas de trabalho temporário."
    },
    {
        "Subclasse":78202,
        "Designacao":"Outro fornecimento de recursos humanos."
    },
    {
        "Divisao":79,
        "Designacao":"Atividades das agências de viagens, dos operadores turísticos e outras atividades dos serviços de reservas e atividades relacionadas."
    },
    {
        "Grupo":791,
        "Designacao":"Atividades das agências de viagens e dos operadores turísticos."
    },
    {
        "Classe":7911,
        "Subclasse":79110,
        "Designacao":"Atividades das agências de viagens."
    },
    {
        "Classe":7912,
        "Subclasse":79120,
        "Designacao":"Atividades dos operadores turísticos."
    },
    {
        "Grupo":799,
        "Classe":7990,
        "Subclasse":79900,
        "Designacao":"Outros serviços de reservas e atividades relacionadas."
    },
    {
        "Divisao":80,
        "Grupo":800,
        "Designacao":"Atividades de investigação e de segurança."
    },
    {
        "Classe":8001,
        "Designacao":"Atividades de investigação e de segurança privada."
    },
    {
        "Subclasse":80011,
        "Designacao":"Atividades de segurança privada."
    },
    {
        "Subclasse":80012,
        "Designacao":"Atividades de investigação, exceto científica."
    },
    {
        "Classe":8009,
        "Subclasse":80090,
        "Designacao":"Atividades de segurança, n. e."
    },
    {
        "Divisao":81,
        "Designacao":"Atividades dos serviços relacionados com edifícios e plantação e manutenção de jardins."
    },
    {
        "Grupo":811,
        "Classe":8110,
        "Subclasse":81100,
        "Designacao":"Atividades combinadas de apoio aos edifícios."
    },
    {
        "Grupo":812,
        "Designacao":"Atividades de limpeza."
    },
    {
        "Classe":8121,
        "Subclasse":81210,
        "Designacao":"Limpeza geral de edifícios."
    },
    {
        "Classe":8122,
        "Subclasse":81220,
        "Designacao":"Outras atividades de limpeza de edifícios e em equipamentos industriais."
    },
    {
        "Classe":8123,
        "Designacao":"Outras atividades de limpeza."
    },
    {
        "Subclasse":81231,
        "Designacao":"Atividades de desinfeção, desratização e similares."
    },
    {
        "Subclasse":81232,
        "Designacao":"Outras atividades de limpeza, n. e."
    },
    {
        "Grupo":813,
        "Classe":8130,
        "Subclasse":81300,
        "Designacao":"Atividades dos serviços de plantação e manutenção de jardins."
    },
    {
        "Divisao":82,
        "Designacao":"Atividades de serviços administrativos e de apoio aos negócios."
    },
    {
        "Grupo":821,
        "Classe":8210,
        "Subclasse":82100,
        "Designacao":"Atividades de serviços administrativos e de apoio."
    },
    {
        "Grupo":822,
        "Classe":8220,
        "Subclasse":82200,
        "Designacao":"Atividades dos centros de chamadas."
    },
    {
        "Grupo":823,
        "Classe":8230,
        "Subclasse":82300,
        "Designacao":"Organização de feiras, congressos e similares."
    },
    {
        "Grupo":824,
        "Classe":8240,
        "Subclasse":82400,
        "Designacao":"Atividades de serviços de intermediação de atividades de serviços de apoio aos negócios, n. e."
    },
    {
        "Grupo":829,
        "Designacao":"Atividades de serviços de apoio aos negócios, n. e."
    },
    {
        "Classe":8291,
        "Subclasse":82910,
        "Designacao":"Atividades das agências de cobranças e de avaliação do risco de crédito."
    },
    {
        "Classe":8292,
        "Designacao":"Atividades de embalagem."
    },
    {
        "Subclasse":82921,
        "Designacao":"Engarrafamento de gases."
    },
    {
        "Subclasse":82922,
        "Designacao":"Outras atividades de embalagem."
    },
    {
        "Classe":8299,
        "Subclasse":82990,
        "Designacao":"Outras atividades de serviços de apoio aos negócios, n. e."
    },
    {
        "Seccao":"P",
        "Designacao":"Administração Pública e defesa; segurança social obrigatória."
    },
    {
        "Divisao":84,
        "Designacao":"Administração Pública e defesa; segurança social obrigatória."
    },
    {
        "Grupo":841,
        "Designacao":"Administração Pública geral, económica, social e do ambiente."
    },
    {
        "Classe":8411,
        "Designacao":"Atividades de administração pública geral."
    },
    {
        "Subclasse":84111,
        "Designacao":"Administração central."
    },
    {
        "Subclasse":84112,
        "Designacao":"Administração Regional Autónoma."
    },
    {
        "Subclasse":84113,
        "Designacao":"Administração local."
    },
    {
        "Subclasse":84114,
        "Designacao":"Atividades de apoio à Administração Pública."
    },
    {
        "Classe":8412,
        "Designacao":"Administração Pública - atividades de saúde, educação, cultura e outros serviços sociais."
    },
    {
        "Subclasse":84121,
        "Designacao":"Administração Pública - atividades de saúde."
    },
    {
        "Subclasse":84122,
        "Designacao":"Administração Pública - atividades de educação."
    },
    {
        "Subclasse":84123,
        "Designacao":"Administração Pública - atividades do ambiente."
    },
    {
        "Subclasse":84124,
        "Designacao":"Administração Pública - atividades da cultura, desporto, recreativas, habitação e de outras atividades sociais, exceto segurança social obrigatória e ambiente."
    },
    {
        "Classe":8413,
        "Subclasse":84130,
        "Designacao":"Regulação e promoção da eficiência da atividade económica."
    },
    {
        "Grupo":842,
        "Designacao":"Prestação de serviços à comunidade em geral - negócios estrangeiros, defesa, justiça, segurança, ordem pública e proteção civil."
    },
    {
        "Classe":8421,
        "Subclasse":84210,
        "Designacao":"Negócios estrangeiros."
    },
    {
        "Classe":8422,
        "Subclasse":84220,
        "Designacao":"Atividades de defesa."
    },
    {
        "Classe":8423,
        "Subclasse":84230,
        "Designacao":"Atividades de justiça."
    },
    {
        "Classe":8424,
        "Subclasse":84240,
        "Designacao":"Atividades de segurança e ordem pública."
    },
    {
        "Classe":8425,
        "Subclasse":84250,
        "Designacao":"Atividades de proteção civil."
    },
    {
        "Grupo":843,
        "Classe":8430,
        "Subclasse":84300,
        "Designacao":"Atividades de segurança social obrigatória."
    },
    {
        "Seccao":"Q",
        "Designacao":"Educação."
    },
    {
        "Divisao":85,
        "Designacao":"Educação."
    },
    {
        "Grupo":851,
        "Classe":8510,
        "Subclasse":85100,
        "Designacao":"Ensino pré-escolar."
    },
    {
        "Grupo":852,
        "Classe":8520,
        "Designacao":"Ensino básico (1.º e 2.º ciclos)."
    },
    {
        "Subclasse":85201,
        "Designacao":"Ensino básico (1.º ciclo)."
    },
    {
        "Subclasse":85202,
        "Designacao":"Ensino básico (2.º ciclo)."
    },
    {
        "Grupo":853,
        "Designacao":"Ensino básico (3.º ciclo) e secundário e pós-secundário não superior."
    },
    {
        "Classe":8531,
        "Subclasse":85310,
        "Designacao":"Ensino básico (3.º ciclo) e secundário geral."
    },
    {
        "Classe":8532,
        "Subclasse":85320,
        "Designacao":"Ensino secundário profissional."
    },
    {
        "Classe":8533,
        "Subclasse":85330,
        "Designacao":"Ensino pós-secundário não superior."
    },
    {
        "Grupo":854,
        "Classe":8540,
        "Subclasse":85400,
        "Designacao":"Ensino superior."
    },
    {
        "Grupo":855,
        "Designacao":"Outras atividades educativas."
    },
    {
        "Classe":8551,
        "Subclasse":85510,
        "Designacao":"Ensino desportivo e recreativo."
    },
    {
        "Classe":8552,
        "Subclasse":85520,
        "Designacao":"Ensino de atividades culturais."
    },
    {
        "Classe":8553,
        "Subclasse":85530,
        "Designacao":"Escolas de condução e pilotagem."
    },
    {
        "Classe":8559,
        "Designacao":"Outras atividades educativas, n. e."
    },
    {
        "Subclasse":85591,
        "Designacao":"Formação profissional."
    },
    {
        "Subclasse":85592,
        "Designacao":"Escolas de línguas."
    },
    {
        "Subclasse":85593,
        "Designacao":"Outras atividades educativas, diversas, n. e."
    },
    {
        "Grupo":856,
        "Designacao":"Atividades de apoio ao ensino."
    },
    {
        "Classe":8561,
        "Subclasse":85610,
        "Designacao":"Atividades de serviços de intermediação de cursos e tutores."
    },
    {
        "Classe":8569,
        "Subclasse":85690,
        "Designacao":"Atividades de apoio ao ensino, n. e."
    },
    {
        "Seccao":"R",
        "Designacao":"Atividades de saúde humana e ação social."
    },
    {
        "Divisao":86,
        "Designacao":"Atividades de saúde humana."
    },
    {
        "Grupo":861,
        "Classe":8610,
        "Subclasse":86100,
        "Designacao":"Atividades dos estabelecimentos de saúde com internamento."
    },
    {
        "Grupo":862,
        "Designacao":"Atividades de prática clínica em ambulatório e de medicina dentária e odontologia."
    },
    {
        "Classe":8621,
        "Subclasse":86210,
        "Designacao":"Atividades de prática clínica geral."
    },
    {
        "Classe":8622,
        "Subclasse":86220,
        "Designacao":"Atividades médicas especializadas."
    },
    {
        "Classe":8623,
        "Subclasse":86230,
        "Designacao":"Atividades de medicina dentária e odontologia."
    },
    {
        "Grupo":869,
        "Designacao":"Outras atividades de saúde humana."
    },
    {
        "Classe":8691,
        "Designacao":"Atividades dos serviços de diagnóstico por imagem e dos laboratórios de análises clínicas."
    },
    {
        "Subclasse":86911,
        "Designacao":"Atividades dos serviços dos laboratórios de análises clínicas."
    },
    {
        "Subclasse":86912,
        "Designacao":"Atividades dos serviços de diagnóstico por imagem."
    },
    {
        "Classe":8692,
        "Subclasse":86920,
        "Designacao":"Transporte de doentes em ambulância."
    },
    {
        "Classe":8693,
        "Subclasse":86930,
        "Designacao":"Atividades de psicólogos e psicoterapeutas, exceto médicos."
    },
    {
        "Classe":8694,
        "Subclasse":86940,
        "Designacao":"Atividades de enfermagem e de parteiras."
    },
    {
        "Classe":8695,
        "Subclasse":86950,
        "Designacao":"Atividades de fisioterapia."
    },
    {
        "Classe":8696,
        "Designacao":"Atividades de medicina tradicional, complementar e alternativa."
    },
    {
        "Subclasse":86961,
        "Designacao":"Atividades de terapêuticas não convencionais."
    },
    {
        "Subclasse":86962,
        "Designacao":"Outras atividades de medicina tradicional, complementar e alternativa, exceto terapêuticas não convencionais."
    },
    {
        "Classe":8697,
        "Subclasse":86970,
        "Designacao":"Atividades de serviços de intermediação de serviços médicos, odontológicos e outros serviços de saúde humana."
    },
    {
        "Classe":8699,
        "Designacao":"Outras atividades de saúde humana n. e."
    },
    {
        "Subclasse":86991,
        "Designacao":"Centros de recolha e bancos de órgãos."
    },
    {
        "Subclasse":86992,
        "Designacao":"Atividades termais."
    },
    {
        "Subclasse":86993,
        "Designacao":"Outras atividades de saúde humana, diversas, n. e."
    },
    {
        "Divisao":87,
        "Designacao":"Atividades de apoio social em estruturas residenciais."
    },
    {
        "Grupo":871,
        "Classe":8710,
        "Subclasse":87100,
        "Designacao":"Atividades de cuidados de enfermagem em estruturas residenciais."
    },
    {
        "Grupo":872,
        "Classe":8720,
        "Subclasse":87200,
        "Designacao":"Atividades de apoio social em estruturas residenciais para pessoas com doenças do foro mental ou do abuso de drogas."
    },
    {
        "Grupo":873,
        "Classe":8730,
        "Designacao":"Atividades de apoio social em estruturas residenciais para pessoas idosas ou com incapacidade física."
    },
    {
        "Subclasse":87301,
        "Designacao":"Atividades de apoio social em estruturas residenciais para pessoas idosas."
    },
    {
        "Subclasse":87302,
        "Designacao":"Atividades de apoio social em estruturas residenciais para pessoas com incapacidade física."
    },
    {
        "Grupo":879,
        "Designacao":"Outras atividades de apoio social em estruturas residenciais."
    },
    {
        "Classe":8791,
        "Subclasse":87910,
        "Designacao":"Atividades dos serviços de intermediação de atividades de apoio social em estruturas residenciais."
    },
    {
        "Classe":8799,
        "Designacao":"Outras atividades de apoio social em estruturas residenciais, n. e."
    },
    {
        "Subclasse":87991,
        "Designacao":"Atividades de apoio social em estruturas residenciais para crianças e jovens."
    },
    {
        "Subclasse":87992,
        "Designacao":"Outras atividades de apoio social em estruturas residenciais, diversas, n. e."
    },
    {
        "Divisao":88,
        "Designacao":"Atividades de ação social sem alojamento."
    },
    {
        "Grupo":881,
        "Classe":8810,
        "Designacao":"Atividades de ação social sem alojamento para pessoas idosas ou pessoas com incapacidades."
    },
    {
        "Subclasse":88101,
        "Designacao":"Atividades de ação social para pessoas idosas, sem alojamento."
    },
    {
        "Subclasse":88102,
        "Designacao":"Atividades de ação social para pessoas com incapacidades, sem alojamento."
    },
    {
        "Grupo":889,
        "Designacao":"Outras atividades de ação social sem alojamento."
    },
    {
        "Classe":8891,
        "Subclasse":88910,
        "Designacao":"Atividades de cuidados diurnos para crianças, sem alojamento."
    },
    {
        "Classe":8899,
        "Subclasse":88990,
        "Designacao":"Outras atividades de ação social sem alojamento, n. e."
    },
    {
        "Seccao":"S",
        "Designacao":"Atividades artísticas, desportivas e recreativas."
    },
    {
        "Divisao":90,
        "Designacao":"Atividades de criação artística e das artes do espetáculo."
    },
    {
        "Grupo":901,
        "Designacao":"Atividades de criação artística."
    },
    {
        "Classe":9011,
        "Subclasse":90110,
        "Designacao":"Atividades de criação literária e de composição musical."
    },
    {
        "Classe":9012,
        "Subclasse":90120,
        "Designacao":"Atividades de criação de artes visuais."
    },
    {
        "Classe":9013,
        "Subclasse":90130,
        "Designacao":"Outras atividades de criação artística."
    },
    {
        "Grupo":902,
        "Classe":9020,
        "Subclasse":90200,
        "Designacao":"Atividades das artes do espetáculo."
    },
    {
        "Grupo":903,
        "Designacao":"Atividades de apoio à criação artística e às artes do espetáculo."
    },
    {
        "Classe":9031,
        "Subclasse":90310,
        "Designacao":"Exploração de salas e locais de espetáculos."
    },
    {
        "Classe":9039,
        "Subclasse":90390,
        "Designacao":"Outras atividades de apoio à criação artística e às artes do espetáculo."
    },
    {
        "Divisao":91,
        "Designacao":"Atividades de bibliotecas, arquivos, museus e outras atividades culturais."
    },
    {
        "Grupo":911,
        "Designacao":"Atividades de bibliotecas e arquivos."
    },
    {
        "Classe":9111,
        "Subclasse":91110,
        "Designacao":"Atividades das bibliotecas."
    },
    {
        "Classe":9112,
        "Subclasse":91120,
        "Designacao":"Atividades dos arquivos."
    },
    {
        "Grupo":912,
        "Designacao":"Atividades de museus, coleções, sítios e monumentos históricos."
    },
    {
        "Classe":9121,
        "Subclasse":91210,
        "Designacao":"Atividades de museus e coleções."
    },
    {
        "Classe":9122,
        "Subclasse":91220,
        "Designacao":"Atividades dos sítios e monumentos históricos."
    },
    {
        "Grupo":913,
        "Classe":9130,
        "Subclasse":91300,
        "Designacao":"Atividades de conservação, restauro e outras atividades de apoio ao património cultural."
    },
    {
        "Grupo":914,
        "Designacao":"Atividades dos jardins botânicos e zoológicos e das reservas naturais."
    },
    {
        "Classe":9141,
        "Subclasse":91410,
        "Designacao":"Atividades dos jardins botânicos e zoológicos."
    },
    {
        "Classe":9142,
        "Subclasse":91420,
        "Designacao":"Atividades das reservas naturais."
    },
    {
        "Divisao":92,
        "Grupo":920,
        "Classe":9200,
        "Designacao":"Lotarias e outros jogos de apostas."
    },
    {
        "Subclasse":92001,
        "Designacao":"Organização e exploração de lotarias e outros jogos de aposta."
    },
    {
        "Subclasse":92002,
        "Designacao":"Atividades dos mediadores dos Jogos Sociais do Estado."
    },
    {
        "Divisao":93,
        "Designacao":"Atividades desportivas, de diversão e recreativas."
    },
    {
        "Grupo":931,
        "Designacao":"Atividades desportivas."
    },
    {
        "Classe":9311,
        "Subclasse":93110,
        "Designacao":"Gestão de instalações desportivas."
    },
    {
        "Classe":9312,
        "Subclasse":93120,
        "Designacao":"Atividades dos clubes desportivos."
    },
    {
        "Classe":9313,
        "Subclasse":93130,
        "Designacao":"Atividades dos centros de manutenção física."
    },
    {
        "Classe":9319,
        "Designacao":"Atividades desportivas, n. e."
    },
    {
        "Subclasse":93191,
        "Designacao":"Organismos reguladores das atividades desportivas."
    },
    {
        "Subclasse":93192,
        "Designacao":"Outras atividades desportivas, n. e."
    },
    {
        "Grupo":932,
        "Designacao":"Atividades de diversão e recreativas."
    },
    {
        "Classe":9321,
        "Designacao":"Atividades dos parques de diversão e temáticos."
    },
    {
        "Subclasse":93211,
        "Designacao":"Atividades de parques de diversão itinerantes."
    },
    {
        "Subclasse":93212,
        "Designacao":"Atividades dos parques de diversão e temáticos fixos."
    },
    {
        "Classe":9329,
        "Designacao":"Atividades de diversão e recreativas, n. e."
    },
    {
        "Subclasse":93291,
        "Designacao":"Atividades tauromáquicas."
    },
    {
        "Subclasse":93292,
        "Designacao":"Atividades dos portos de recreio (marinas)."
    },
    {
        "Subclasse":93293,
        "Designacao":"Organização de atividades de animação turística."
    },
    {
        "Subclasse":93294,
        "Designacao":"Outras atividades de diversão fixas e outras atividades recreativas."
    },
    {
        "Subclasse":93295,
        "Designacao":"Outras atividades de diversão itinerantes."
    },
    {
        "Seccao":"T",
        "Designacao":"Outras atividades de serviços."
    },
    {
        "Divisao":94,
        "Designacao":"Atividades das organizações associativas."
    },
    {
        "Grupo":941,
        "Designacao":"Atividades de organizações económicas, patronais e profissionais."
    },
    {
        "Classe":9411,
        "Subclasse":94110,
        "Designacao":"Atividades de organizações económicas e patronais."
    },
    {
        "Classe":9412,
        "Subclasse":94120,
        "Designacao":"Atividades de organizações profissionais."
    },
    {
        "Grupo":942,
        "Classe":9420,
        "Subclasse":94200,
        "Designacao":"Atividades de organizações sindicais."
    },
    {
        "Grupo":949,
        "Designacao":"Outras atividades de organizações associativas."
    },
    {
        "Classe":9491,
        "Subclasse":94910,
        "Designacao":"Atividades de organizações religiosas."
    },
    {
        "Classe":9492,
        "Subclasse":94920,
        "Designacao":"Atividades de organizações políticas."
    },
    {
        "Classe":9499,
        "Designacao":"Atividades de outras organizações associativas, n. e."
    },
    {
        "Subclasse":94991,
        "Designacao":"Associações culturais e recreativas."
    },
    {
        "Subclasse":94992,
        "Designacao":"Associações de defesa do ambiente."
    },
    {
        "Subclasse":94993,
        "Designacao":"Associações de juventude e de estudantes."
    },
    {
        "Subclasse":94994,
        "Designacao":"Associações de pais e encarregados de educação."
    },
    {
        "Subclasse":94995,
        "Designacao":"Outras atividades associativas, n. e."
    },
    {
        "Divisao":95,
        "Designacao":"Reparação e manutenção de computadores, bens de uso pessoal e doméstico, veículos automóveis e motociclos."
    },
    {
        "Grupo":951,
        "Classe":9510,
        "Designacao":"Reparação e manutenção de computadores e de equipamento de comunicação."
    },
    {
        "Subclasse":95101,
        "Designacao":"Reparação e manutenção de computadores e de equipamento periférico."
    },
    {
        "Subclasse":95102,
        "Designacao":"Reparação e manutenção de equipamento de comunicação."
    },
    {
        "Grupo":952,
        "Designacao":"Reparação e manutenção de bens de uso pessoal e doméstico."
    },
    {
        "Classe":9521,
        "Subclasse":95210,
        "Designacao":"Reparação e manutenção de televisores e outros produtos similares de eletrónica de consumo."
    },
    {
        "Classe":9522,
        "Subclasse":95220,
        "Designacao":"Reparação e manutenção de eletrodomésticos e de outros equipamentos de uso doméstico e para jardim."
    },
    {
        "Classe":9523,
        "Subclasse":95230,
        "Designacao":"Reparação e manutenção de calçado e de artigos de couro."
    },
    {
        "Classe":9524,
        "Subclasse":95240,
        "Designacao":"Reparação e manutenção de mobiliário e similares, de uso doméstico."
    },
    {
        "Classe":9525,
        "Subclasse":95250,
        "Designacao":"Reparação e manutenção de relógios e de artigos de joalharia."
    },
    {
        "Classe":9529,
        "Subclasse":95290,
        "Designacao":"Reparação e manutenção de bens de uso pessoal e doméstico, n. e."
    },
    {
        "Grupo":953,
        "Designacao":"Reparação e manutenção de veículos automóveis e motociclos."
    },
    {
        "Classe":9531,
        "Subclasse":95310,
        "Designacao":"Reparação e manutenção de veículos automóveis."
    },
    {
        "Classe":9532,
        "Subclasse":95320,
        "Designacao":"Reparação e manutenção de motociclos."
    },
    {
        "Grupo":954,
        "Classe":9540,
        "Subclasse":95400,
        "Designacao":"Atividades de serviços de intermediação de reparação e manutenção de computadores, bens de uso pessoal e doméstico, e veículos automóveis e motociclos."
    },
    {
        "Divisao":96,
        "Designacao":"Atividades de serviços pessoais."
    },
    {
        "Grupo":961,
        "Classe":9610,
        "Subclasse":96100,
        "Designacao":"Lavagem e limpeza de têxteis e peles."
    },
    {
        "Grupo":962,
        "Designacao":"Atividades de salões de cabeleireiro, institutos de beleza, centros de bem-estar e atividades semelhantes."
    },
    {
        "Classe":9621,
        "Subclasse":96210,
        "Designacao":"Atividades de salões de cabeleireiro e barbeiros."
    },
    {
        "Classe":9622,
        "Subclasse":96220,
        "Designacao":"Atividades de cuidados de beleza e outras atividades de tratamentos de beleza."
    },
    {
        "Classe":9623,
        "Subclasse":96230,
        "Designacao":"Atividades de centros de bem-estar, saunas e banhos de vapor."
    },
    {
        "Grupo":963,
        "Classe":9630,
        "Subclasse":96300,
        "Designacao":"Atividades funerárias e conexas."
    },
    {
        "Grupo":964,
        "Classe":9640,
        "Subclasse":96400,
        "Designacao":"Atividades de serviços de intermediação dos serviços pessoais."
    },
    {
        "Grupo":969,
        "Designacao":"Outras atividades de serviços pessoais."
    },
    {
        "Classe":9691,
        "Subclasse":96910,
        "Designacao":"Atividades de prestação de serviços pessoais domésticos."
    },
    {
        "Classe":9699,
        "Designacao":"Outras atividades de serviços pessoais, n. e."
    },
    {
        "Subclasse":96991,
        "Designacao":"Atividades de tatuagem e similares."
    },
    {
        "Subclasse":96992,
        "Designacao":"Atividades dos serviços para animais de companhia."
    },
    {
        "Subclasse":96993,
        "Designacao":"Outras atividades de serviços pessoais diversas, n. e."
    },
    {
        "Seccao":"U",
        "Designacao":"Atividades das famílias empregadoras de pessoal doméstico e atividades de produção de bens e serviços pelas famílias para uso próprio."
    },
    {
        "Divisao":97,
        "Grupo":970,
        "Classe":9700,
        "Subclasse":97000,
        "Designacao":"Atividades das famílias empregadoras de pessoal doméstico."
    },
    {
        "Divisao":98,
        "Designacao":"Atividades de produção de bens e serviços pelas famílias para uso próprio."
    },
    {
        "Grupo":981,
        "Classe":9810,
        "Subclasse":98100,
        "Designacao":"Atividades de produção de bens pelas famílias para uso próprio."
    },
    {
        "Grupo":982,
        "Classe":9820,
        "Subclasse":98200,
        "Designacao":"Atividades de produção de serviços pelas famílias para uso próprio."
    },
    {
        "Seccao":"V",
        "Designacao":"Atividades dos organismos internacionais e outras instituições extraterritoriais."
    },
    {
        "Divisao":99,
        "Grupo":990,
        "Classe":9900,
        "Subclasse":99000,
        "Designacao":"Atividades dos organismos internacionais e outras instituições extraterritoriais."
    }
]
