let {
    endsWithEnding,
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
