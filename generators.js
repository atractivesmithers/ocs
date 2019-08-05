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
} = require('./utils');

const generateVerbGerund = ({happenings}) => {
    let verbGerund = getUniqueElement({ happenings, type: 'verbGerund' });
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

const generateSustantive = ({happenings, gender, doPluralize}) => {
    let sustantive;
    let sustantiveGender;
    if (!gender) {
        sustantive = getUniqueElement({ happenings, type: 'sustantive' });
        sustantiveGender = getGender(sustantive);
    } else {
        while (sustantiveGender !== gender) { // TODO: optimize with new method that gets sustantive of whatever gender
            sustantive = getUniqueElement({ happenings, type: 'sustantive' });
            sustantiveGender = getGender(sustantive);
        }
    }
    sustantive = getGenderedElement({ gender: sustantiveGender, element: sustantive });
    let doDiminutive = withProbability(0.05);
    // let doDiminutive = withProbability(1);
    if (doDiminutive) {
        sustantive = diminutive({word: sustantive, gender: sustantiveGender});
    }
    doPluralize = doPluralize !== undefined ? doPluralize : withProbability(0.1);
    if (doPluralize) {
        sustantive = pluralize(sustantive);
    } else if (sustantiveGender === 'm') {
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
    // TODO: generate -eo sustantives (sustantive+eo)
}

const generateArticle = ({ gender, doPluralize, concrete }) => {
    let options;
    if (concrete) {
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
    if (!gender) {
        adjective = getUniqueElement({ happenings, type: 'adjective' });
        adjectiveGender = getGender(adjective);
    } else {
        while (adjectiveGender !== gender) { // TODO: optimize with new method that gets sustantive of whatever gender
            adjective = getUniqueElement({ happenings, type: 'adjective' });
            adjectiveGender = getGender(adjective);
        }
    }
    adjective = getGenderedElement({ gender: adjectiveGender, element: adjective });
    let doDiminutive = withProbability(0.05);
    if (doDiminutive) {
        adjective = diminutive({word: adjective, gender: adjectiveGender});
    }
    doPluralize = doPluralize !== undefined ? doPluralize : withProbability(0.1);
    if (doPluralize) {
        adjective = pluralize(adjective);
    }
    return {
        adjective,
        adjectiveGender,
        isPlural: doPluralize,
    };
}

const generateAdverb = ({happenings}) => {
    // 'a lo' + sustantive
    // 'como ' + article + sustantive
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
        while (adjectiveGender !== 'f') { // TODO: optimize with new method that gets sustantive of whatever gender
            adjective = getUniqueElement({ happenings, type: 'adjective' });
            adjectiveGender = getGender(adjective);
        }
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
};
