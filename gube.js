let {
    generateGube,
} = require('./generators');

let iterations = 100;

for (let i = 0; i < iterations; i++) {
    console.log(generateGube());
}