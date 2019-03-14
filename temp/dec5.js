const { getInput } = require("./readInput");

function shouldReact(left, polymer) {
    const leftChar = left[left.length - 1];
    const rightChar = polymer[0];
    return leftChar.toUpperCase() === rightChar.toUpperCase() && leftChar !== rightChar;
}

function arraysEmpty(left, polymer) {
    return polymer.length === 0 || left.length === 0;
}

function formPolymer(polymer) {
    let left = [];
    left.push(polymer[0]);
    polymer = polymer.slice(1);
    while (polymer.length > 0) {
        if (!arraysEmpty(left, polymer) && shouldReact(left, polymer)) {
            left = left.slice(0, left.length - 1);
            polymer = polymer.slice(1);
        } else {
            left.push(polymer[0]);
            polymer = polymer.slice(1);
        }
    }
    return left;
}

function dec5(input) {
    let polymer = input[0].split('');
    console.info(polymer.length);
    const formed = formPolymer(polymer);
    console.info(formed.join('').length);
}

getInput("./dec5.txt", dec5);
