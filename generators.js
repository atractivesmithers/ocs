let words = require('./data');
let {
    pluralize,
    getRandomItem,
    getUniqueElement,
    withProbability,
    getGender,
    getGenderedElement,
    getRandomGender,
    diminutive,
    eo,
    getRandomNumber,
    getElementWithGender,
    makeInfinitiveVerbGerund,
    diz,
    addRandomLevel,
    te,
    mangleWord,
    isTransitive,
    hasCharacteristic,
} = require('./utils');

const generateVerbInfinitive = ({happenings}) => {
    let element = getUniqueElement({ happenings, type: 'verbInfinitive' });
    let characteristics = element.match(/\[([^)]+)\]/)[1].split(',');
    let verbInfinitive = element.split('[')[0];
    return {
        verbInfinitive,
        characteristics,
    };
}

const generateVerbInfinitiveWithCharacteristic = ({happenings, characteristic}) => {
    let fulfillsCondition;
    let verb;
    let verbCharacteristics;
    while (fulfillsCondition !== true) {
        const { verbInfinitive, characteristics } = generateVerbInfinitive({ happenings });
        fulfillsCondition = hasCharacteristic({characteristics, characteristic});
        verb = verbInfinitive;
        verbCharacteristics = characteristics;
    }
    return {
        verbInfinitive: verb,
        characteristics: verbCharacteristics,
    };
}

const generateTransitiveVerbInfinitive = ({happenings}) => {
    return generateVerbInfinitiveWithCharacteristic({ happenings, characteristic: 'trans'});
}

const generateIntransitiveVerbInfinitive = ({happenings}) => {
    return generateVerbInfinitiveWithCharacteristic({ happenings, characteristic: 'intrans'});
}

const generateVerbGerund = ({happenings}) => {
    const { verbInfinitive, characteristics } = generateVerbInfinitive({ happenings });
    let verbGerund = makeInfinitiveVerbGerund(verbInfinitive);
    if (withProbability(0.3) && hasCharacteristic({characteristics, characteristic: 'trans'})) {
    	if (withProbability(0.3)) {
	        let verbParticle = getUniqueElement({ happenings, type: 'verbParticle' });
	        verbGerund = `${verbGerund} ${verbParticle}`;
	    }
        let {
	        sustantive,
	        sustantiveGender,
	        isPlural,
	    } = generateSustantive({happenings});
        verbGerund = `${verbGerund} ${sustantive}`; // TODO: this only if transitive!!!
    }
    if (withProbability(0.3)) {
        let adverb;
        if (withProbability(0.2)) {
            let { sustantive } = generateSustantive({ happenings });
            adverb = `a lo ${sustantive}`; // TODO: generic a lo, como un/a
        } else if (withProbability(0.2)) {
            let {
                article,
                articleGender,
                isPlural,
            } = generateArticle({concrete: false});
            let { sustantive } = generateSustantive({
                happenings,
                gender: articleGender,
                doPluralize: isPlural,
            });
            adverb = `como ${article} ${sustantive}`; // TODO: generic a lo, como un/a
        } else {
            adverb = generateAdverb({ happenings });
        }
        verbGerund = `${verbGerund} ${adverb}`;
    }
    return verbGerund;
}

const generateSustantivizedAdjective = ({happenings}) => {
	let gender = getRandomGender();
    let adjective = getUniqueElement({ happenings, type: 'adjective' });
    adjective = getGenderedElement({ gender, element: adjective });
    let doDiminutive = withProbability(0.05);
    if (doDiminutive) {
        adjective = diminutive({word: adjective, gender});
    }
    adjective = pluralize(adjective);
    return adjective;
}

const generateVerbTe = ({happenings}) => {
    let fumarte = withProbability(0.2);
    if (fumarte) return te('fumar');
    let { verbInfinitive, characteristics } = generateTransitiveVerbInfinitive({ happenings });
    return te(verbInfinitive);
}

const generateSustantive = ({happenings, gender, doPluralize}) => {
    let sustantive;
    let sustantiveGender;
    if (!gender) {
        sustantive = getUniqueElement({ happenings, type: 'sustantive' });
        sustantiveGender = getGender(sustantive);
    } else {
        sustantive = getElementWithGender({ happenings, gender, type: 'sustantive'});
        sustantiveGender = gender;
    }
    sustantive = getGenderedElement({ gender: sustantiveGender, element: sustantive });
    let doDiminutive = withProbability(0.05);
    if (doDiminutive) {
        sustantive = diminutive({word: sustantive, gender: sustantiveGender});
    }
    doPluralize = doPluralize !== undefined ? doPluralize : withProbability(0.1);
    if (doPluralize) {
        sustantive = pluralize(sustantive);
    } else if (sustantiveGender === 'm' && !doDiminutive) {
        let doEo = withProbability(0.05);
        if (doEo) {
            sustantive = eo(sustantive);
        }
    }
    return {
    	sustantive,
    	sustantiveGender,
    	isPlural: doPluralize,
    };
}

