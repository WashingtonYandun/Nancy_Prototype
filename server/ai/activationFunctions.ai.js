export function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivative(x) {
    return sigmoid(x) * (1 - sigmoid(x));
}
