const { getInput } = require("./readInput");

const mergeFormPolymer = polymer => {
    if (polymer.length === 1) {
        return polymer;
    }

    let middle = Math.floor(polymer.length / 2);
    let left = polymer.slice(0, middle);
    let right = polymer.slice(middle);

    return mergeFormPolymer(
        formPolymer(left),
        formPolymer(right)
    )
}

function mergePoly(left, right) {
    let poly = [];
    if (left.length > 0 && right.length > 0) {
        if (left[left.length - 1].toUpperCase() === right[0].toUpperCase() && left[left.length - 1] !== right[0]) {
            left = left.slice(0, left.length - 1);
            right = right.slice(1);
        }
    }

    return poly.concat(left).concat(right);
}

function formPolymerWhile1(polymer) {
    let left = [];
    left.push(polymer[0]);
    polymer = polymer.slice(1);
    while (polymer.length > 0) {
        if (left.length < 1) {
            left.push(polymer[0]);
            polymer = polymer.slice(1);
        } else if (left[left.length - 1].toUpperCase() === polymer[0].toUpperCase() && left[left.length - 1] !== polymer[0]) {
            left = left.slice(0, left.length - 1);
            polymer = polymer.slice(1);
        } else {
            left.push(polymer[0]);
            polymer = polymer.slice(1);
        }
    }
    return polymer;
}

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
