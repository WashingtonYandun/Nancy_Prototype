// Función de activación sigmoidal
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

// Derivada de la función de activación sigmoidal
function sigmoidDerivative(x) {
    return x * (1 - x);
}

// Clase de la red neuronal
class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize) {
        // Inicialización de pesos y sesgos de forma aleatoria
        this.weightsInputHidden = new Array(inputSize)
            .fill(0)
            .map(() => new Array(hiddenSize).fill(0).map(() => Math.random()));
        this.weightsHiddenOutput = new Array(hiddenSize)
            .fill(0)
            .map(() => new Array(outputSize).fill(0).map(() => Math.random()));

        this.biasHidden = new Array(hiddenSize).fill(1);
        this.biasOutput = new Array(outputSize).fill(1);
    }

    // Función de feedforward
    predict(input) {
        // Capa oculta
        const hiddenLayerInput = input.map(
            (x, i) => x * this.weightsInputHidden[i]
        );
        const hiddenLayerOutput = hiddenLayerInput.map((x, i) =>
            sigmoid(x + this.biasHidden[i])
        );

        // Capa de salida
        const outputLayerInput = hiddenLayerOutput.map(
            (x, i) => x * this.weightsHiddenOutput[i]
        );
        const output = outputLayerInput.map((x, i) =>
            sigmoid(x + this.biasOutput[i])
        );

        return output;
    }

    // Función de retropropagación
    train(input, target, learningRate) {
        // Feedforward
        const hiddenLayerInput = input.map(
            (x, i) => x * this.weightsInputHidden[i]
        );
        const hiddenLayerOutput = hiddenLayerInput.map((x, i) =>
            sigmoid(x + this.biasHidden[i])
        );

        const outputLayerInput = hiddenLayerOutput.map(
            (x, i) => x * this.weightsHiddenOutput[i]
        );
        const output = outputLayerInput.map((x, i) =>
            sigmoid(x + this.biasOutput[i])
        );

        // Calcular errores
        const outputErrors = target.map((t, i) => t - output[i]);
        const hiddenErrors = hiddenLayerOutput.map((h, i) =>
            outputErrors.reduce(
                (acc, error, j) => acc + error * this.weightsHiddenOutput[i][j],
                0
            )
        );

        // Calcular gradientes
        const outputGradients = output.map(
            (o, i) => outputErrors[i] * sigmoidDerivative(o)
        );
        const hiddenGradients = hiddenLayerOutput.map(
            (h, i) => hiddenErrors[i] * sigmoidDerivative(h)
        );

        // Actualizar pesos y sesgos
        this.weightsHiddenOutput = this.weightsHiddenOutput.map((w, i) =>
            w.map(
                (ww, j) =>
                    ww +
                    hiddenLayerOutput[i] * outputGradients[j] * learningRate
            )
        );
        this.weightsInputHidden = this.weightsInputHidden.map((w, i) =>
            w.map((ww, j) => ww + input[i] * hiddenGradients[j] * learningRate)
        );

        this.biasOutput = this.biasOutput.map(
            (b, i) => b + outputGradients[i] * learningRate
        );
        this.biasHidden = this.biasHidden.map(
            (b, i) => b + hiddenGradients[i] * learningRate
        );
    }
}

// Ejemplo de uso
const inputSize = 2;
const hiddenSize = 3;
const outputSize = 1;

const learningRate = 0.1;

const nn = new NeuralNetwork(inputSize, hiddenSize, outputSize);

const trainingData = [
    { input: [0, 0], target: [0] },
    { input: [0, 1], target: [1] },
    { input: [1, 0], target: [1] },
    { input: [1, 1], target: [0] },
];

for (let epoch = 0; epoch < 10000; epoch++) {
    trainingData.forEach((data) => {
        nn.train(data.input, data.target, learningRate);
    });
}

// Prueba de la red entrenada
console.log(nn.predict([0, 0])); // Resultado esperado: cercano a 0
console.log(nn.predict([0, 1])); // Resultado esperado: cercano a 1
console.log(nn.predict([1, 0])); // Resultado esperado: cercano a 1
console.log(nn.predict([1, 1])); // Resultado esperado: cercano a 0