const generateArticle = ({ gender, doPluralize, concrete, a }) => {
    let options;
    if (concrete) {
        if (a) {
            options = {
                m: {
                    p: 'a los',
                    s: 'al',
                },
                f: {
                    p: 'a las',
                    s: 'a la',
                }
            };
        } else {
            options = {
                m: {
                    p: 'los',
                    s: 'el',
                },
                f: {
                    p: 'las',
                    s: 'la',
                }
            };
        }
    } else {
        if (a) {
            options = {
                m: {
                    p: 'a unos',
                    s: 'a un',
                },
                f: {
                    p: 'a unas',
                    s: 'a una',
                }
            };
        } else {
            options = {
                m: {
                    p: 'unos',
                    s: 'un',
                },
                f: {
                    p: 'unas',
                    s: 'una',
                }
            };
        }
    }
    let articleGender = gender ? gender : getRandomGender();
    let isPlural = doPluralize !== undefined ? doPluralize : withProbability(0.3);
    let article = options[articleGender][isPlural ? 'p' : 's'];
    if (concrete && isPlural && withProbability(0.05)) {
        article = `${article} ${getRandomNumber()}`;
    }
    return {
        article,
        articleGender,
        isPlural,
    }
}

const generateAdjective = ({happenings, gender, doPluralize}) => {
    let adjective;
    let adjectiveGender;
    let doLevel = withProbability(0.15);
    doPluralize = doPluralize !== undefined ? doPluralize : withProbability(0.15);
    let isDizo = withProbability(0.06);
    if (isDizo) {
        adjectiveGender = gender || getRandomGender();
        let { verbInfinitive, characteristics } = generateVerbInfinitive({ happenings });
        adjective = diz({ verb: verbInfinitive, gender: adjectiveGender, doPluralize });
        if (doLevel) {
            adjective = addRandomLevel(adjective);
        }
        return {
            adjective,
            adjectiveGender,
            isPlural: doPluralize,
        };
    }
    if (!gender) {
        adjective = getUniqueElement({ happenings, type: 'adjective' });
        adjectiveGender = getGender(adjective);
    } else {
        adjective = getElementWithGender({ happenings, gender, type: 'adjective'});
        adjectiveGender = gender;
    }
    adjective = getGenderedElement({ gender: adjectiveGender, element: adjective });
    let doDiminutive = withProbability(0.05);
    if (doDiminutive) {
        adjective = diminutive({word: adjective, gender: adjectiveGender});
    }
    if (doPluralize) {
        adjective = pluralize(adjective);
    }
    if (doLevel) {
        adjective = addRandomLevel(adjective);
    }
    return {
        adjective,
        adjectiveGender,
        isPlural: doPluralize,
    };
}

const generateAdverb = ({happenings}) => {
    let adverb;
    let buildAdverb = withProbability(0.4);
    let mente = withProbability(0.4);
    if (buildAdverb) {
        // TODO: gendered adverb particles
        // the sustantive generated here should be singular, for example, for 'a lo'.
        let adverbParticle = getUniqueElement({ happenings, type: 'adverbParticle' });
        let { sustantive, sustantiveGender } = generateSustantive({ happenings });
        adverb = `${adverbParticle} ${sustantive}`;
    } else if (mente) {
        let adjective;
        let adjectiveGender;
        adjective = getElementWithGender({ happenings, gender: 'f', type: 'adjective'});
        adjectiveGender = 'f';
        adjective = getGenderedElement({ gender: 'f', element: adjective });
        adverb = `${adjective}mente`;
    } else {
        adverb = getUniqueElement({ happenings, type: 'adverb' });
    }
    return adverb;
}

const generateGube = () => {
    let happenings = [];
    let gubeLength = getRandomItem([1,2,2,2,3]);
    let gube = '';
    for (let i = 0; i < gubeLength; i++) {
        gube += getUniqueElement({ happenings, type: 'gube' });
    }
    if (withProbability(0.2)) {
        generatedOc = mangleWord({ word: gube, intensity: 5 });
    }
    let gubeEnding = getUniqueElement({ happenings, type: 'gubeEnding' });
    return `${gube}${gubeEnding}`;
}

const generateQueATu = () => {
    let queATus = {
        old: {
            m: 'marido',
            f: 'esposa',
        },
        young: {
            m: 'novio',
            f: 'novia',
        }
    };
    let queATuGender = withProbability(0.3) ? 'm' : 'f';
    let queATuAge = withProbability(0.3) ? 'old' : 'young';
    let queATu = `que a tu ${queATus[queATuAge][queATuGender]} ${queATuGender === 'm' ? 'lo' : 'la'} conozcan en el barrio como`;
    return {
        queATu,
        queATuGender,
    };
}

module.exports = {
	generateVerbGerund,
	generateSustantivizedAdjective,
	generateSustantive,
    generateArticle,
    generateAdjective,
    generateAdverb,
    generateVerbTe,
    generateGube,
    generateVerbInfinitive,
    generateTransitiveVerbInfinitive,
    generateIntransitiveVerbInfinitive,
    generateQueATu,
};
