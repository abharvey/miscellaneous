const monsterTypes = (hasWings, num) => {
    if (hasWings) {
        if (num < 3) {
            return `A Wyvren`;
        }
        return `A Dragon with ${num} arms`;
    }

    switch (num) {
        case num < 0:
            return 'Genie';
        case num > 4:
            return 'A Bug';
        case num === 4:
            return 'A man crawling on all fours';
        case num === 2:
            return 'An Ostrich';
        case num < 2:
            return 'A Banshee';
        default:
            return 'cripple';
    }
}

const monsterName = (name) => {
    return `named ${name}`;
}

const monsterPower = (power) => {
    return `that breathes ${power}`
}

const monsterSizer = (size) => {
    return `is very ${size}`
}

const MonsterGenerator = (hasWings) => (num) => (name) => (power) => (size) => {
    return (
        `${monsterTypes(hasWings, num)} who's
        ${monsterName(name)}
        ${monsterPower(power)} and
        ${monsterSizer(size)}
        so you should watch out`
    );
}

const WyvernGenerator = (name) => MonsterGenerator(true)(2)(name);
const DragonGenerator = MonsterGenerator(true)(4)

const FlyingMonster = MonsterGenerator(true);
const NonFlyingMonster = MonsterGenerator(false);

const WyvernTodds = WyvernGenerator('Todd')

const FireTodds = (hasWings) => (num) => (size) => {
    return MonsterGenerator(hasWings)(num)('Todd')('Fire')(size);
}

const LargeFireDragons = (name) => {
    return MonsterGenerator(true)(17)(name)('Fire')('Grande')
}

const BlueGenieGenerator = (color) => (name) => {
    return `
        A ${color} ${MonsterGenerator(false)(-1)(name)('Magic')('Old')}
    `
}

const keith = (hasWings) => (num) => (power) => (size) => {
    return `${MonsterGenerator(hasWings)(num)('Keith')(power)(size)}`;
}

console.table(keith(false)(2)('garlic')('sad'));
console.table(BlueGenieGenerator('blue')('Todd'));















