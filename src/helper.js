function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomBoolean() {
    return Math.random() >= 0.5;
}
export {
    getRandomArbitrary, generateRandomBoolean
};

