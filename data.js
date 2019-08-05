let sustantive = [
    'gat(o|a)', 'perr(o|a)', 'nube(f)', 'chin(o|a)', 'tarta(f)', 'gas(m)', 'humo(m)',
    'churro(m)', 'bola(f)', 'bolsa(f)', 'liebre(f)', 'violín(m)', 'cerilla(f)', 'pisto(m)',
    'ensalada(f)', 'queso(m)', 'anacardo(m)', 'pluma(f)', 'profeta(m)', 'lengua(f)',
    'charco(m)', 'manillar(m)', 'lenteja(f)', 'pleito(m)', 'perejil(m)', 'The Rock(m)',
    'Aznar(m)', 'Rey Misterio(m)', 'Venezuela(f)', 'porro(m)', 'alicate(m)', 'cerd(o|a)',
    'Pepe(m)', 'cobra(f)','llufa(f)', 'dandy(m)', 'granuja(m)', 'disparate(m)','ganador(m)',
    'simio(m)', 'dratini(m)', 'discoteca(f)', 'amanecer(m)', 'llúdriga(m)', 'sexo(m)', 'gay(m)',
    'orificio(m)', 'prenda(f)', 'vaca(f)', 'Julián(m)', 'yema(f)', 'sugus(m)', 'martillo(m)',
    'martillo(m)', 'tenaza(f)', 'Messi(m)', 'bafle(m)', 'madera(f)', 'Bartolo(m)', 'súplex(m)',
    'goblin(m)', 'vampiro(m)', 'niñ(o|a)', 'yegua(f)', 'lince(m)', 'pastilla(f)', 'Trankimazin(m)',
    'durum(m)', 'litrona(f)', 'rincón(m)', 'Valtonyc(m)', 'dembow(m)', 'jarabe(m)', 'punk(m)',
    'sardina(f)', 'guitarra(f)', 'Pablo Iglesias(m)',  'madre(f)', 'arepa(f)', 'Iniesta(m)',
    'vena(f)', 'incel(m)', 'Sinatra(m)', 'mantequilla(f)', 'pillín(m)', 'legionari(o|a)',
    'Garurumon(m)', 'Omega El Fuerte(m)', 'mármol(m)', 'fideo(m)', 'ave(f)', 'huevo(m)',
    'emo(m)', 'cinturón(m)', 'Vodafone(m)', 'estornudo(m)', 'gnomo(m)', 'petanca(m)',
    'substancia(f)', 'gramo(m)', 'arcilla(f)', 'sabor(m)', 'rave(f)', 'pepa(f)', 'Nespresso(m)',
    'Wallapop(m)', 'Mentos(m)', 'huella(f)', 'manguera(f)', 'clan(m)', 'buga(m)', 'gube(m)',
    'gamba(f)', 'Camarón(m)', 'caca(f)', 'alzamiento(m)', 'gruñolo(m)', 'bagule(m)', 'bugaléy(m)',
    'boño(m)', 'bamba(f)', 'fieltro(m)', 'baya(f)', 'nata(f)', 'gesto(m)', 'anochecer(m)',
    'carabina(f)', 'bala(f)'
];
let adjective = [
    'pinchad(o|a)', 'hinchad(o|a)', 'canos(o|a)', 'aliñad(o|a)', 'gord(o|a)', 'lent(o|a)',
    'bonit(o|a)', 'avaricios(o|a)', 'verde', 'boricua', 'carnos(o|a)', 'futil', 'negr(o|a)',
    'increíble', 'vicios(o|a)', 'franc(és|esa)', 'alegre', 'pelud(o|a)', 'ingenios(o|a)',
    'pesad(o|a)', 'maric(ón|ona)', 'buen(o|a)','trucado(m)', 'melenud(o|a)', 'calculad(o|a)',
    'imposible', 'juerguista', 'cansad(o|a)', 'espumos(o|a)', 'infeliz', 'locuaz', 'prensad(o|a)',
    'cabr(ón|ona)', 'amarill(o|a)', 'reventad(o|a)', 'lind(o|a)', 'fetén', 'bacan(o|a)',
    'culia(o|da)', 'asfaltad(o|a)', 'marran(o|a)', 'madrileñ(o|a)', 'patán', 'garbos(o|a)',
    'cachond(o|a)', 'shiny', 'incel', 'aceitos(o|a)', 'húmed(o|a)', 'astut(o|a)', 'alzad(o|a)',
    'picante', 'dulce', 'salad(o|a)', 'musculos(o|a)', 'doblad(o|a)', 'muscular', 'genial',
    'antigu(o|a)', 'legendari(o|a)', 'místic(o|a)', 'fascista', 'judí(o|a)', 'vegan(o|a)',
    'roj(o|a)', 'indepe', 'mediterráne(o|a)', 'lent(o|a)', 'suave', 'immediat(o|a)', 'elegante',
    'astut(o|a)', 'asqueros(o|a)', 'erótic(o|a)', 'militar', 'sec(o|a)', 'bob(o|a)',
];
let place = [
    'Diamant', 'Chaus', 'Bangladesh', 'el circo', 'Sabadell', 'Calafell', 'Irlanda',
    'el parque', 'los Pirineos', 'el mar', 'mi habitación', 'el banco', 'Bilbao',
    'Namek', 'Lleida', 'el bloque', 'el fiordo', 'República Dominicana', 'un rincón',
    'el Macdonals', 'el barrio', 'la calle', 'el Sonar', 'Sarriá', 'Gracia', 'Vic',
    'la cocina', 'el desierto', 'la zona', 'la Bola Negra', 'la trap house', 'Plaza Castilla',
    'Badalona', 'un huequito',
];
let verbGerund = [
    'comiendo', 'sucando', 'driblando', 'asando', 'silbando', 'esnifando', 'oliendo',
    'pelando', 'cascando', 'gozando', 'wildin\'', 'boolin\'', 'gritando', 'mintiendo',
    'arrimando', 'reflexionando', 'peleando', 'mascando', 'lamiendo', 'untando',
    'rockeando', 'bailando', 'peinando', 'descubriendo', 'gateando', 'explorando',
    'ignorando', 'volando', 'planeando', 'jugando', 'calibrando', 'pintando',
    'rescatando', 'esperando', 'quemando', 'boosteando', 'cincelando', 'clavando',
    'operando', 'musculando', 'rindiendo', 'fallando', 'secando', 'afinando',
    'esculpiendo', 'produciendo', 'escupiendo', 'marinando', 'ballin\'', 'bebiendo',
    'arreglando', 'getteando', 'blasteando', 'salpimentando', 'exprimiendo', 'droppeando',
    
];
let verbInfinitive = [
    'comer', 'rapar', 'discriminar', 'amar', 'fisgar', 'lamer', 'defenestrar', 'luchar',
    'bailar', 'follar', 'especiar', 'cocinar', 'lamer', 'beber', 'untar', 'esperar',
    'soñar', 'flirtear', 'pajear', 'descubrir', 'filtrar', 'ver', 'espiar', 'tumbar',
    'alterar', 'imprimir', 'almorzar', 'lubricar', 'boostear', 'frenar', 'muscular',
    'fruncir', 'olisquear', 'vomitar', 'esnifar', 'clavar', 'menear', 'mear', 'follar',
    'chamuscar', 'amarrar', 'fundir', 'glotonear', 'castrar', 'asar', 'gritar', 'mojar',
    'secar', 'marinar', 'gettear', 'blastear', 'salpimentar', 'exprimir', 'calibrar',
    'masturbar',
];
let verbParticle = [
    'contra', 'con', 'a', 'en', 'sobre', 'sin', 'bajo', 'desde', 'hasta'
];
let adverb = [
    'lento', 'de puta madre', 'fatal', 'genial', 'rápido', 'con prisa', 'de chill',
    'sin esfuerzo', 'de mala manera', 'a duras penas', 'por el meme', 'de golpe',
    'de immediato', 'lo antes posible', 'de pasada', 'de mañaneo', 'de lujo', 'como si nada',

];
let adverbParticle = [
    'a lo', 'cual'
];

let words = {
    sustantive,
    adjective,
    place,
    verbGerund,
    adverb,
    verbInfinitive,
    verbParticle,
    adverbParticle,
};

module.exports = words;