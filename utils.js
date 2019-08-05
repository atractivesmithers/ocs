let words = require('./data');

const isVocal = char => {
    return ['a','e','i','o','u'].indexOf(char) > -1;
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
const removeFirstChar = word => {
    return word.substr(1);
}
const removeLastChar = word => {
	return word.slice(0, -1);
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
	if (isProperName(word)) {
		return `${word}`;
	}
    word = removeTilde(word);
    if (endsWith({ word, char:'x' })) {
        return `${word}${ending}`;
    }
    if (endsWith({ word, char:'n' }) || endsWith({ word, char:'r' })) {
        return `${word}c${ending}`;
    }
    if (nthLastCharIs({ word, char:'i', n: 2 }) || nthLastCharIs({ word, char:'z', n: 2 })) {
        word = removeLastChar(word);
        word = removeLastChar(word);
        return `${word}c${ending}`;
    }
    if (nthLastCharIs({ word, char:'c', n: 2 })) {
        word = removeLastChar(word);
        word = removeLastChar(word);
        return `${word}qu${ending}`;
    }
    return `${endsWithVocal(word) ? removeLastChar(word) : word}${ending}`;
}

const capitalizeFirstLetter = word => {
    return `${word[0].toUpperCase()}${removeFirstChar(word)}`;
}

const eo = word => {
    let ending = 'eo';
    if (isProperName(word)) {
        return `${word}`;
    }
    if (nthLastCharIs({ word, char:'c', n: 2 })) {
        word = removeLastChar(word);
        word = removeLastChar(word);
        return `${word}qu${ending}`;
    }
    word = removeTilde(word);
    return `${endsWithVocal(word) ? removeLastChar(word) : word}${ending}`;
}

let getRandomItem = arr => {
    let randomIndex = Math.floor(Math.random()*arr.length);
    return arr[randomIndex];
}

let getUniqueElement = ({ happenings, type }) => {
    let element = getRandomItem(words[type]);
    while (happenings.indexOf(element) > -1) {
        happenings.push(element);
        element = getRandomItem(words[type]);
    }
	happenings.push(element);
    return element;
}

let withProbability = probability => {
    return Math.random() < probability;
}

let genders = ['m', 'f'];
let getGender = (element) => {
    let gender = element.match(/\(([^)]+)\)/);
    if (gender && (gender[1] === 'm' || gender[1] === 'f')) return gender[1];
    return getRandomGender();
}
let getRandomGender = () => {
    return getRandomItem(genders);
}

let getGenderedElement = ({ gender, element }) => {
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

const getRandomNumber = () => {
    return getRandomItem(['dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']);
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
    capitalizeFirstLetter,
    endsWithEnding,
};