let words = require('./data');

const isVocal = char => {
    return ['a','á','e','é','i','í','o','ó','u','ú'].indexOf(char) > -1;
}
const endsWithVocal = word => isVocal(lastChar(word));
const hasTilde = char => {
    return ['á','é','í','ó','ú'].indexOf(char) > -1;
}
const endsWithEnding = ({word, ending}) => {
    if (typeof word !== 'string') return false;
    if (typeof ending !== 'string') return false;
    if (word.length < ending.length) return false;
    for (let i = 1; i <= ending.length; i++) {
        const wordChar = nthLastChar({word, n:i});
        const endingChar = nthLastChar({word: ending, n:i});
        if (wordChar !== endingChar) return false;
    }
    return true;
}
const startsWithBeginning = ({word, beginning}) => {
    if (typeof word !== 'string') return false;
    if (typeof beginning !== 'string') return false;
    if (word.length < beginning.length) return false;
    for (let i = 0; i < beginning.length; i++) {
        const wordChar = word[i];
        const beginningChar = beginning[i];
        if (wordChar !== beginningChar) return false;
    }
    return true;
}
const removeFirstChar = word => {
    return word.substr(1);
}
const removeFirstTwoChars = word => {
    return word.substr(2);
}
const removeLastNChars = ({word, n}) => {
	return word.slice(0, -n);
}
const removeLastChar = word => {
    return removeLastNChars({word, n:1});
}
const nthLastChar = ({ word, n }) => {
    return word[word.length-n];
}
const lastChar = word => {
    return nthLastChar({ word, n: 1 });
}
const secondLastChar = word => {
    return nthLastChar({ word, n: 2 });
}
const toNoTilde = char => {
    let conversions = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
    }
    return conversions[char] || char;
}
const removeTilde = word => {
    return word.split('').map(c => toNoTilde(c)).join('');
}

const pluralize = sustantive => {
    if (endsWith({ word: sustantive, char:'k' }) ||
        endsWith({ word: sustantive, char:'y' })) {
        return `${sustantive}s`;
    }
	if (lastChar(sustantive) === 'z') return `${removeLastChar(sustantive)}ces`;
    if (hasTilde(secondLastChar(sustantive))) {
        sustantive = removeTilde(sustantive);
    }
    return `${sustantive}${endsWithVocal(sustantive) ? 's' : 'es'}`;
}

const nthLastCharIs = ({word, char, n}) => nthLastChar({word, n}) === char;
const endsWith = ({word, char}) => nthLastCharIs({word, char, n: 1});

const isProperName = word => word[0].toUpperCase() === word[0];

const diminutive = ({ word, gender }) => {
    let ending = gender === 'm' ? 'ito' : 'ita';
	if (isProperName(word) || endsWithEnding({word, ending: 'ito'})) {
		return `${word}`;
	}
    word = removeTilde(word);
    if (endsWithEnding({word, ending: 'io'})) {
        word = removeLastNChars({word, n: 2});
        return `${word}${ending}`;
    }
    if (endsWithEnding({word, ending: 'ia'})) {
        word = removeLastChar(word);
        return `${word}${ending}`;
    }
    if (endsWith({ word, char:'l' }) || endsWith({ word, char:'x' })) {
        return `${word}${ending}`;
    }
    if (endsWith({ word, char:'n' }) || endsWith({ word, char:'r' })) {
        return `${word}c${ending}`;
    }
    if (nthLastCharIs({ word, char:'i', n: 2 }) || nthLastCharIs({ word, char:'z', n: 2 })) {
        word = removeLastNChars({word, n: 2});
        return `${word}c${ending}`;
    }
    if (nthLastCharIs({ word, char:'c', n: 2 })) {
        word = removeLastNChars({word, n: 2});
        return `${word}qu${ending}`;
    }
    return `${endsWithVocal(word) ? removeLastChar(word) : word}${ending}`;
}

const makeOcPretty = word => {
    if(word[0] === '¿') {
        word = word.replace('¿ ', '¿');
        word = word.replace(' ?', '?');
        return `${word[0]}${word[1].toUpperCase()}${removeFirstTwoChars(word)}`;
    }
    return `${word[0].toUpperCase()}${removeFirstChar(word)}`;
}

const eo = word => {
    let ending = 'eo';
    if (isProperName(word)) {
        return `${word}`;
    }
    if (nthLastCharIs({ word, char:'c', n: 2 })) {
        word = removeLastNChars({word, n: 2});
        return `${word}qu${ending}`;
    }
    word = removeTilde(word);
    return `${endsWithVocal(word) ? removeLastChar(word) : word}${ending}`;
}

