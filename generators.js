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
} = require('./utils');

const generateVerbGerund = ({happenings}) => {
    let verbInfinitive = getUniqueElement({ happenings, type: 'verbInfinitive' });
    let verbGerund = makeInfinitiveVerbGerund(verbInfinitive);
    if (withProbability(0.3)) {
    	if (withProbability(0.6)) {
	        let verbParticle = getUniqueElement({ happenings, type: 'verbParticle' });
	        verbGerund = `${verbGerund} ${verbParticle}`;
	    }
        let {
	        sustantive,
	        sustantiveGender,
	        isPlural,
	    } = generateSustantive({happenings});
        verbGerund = `${verbGerund} ${sustantive}`;
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
    let verb = getUniqueElement({ happenings, type: 'verbInfinitive' });
    return te(verb);
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
    let doLevel = withProbability(0.1);
    doPluralize = doPluralize !== undefined ? doPluralize : withProbability(0.15);
    let isDizo = withProbability(0.06);
    if (isDizo) {
        adjectiveGender = gender || getRandomGender();
        let verb = getUniqueElement({ happenings, type: 'verbInfinitive' });
        adjective = diz({ verb, gender: adjectiveGender, doPluralize });
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
    let buildAdverb = withProbability(0.5);
    let mente = withProbability(0.5);
    if (buildAdverb) {
        let { sustantive, sustantiveGender } = generateSustantive({ happenings });
        // TODO: gendered adverb particles
        let adverbParticle = getUniqueElement({ happenings, type: 'adverbParticle' });
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

module.exports = {
	generateVerbGerund,
	generateSustantivizedAdjective,
	generateSustantive,
    generateArticle,
    generateAdjective,
    generateAdverb,
    generateVerbTe,
};
