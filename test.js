let {
    endsWithEnding,
    startsWithBeginning,
    makeInfinitiveVerbGerund,
    diminutive,
    pluralize,
} = require('./utils');

const assert = ({name, val, expected}) => {
    let actual;
    try {
        actual = val();
    } catch(err) {
        console.error(err);
    }
    if (actual !== expected) {
        console.error(`Error in test \'${name}\'`);
        console.error(`Expected value ${expected}, got value ${actual}`);
    }
}

// pluralize //
assert({ // TODO:
    name: 'pluralize punk',
    val: () => pluralize('punk'),
    expected: 'punks',
});

// diminutive //

assert({
    name: 'make futil diminute',
    val: () => diminutive({word: 'futil', gender: 'm'}),
    expected: 'futilito',
});
assert({
    name: 'make substancia diminute',
    val: () => diminutive({word: 'substancia', gender: 'f'}),
    expected: 'substanciita',
});

// makeInfinitiveVerbGerund //

assert({
    name: 'make comer gerund',
    val: () => makeInfinitiveVerbGerund('comer'),
    expected: 'comiendo',
});
assert({
    name: 'make untar gerund',
    val: () => makeInfinitiveVerbGerund('untar'),
    expected: 'untando',
});
assert({
    name: 'make hundir gerund',
    val: () => makeInfinitiveVerbGerund('hundir'),
    expected: 'hundiendo',
});
assert({
    name: 'make mentir gerund',
    val: () => makeInfinitiveVerbGerund('mentir'),
    expected: 'mintiendo',
});
assert({
    name: 'make rendir gerund',
    val: () => makeInfinitiveVerbGerund('rendir'),
    expected: 'rindiendo',
});
assert({
    name: 'make pedir gerund',
    val: () => makeInfinitiveVerbGerund('pedir'),
    expected: 'pidiendo',
});
assert({
    name: 'make venir gerund',
    val: () => makeInfinitiveVerbGerund('venir'),
    expected: 'viniendo',
});
assert({
    name: 'make ballear gerund',
    val: () => makeInfinitiveVerbGerund('ballear'),
    expected: 'ballin\'',
});

// endsWithEnding //

assert({
    name: 'doesnt end with single char',
    val: () => endsWithEnding({word: 'perro', ending: 'a'}),
    expected: false,
});
assert({
    name: 'doesnt end with with multiple chars',
    val: () => endsWithEnding({word: 'perro', ending: 'ra'}),
    expected: false,
});
assert({
    name: 'ends with single char',
    val: () => endsWithEnding({word: 'perro', ending: 'o'}),
    expected: true,
});
assert({
    name: 'ends with multiple chars',
    val: () => endsWithEnding({word: 'perro', ending: 'ro'}),
    expected: true,
});
assert({
    name: 'doesnt explode when ending longer than word',
    val: () => endsWithEnding({word: 'ro', ending: 'perro'}),
    expected: false,
});
assert({
    name: 'doesnt explode when word is empty',
    val: () => endsWithEnding({word: null, ending: 'a'}),
    expected: false,
});
assert({
    name: 'doesnt explode when ending is empty',
    val: () => endsWithEnding({word: 'a', ending: null}),
    expected: false,
});

// startsWithBeginning //

assert({
    name: 'doesnt begin with single char',
    val: () => startsWithBeginning({word: 'perro', beginning: 'g'}),
    expected: false,
});
assert({
    name: 'doesnt begin with with multiple chars',
    val: () => startsWithBeginning({word: 'perro', beginning: 'po'}),
    expected: false,
});
assert({
    name: 'begins with single char',
    val: () => startsWithBeginning({word: 'perro', beginning: 'p'}),
    expected: true,
});
assert({
    name: 'begins with multiple chars',
    val: () => startsWithBeginning({word: 'perro', beginning: 'pe'}),
    expected: true,
});
assert({
    name: 'doesnt explode when beginning longer than word',
    val: () => startsWithBeginning({word: 'pe', beginning: 'perro'}),
    expected: false,
});
assert({
    name: 'doesnt explode when word is empty',
    val: () => startsWithBeginning({word: null, beginning: 'a'}),
    expected: false,
});
assert({
    name: 'doesnt explode when beginning is empty',
    val: () => startsWithBeginning({word: 'a', beginning: null}),
    expected: false,
});