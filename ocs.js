let {
    pluralize,
    getRandomItem,
    getUniqueElement,
    withProbability,
    getRandomGender,
    capitalizeFirstLetter,
    mangleWord,
} = require('./utils');
let words = require('./data');
let {
    generateVerbGerund,
    generateSustantivizedAdjective,
    generateSustantive,
    generateArticle,
    generateAdjective,
    generateAdverb,
} = require('./generators');

let structures = [
    {
        name: 'basico0',
        components: [
            {type:'sustantive', probability: 1},
            {literal: 'de', probability: 1},
            {type:'sustantive', probability: 1, restartGender: true},
        ]
    },
    {
        name: 'basico1',
        components: [
            {type:'sustantive', probability: 1},
            {type:'adjective', probability: 1},
        ]
    },
    {
        name: 'basico2',
        components: [
            {type:'verbInfinitive', probability: 1},
            {type:'sustantive', probability: 1},
        ]
    },
    {
        name: 'basico3',
        components: [
            {type:'sustantive', probability: 1},
            {type:'verbGerund', probability: 1},
        ]
    },
    {
        name: 'conmis4', 
        components: [
            {type:'verbGerund', probability: 1},
            {literal: 'con mis', probability: 1},
            {type:'sustantivizedAdjective', probability: 1},
        ]
        
    },
    {
        name: 'basico5',
        components: [
            {type:'article', probability: 1},
            {type:'adjective', probability: 1}, // TODO: gender issues
            {type:'sustantive', probability: 1},
        ]
    },
    {
        name: 'VS6',
        components: [
            {name:'basico0', probability: 1},
            {literal: 'VS', probability: 1},
            {name:'basico1', probability: 1},
        ]
    },
    {
        name: 'VS7',
        components: [
            {random: true, options:[0,1,2,3,8], probability: 1},
            {literal: 'VS', probability: 1},
            {random: true, options:[0,1,2,3,8], probability: 1},
        ]
    },
    {
        name: 'lugar8',
        components: [
            {random: true, options:[0,1,2,3], probability: 1},
            {literal: 'en', probability: 1},
            {type:'place', probability: 1},
        ]
    },
    {
        name: 'test9',
        components: [
            {type:'sustantive', probability: 1},
        ]
    },
    {
        name: 'basico10',
        components: [
            {type:'article', probability: 1, caseData: {gender: 'f', isPlural: false}},
            {type:'adjective', probability: 0.2},
            {name:'basico0', probability: 1},
        ]
    },
    {
        name: 'novia11', // TODO: no concuerda??
        components: [
            {literal:'que a tu novia la conozcan en el barrio como', probability: 1},
            {name:'basico10', probability: 1},
        ]
    }
];

let happenings = [];

let generateOc = ({structure, gender, doPluralize}) => {
    const { components } = structure;
    let oc = '';
    gender = gender ? gender : getRandomGender();
    happenings = [];
    let isFirstComponent = true;
    for ({ type, probability, literal, name, random, options, caseData, restartGender } of components) {
        let element;
        if (withProbability(probability)) {
            if (random) {
                let option = getRandomItem(options);
                let randomOc = generateOc({structure: structures[option], gender, doPluralize});
                if (isFirstComponent) {
                    oc = randomOc;
                } else {
                    oc += ` ${randomOc}`;
                }  
            } else if (name) {
                let foundStructure = structures.find(s => s.name === name);
                if (foundStructure) {
                    let generatedOc = generateOc({structure: foundStructure, gender, doPluralize});
                    if (isFirstComponent) {
                        oc = generatedOc;
                    } else {
                        oc += ` ${generatedOc}`;
                    } 
                } else {
                    console.error(`No structure with name ${name} has been defined`);
                }
            } else if (literal) {
                if (isFirstComponent) {
                    oc = literal;
                } else {
                    oc += ` ${literal}`;
                } 
            } else {
                if (type === 'adverb') {
                    element = generateAdverb({ happenings });
                } else if (type === 'article') {
                    if (caseData) {
                        gender = caseData.gender;
                        doPluralize = caseData.isPlural;
                    }
                    let {
                        article,
                        articleGender,
                        isPlural,
                    } = generateArticle({ gender, doPluralize, concrete: true });
                    element = article;
                    gender = articleGender;
                    doPluralize = isPlural;
                } else if (type === 'verbGerund') {
                    element = generateVerbGerund({happenings});
                } else if (type === 'sustantivizedAdjective') {
                    element = generateSustantivizedAdjective({happenings});
                } else if (type === 'sustantive') {
                    if (restartGender) {
                        gender = getRandomGender();
                    }
                    let {
                        sustantive,
                        sustantiveGender,
                        isPlural,
                    } = generateSustantive({happenings, gender, doPluralize});
                    element = sustantive;
                    gender = sustantiveGender;
                    doPluralize = isPlural;
                } else if (type === 'adjective') {
                    let {
                        adjective,
                        adjectiveGender,
                        isPlural,
                    } = generateAdjective({happenings, gender, doPluralize});
                    element = adjective;
                    gender = adjectiveGender;
                    doPluralize = isPlural;
                } else { 
                    element = getUniqueElement({ happenings, type });
                }

                if (isFirstComponent) {
                    oc = element;
                } else {
                    oc += ` ${element}`;
                } 
            }
            isFirstComponent = false;
        }
    }
    return oc;
}

let iterations = 100;

let allowedStructures = [
    0,1,2,3,4,5,6,7,8,11,
];

for (let i = 0; i < iterations; i++) {
    let randomType = getRandomItem(allowedStructures);
    let generatedOc = generateOc({structure: structures[randomType]});
    if (withProbability(0.01)) {
        generatedOc = mangleWord({ word: generatedOc, intensity: 5 });
    }
    let result = `${randomType} ${capitalizeFirstLetter(generatedOc)}`;
    console.log(result);
}

