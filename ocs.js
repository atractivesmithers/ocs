let {
    pluralize,
    getRandomItem,
    getUniqueElement,
    withProbability,
    getRandomGender,
    capitalizeFirstLetter,
    writeToFile,
} = require('./utils');
let words = require('./data');
let {
    generateVerbGerund,
    generateSustantivizedAdjective,
    generateSustantive,
    generateArticle,
    generateAdjective,
    generateAdverb,
    generateVerbTe,
    generateGube,
} = require('./generators');

let structures = [
    {
        name: 'basico0',
        components: [
            {type:'sustantive', probability: 1},
            {literal: 'de', probability: 1},
            {
                type:'sustantive',
                probability: 1, 
                restartGender: true,
                caseData: {
                    isPlural: false,
                }
            },
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
            {
                type:'article',
                probability: 1,
                caseData: {
                    concrete: true,
                }
            },
            {type:'adjective', probability: 0.2},
            {name:'basico0', probability: 1},
        ]
    },
    {
        name: 'novia11', // TODO: no concuerda??
        components: [
            {literal:'que a tu novia la conozcan en el barrio como', probability: 1},
            {
                name:'basico10',
                probability: 1,
                caseData: {
                    gender: 'f',
                    isPlural: false,
                    concrete: true,
                }
            },
        ]
    },
    {
        name: 'te12',
        components: [
            {type:'verbTe', probability: 1},
            {
                type:'article',
                probability: 1,
                caseData: {
                    concrete: false,
                }
            },
            {random: true, options:[0,1,3], probability: 1},
        ]
    },
    {
        name: 'declaran13',
        components: [
            {literal:'declaran', probability: 1},
            {type:'adjective', probability: 1},
            {
                type:'article',
                probability: 1,
                caseData: {
                    a: true,
                }
            },
            {random: true, options:[0,1], probability: 1},
            // todo: use names instead of indices in options
            {literal:'reading this', probability: 0.4},
        ]
    },
    {
        name: 'declaran14',
        components: [
            {literal:'declaran', probability: 1},
            {
                type:'adjective',
                probability: 1,
                caseData: {
                    a: true,
                    gender: 'f',
                    isPlural: false,
                }
            },
            {literal:'a la girl reading this', probability: 1},
        ]
    },
    {
        name: 'jugamos15', // TODO: spaces, capitalizing
        components: [
            {literal:'¿', probability: 1},
            {literal:'jugamos', probability: 1},
            {
                type:'article',
                probability: 1,
                caseData: {
                    a: true,
                }
            },
            {random: true, options:[0,1], probability: 1, quoted: true},
            {literal:'?', probability: 1},
        ]
    }
];

let happenings = [];

let expandOc = ({oc, newElement, quoted, isFirstComponent}) => {
    if (isFirstComponent) {
        oc = newElement;
    } else {
        if (quoted) {
            oc += ` \'${newElement}\'`;
        } else {
            oc += ` ${newElement}`;
        }
    } 
    return oc;
};

let generateOc = ({structure, gender, doPluralize, caseData, quoted}) => {
    const { components } = structure;
    let oc = '';
    gender = gender ? gender : getRandomGender();
    happenings = [];
    let isFirstComponent = true;
    for ({
        type,
        probability,
        literal,
        name,
        random,
        options,
        caseData,
        restartGender,
        quoted,
    } of components) {
        let element;
        if (withProbability(probability)) {
            if (restartGender) {
                gender = getRandomGender();
            }
            if (caseData) {
                doPluralize = caseData.isPlural !== undefined ? caseData.isPlural : doPluralize;
                gender = caseData.gender !== undefined ? caseData.gender : gender;
            }
            if (random) {
                let option = getRandomItem(options);
                let randomOc = generateOc({
                    structure: structures[option],
                    gender,
                    doPluralize,
                    quoted,
                });
                oc = expandOc({
                    oc,
                    newElement: randomOc,
                    quoted,
                    isFirstComponent,
                });
            } else if (name) {
                let foundStructure = structures.find(s => s.name === name);
                if (foundStructure) {
                    let generatedOc = generateOc({
                        structure: foundStructure,
                        gender,
                        doPluralize,
                        caseData,
                    });
                    oc = expandOc({
                        oc,
                        newElement: generatedOc,
                        quoted,
                        isFirstComponent,
                        quoted,
                    });
                } else {
                    console.error(`No structure with name ${name} has been defined`);
                }
            } else if (literal) {
                oc = expandOc({
                    oc,
                    newElement: literal,
                    quoted,
                    isFirstComponent,
                });
            } else {
                if (type === 'adverb') {
                    element = generateAdverb({ happenings });
                } else if (type === 'article') {
                    let concrete = caseData && caseData.concrete !== undefined ? caseData.concrete : true;
                    let a = caseData && caseData.a !== undefined ? caseData.a : false;
                    let {
                        article,
                        articleGender,
                        isPlural,
                    } = generateArticle({ gender, doPluralize, concrete, a });
                    element = article;
                    gender = articleGender;
                    doPluralize = isPlural;
                } else if (type === 'verbGerund') {
                    element = generateVerbGerund({happenings});
                } else if (type === 'verbTe') {
                    element = generateVerbTe({happenings});
                } else if (type === 'sustantivizedAdjective') {
                    element = generateSustantivizedAdjective({happenings});
                } else if (type === 'sustantive') {
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

                if (withProbability(0.04) && type !== 'article') {
                    // element = generateGube();
                }

                oc = expandOc({
                    oc,
                    newElement: element,
                    quoted,
                    isFirstComponent,
                });
            }
            isFirstComponent = false;
        }
    }
    return oc;
}

let iterations = 100;

let allowedStructures = [
    0,1,2,3,4,5,6,7,8,11,12,13,14,15,
];

let fileContent = '';
for (let i = 0; i < iterations; i++) {
    let randomType = getRandomItem(allowedStructures);
    let generatedOc = generateOc({structure: structures[randomType]});
    let result = `${randomType} ${capitalizeFirstLetter(generatedOc)}`;
    console.log(result);
    fileContent += `${result}\n`;
}


writeToFile({ name: 'ocs', content: fileContent });