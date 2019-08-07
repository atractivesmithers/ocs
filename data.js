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
    'gamba(f)', 'Camarón(m)', 'caca(f)', 'alzamiento(m)', 'leyenda(f)', 'jugo(m)',
    'boño(m)', 'bamba(f)', 'fieltro(m)', 'baya(f)', 'nata(f)', 'gesto(m)', 'anochecer(m)',
    'carabina(f)', 'bala(f)', 'bigote(m)', 'ruleta(f)', 'Digimon(m)', 'avena(f)', 'lana(f)',
    'Play 2(f)', 'Wii(f)', 'gamarús(m)', 'cabr(ón|ona)', 'crack(m)', 'makina(m)', 'artista(m)',
    'melena(f)', 'garfio(m)', 'bebé(|)', 'nadó(m)', 'Satanás(m)', 'Judas(m)', 'Galileo(m)',
    'Pujol(m)', 'Siscu(m)', 'Ronho(m)', 'Robinho(m)', 'Figo(m)', 'Saviola(m)', 'Deco(m)',
    'Veletti(m)', 'McCarthy(m)', 'doblón(m)', 'rublo(m)', 'Roblox(m)', 'Minecraft(m)',
    'mota(f)', 'carajillo(m)', 'copa(f)', 'copita(f)', 'canuto(m)', 'vaina(f)', 'cabeza(f)', 
    'Baltasar(m)', 'corito(m)', 'mango(m)', 'cuscús(m)', 'yay(o|a)','doctor(|a)','abogad(o|a)',
    'mirada(f)', 'beso(m)', 'grito(m)', 'reunión(f)', 'mermelada(f)', 'horchata(f)',
    'gueriller(o|a)', 'juez(|)', 'DS(f)', 'iPhone(m)'
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
    'astut(o|a)', 'asqueros(o|a)', 'erótic(o|a)', 'militar', 'sec(o|a)', 'bob(o|a)', 'guap(o|a)',
    'rare', 'badass', 'comfi', 'chismos(o|a)', 'grumos(o|a)', 'líquid(o|a)', 'sólid(o|a)', 'guay',
    'guap(o|a)', 'imbécil', 'amateur', 'salacious', 'pompos(o|a)', 'edipos(o|a)', 'rastrer(o|a)',
    'petit(|e)', 'jocos(o|a)', 'exquisit(o|a)', 'san(o|a)', 'dominican(o|a)', 'precios(o|a)',
    'invisible', 'apestos(o|a)', 'ingrávid(o|a)', 'maj(o|a)', 'simpátic(o|a)', 'agradable',
    'desagradable', 'arcaic(o|a)', 'futurista', 'estudios(o|a)', 'dur(o|a)', 'bland(o|a)',
    'racista', 'sexista', 'capacitista',
];
let place = [
    'Diamant', 'Chaus', 'Bangladesh', 'el circo', 'Sabadell', 'Calafell', 'Irlanda',
    'el parque', 'los Pirineos', 'el mar', 'mi habitación', 'el banco', 'Bilbao',
    'Namek', 'Lleida', 'el bloque', 'el fiordo', 'República Dominicana', 'un rincón',
    'el Macdonals', 'el barrio', 'la calle', 'el Sonar', 'Sarriá', 'Gracia', 'Vic',
    'la cocina', 'el desierto', 'la zona', 'la Bola Negra', 'la trap house', 'Plaza Castilla',
    'Badalona', 'un huequito', 'la plaza de toros', 'el Condis', 'el Carrefur',
    'el 24'
];
let verbInfinitive = [
    'comer', 'rapar', 'discriminar', 'amar', 'fisgar', 'lamer', 'defenestrar', 'luchar',
    'bailar', 'follar', 'especiar', 'cocinar', 'lamer', 'beber', 'untar', 'esperar',
    'soñar', 'flirtear', 'pajear', 'descubrir', 'filtrar', 'ver', 'espiar', 'tumbar',
    'alterar', 'imprimir', 'almorzar', 'lubricar', 'boostear', 'frenar', 'muscular',
    'fruncir', 'olisquear', 'vomitar', 'esnifar', 'clavar', 'menear', 'mear', 'follar',
    'chamuscar', 'amarrar', 'fundir', 'glotonear', 'castrar', 'asar', 'gritar', 'mojar',
    'secar', 'marinar', 'gettear', 'blastear', 'salpimentar', 'exprimir', 'calibrar',
    'masturbar', 'hundir', 'sucar', 'driblar', 'asar', 'silbar', 'esnifar', 'oler',
    'pelar', 'cascar', 'gozar', 'wildear', 'booliar', 'mentir', 'arrimar', 'reflexionar',
    'pelear', 'mascar', 'lamer', 'rockear', 'peinar', 'arreglar', 'ballear', 'escupir', 
    'gatear', 'explorar', 'ignorar', 'volar', 'planear', 'jugar', 'pintar', 'rescatar',
    'esperar', 'quemar', 'cincelar', 'operar', 'rendir', 'fallar', 'afinar', 'esculpir',
    'producir', 'droppear', 'agenciar', 'disparar', 'goler', 'macerar', 'biselar',
    'marcar', 'lavar', 'manchar', 'hervir',
];
let verbParticle = [
    'contra', 'con', 'a', 'en', 'sobre', 'sin', 'bajo', 'desde', 'hasta'
];
let adverb = [
    'lento', 'de puta madre', 'fatal', 'genial', 'rápido', 'con prisa', 'de chill',
    'sin esfuerzo', 'de mala manera', 'a duras penas', 'por el meme', 'de golpe',
    'de immediato', 'lo antes posible', 'de pasada', 'de mañaneo', 'de lujo', 'como si nada',
    'forzosamente', 'regular', 'bien pepino', 'bien heavy', 'ambiciosamente'
];
let adverbParticle = [
    'a lo', 'cual'
];
let level = [
    'muy', 'poco', 'ligeramente', 'extremadamente', 'intensamente', 'sorprendentemente',
    'brutalmente', 'inesperadamente', 'fuertemente',
];

let gube = [
    'ga', 'ge', 'gi', 'go', 'gu',
    'ba', 'bi', 'bu', 'be', 'bo',
    'mo', 'mu', 'ma', 'me',
    'ño', 'ñi', 'ñu', 'ña', 'ñe',
    'gre', 'bloc', 'glo', 'zze',
    'zzu', 'clu', 'gri', 'mun',
    'bra', 'ggu', 'lib',
    'cho', 'chu', 'chi', 'che',
    'shi', 'sho', 'sha', 
];
let gubeEnding = [
    'ñolo', 'ré', 'lé', 'nik', 'zzek', 'loc', 'gra', 'nus', 'ñí', 'be'
];

let words = {
    sustantive,
    adjective,
    place,
    adverb,
    verbInfinitive,
    verbParticle,
    adverbParticle,
    level,
    //
    gube,
    gubeEnding,
};

module.exports = words;