const getRandomItem = arr => {
    let randomIndex = Math.floor(Math.random()*arr.length);
    return arr[randomIndex];
}

const getUniqueElement = ({ happenings, type }) => {
    let element = getRandomItem(words[type]);
    while (happenings.indexOf(element) > -1) {
        happenings.push(element);
        element = getRandomItem(words[type]);
    }
	happenings.push(element);
    return element;
}

const withProbability = probability => {
    return Math.random() < probability;
}

const genders = ['m', 'f'];
const getGender = (element) => {
    let gender = element.match(/\(([^)]+)\)/);
    if (gender && (gender[1] === 'm' || gender[1] === 'f')) return gender[1];
    return getRandomGender();
}
const getRandomGender = () => {
    return getRandomItem(genders);
}

const getGenderedElement = ({ gender, element }) => {
    let endings = element.match(/\(([^)]+)\)/);
    let word = element.split('(')[0];
    let ending = '';
    if (endings) {
        if (endings[1] === 'f' || endings[1] === 'm') return word;
        if (gender === 'm') {
            ending = endings[1].split('|')[0];
        } else if (gender === 'f') {
            ending = endings[1].split('|')[1];
        }
    }
    return `${word}${ending}`;
}

const getElementWithGender = ({ happenings, gender, type }) => {
    let elementGender;
    let element;
    while (elementGender !== gender) {
        element = getUniqueElement({ happenings, type: type });
        elementGender = getGender(element);
    }
    return element;
}

const getRandomNumber = () => {
    return getRandomItem(['dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']);
}

const replaceAt = ({word, i, replacement}) => {
    return word.substr(0, i) + replacement + word.substr(i + replacement.length);
}

const makeInfinitiveVerbGerund = verb => {
    const irregulars = {
        wildear: 'wildin\'',
        booliar: 'boolin\'',
        ballear: 'ballin\'',
        ir: 'yendo',
    };
    if (irregulars[verb]) return irregulars[verb];
    if (endsWithEnding({word: verb, ending: 'er'})) {
        verb = removeLastNChars({word: verb, n: 2});
        return `${verb}iendo`;
    }
    if (endsWithEnding({word: verb, ending: 'ar'})) {
        verb = removeLastChar(verb);
        return `${verb}ndo`;
    }
    if (endsWithEnding({word: verb, ending: 'ir'})) {
        verb = removeLastChar(verb);
        if (verb[1] === 'e' && verb[0] !== 'd') {
            verb = replaceAt({word: verb, i: 1, replacement: 'i'});
        }
        return `${verb}endo`;
    }
    verb = removeLastNChars({word: verb, n: 2});
    return `${verb}ando`;
}

const isWhitespace = char => ' \t\n\r\v'.indexOf(char) > -1;

const mangleWord = ({ word, intensity }) => {
    const characters       = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    const wordLength       = word.length;
    for (let i = 0; i < intensity; i++) {
        let randomCharacter = ' ';
        while (isWhitespace(randomCharacter)) {
            let randomCharacterIndex = Math.floor(Math.random() * charactersLength);
            randomCharacter = characters[randomCharacterIndex];
        }
        let randomIndex = Math.floor(Math.random() * wordLength);
        word = replaceAt({ word, i: randomIndex, replacement: randomCharacter });
    }
    return word;
}

const diz = ({verb, gender, doPluralize}) => {
    let ending = `diz${gender === 'm' ? 'o' : 'a'}${doPluralize ? 's' : ''}`;
    return `${removeLastChar(verb)}${ending}`;
}

const getRandomLevel = () => {
    return getUniqueElement({ happenings: [], type: 'level' });
}

const addRandomLevel = adjective => {
    return `${getRandomLevel()} ${adjective}`;
}

const te = verb => {
    return `${verb}te`;
}

const writeToFile = ({ name, content }) => {
    const fs = require('fs');
    // write to a new file named 2pac.txt
    fs.writeFile(`${name}.txt`, content, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log(`${name}.txt saved!`);
    });
}

const isTransitive = characteristics => {
    return hasCharacteristic({characteristics, characteristic: 'trans'});
}

const hasCharacteristic = ({characteristics, characteristic}) => {
    return characteristics.indexOf(characteristic) > -1;
}

module.exports = {
	isVocal,
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
    makeOcPretty,
    endsWithEnding,
    getElementWithGender,
    makeInfinitiveVerbGerund,
    startsWithBeginning,
    mangleWord,
    diz,
    getRandomLevel,
    addRandomLevel,
    te,
    writeToFile,
    isTransitive,
    hasCharacteristic,
};