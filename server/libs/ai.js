function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(x) {
    return sigmoid(x) * (1 - sigmoid(x));
}

// Define the NeuralNetwork class
class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize) {
        // Initialize weights and biases for input to hidden layer
        this.weightsInputHidden = new Matrix(hiddenSize, inputSize);
        this.weightsInputHidden.randomize();

        this.biasHidden = new Matrix(hiddenSize, 1);
        this.biasHidden.randomize();

        // Initialize weights and biases for hidden to output layer
        this.weightsHiddenOutput = new Matrix(outputSize, hiddenSize);
        this.weightsHiddenOutput.randomize();

        this.biasOutput = new Matrix(outputSize, 1);
        this.biasOutput.randomize();
    }

    // Feedforward function
    feedforward(inputArray) {
        // Convert input array to a Matrix object
        const inputs = Matrix.fromArray(inputArray);

        // Calculate hidden layer output
        const hidden = Matrix.dot(this.weightsInputHidden, inputs);
        hidden.add(this.biasHidden);
        hidden.map(sigmoid);

        // Calculate output layer output
        const output = Matrix.dot(this.weightsHiddenOutput, hidden);
        output.add(this.biasOutput);
        output.map(sigmoid);

        return output.toArray();
    }

    // Train the neural network using backpropagation
    train(inputArray, targetArray) {
        // Convert input and target arrays to Matrix objects
        const inputs = Matrix.fromArray(inputArray);
        const targets = Matrix.fromArray(targetArray);

        // === Feedforward ===
        // Calculate hidden layer output
        const hidden = Matrix.dot(this.weightsInputHidden, inputs);
        hidden.add(this.biasHidden);
        hidden.map(sigmoid);

        // Calculate output layer output
        const output = Matrix.dot(this.weightsHiddenOutput, hidden);
        output.add(this.biasOutput);
        output.map(sigmoid);

        // === Backpropagation ===
        // Calculate output layer errors
        const outputErrors = Matrix.subtract(targets, output);

        // Calculate output layer gradients
        const outputGradients = Matrix.map(output, sigmoidDerivative);
        outputGradients.multiply(outputErrors);
        outputGradients.multiply(0.1); // Learning rate

        // Calculate hidden layer errors
        const hiddenErrors = Matrix.dot(
            Matrix.transpose(this.weightsHiddenOutput),
            outputErrors
        );

        // Calculate hidden layer gradients
        const hiddenGradients = Matrix.map(hidden, sigmoidDerivative);
        hiddenGradients.multiply(hiddenErrors);
        hiddenGradients.multiply(0.1); // Learning rate

        // Update weights and biases
        this.weightsHiddenOutput.add(
            Matrix.dot(outputGradients, Matrix.transpose(hidden))
        );
        this.biasOutput.add(outputGradients);
        this.weightsInputHidden.add(
            Matrix.dot(hiddenGradients, Matrix.transpose(inputs))
        );
        this.biasHidden.add(hiddenGradients);
    }
}

// Matrix class for matrix operations
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((elm, i, j) => arr[i]);
    }

    toArray() {
        return this.data.flat();
    }

    randomize() {
        this.map(() => Math.random() * 2 - 1);
    }

    static subtract(a, b) {
        return new Matrix(a.rows, a.cols).map(
            (_, i, j) => a.data[i][j] - b.data[i][j]
        );
    }

    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows).map(
            (_, i, j) => matrix.data[j][i]
        );
    }

    static dot(a, b) {
        return new Matrix(a.rows, b.cols).map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        });
    }

    map(func) {
        this.data = this.data.map((row, i) =>
            row.map((val, j) => func(val, i, j))
        );
        return this;
    }

    static map(matrix, func) {
        return new Matrix(matrix.rows, matrix.cols).map((val, i, j) =>
            func(matrix.data[i][j], i, j)
        );
    }

    multiply(n) {
        if (typeof n === "number") {
            this.map((val) => val * n);
        } else {
            this.map((val, i, j) => val * n.data[i][j]);
        }
        return this;
    }

    add(matrix) {
        this.map((val, i, j) => val + matrix.data[i][j]);
        return this;
    }
}

// Example usage
const nn = new NeuralNetwork(2, 2, 1);

// Training data
const trainingData = [
    { inputs: [0, 0, 0], targets: [0] },
    { inputs: [0, 1, 1], targets: [1] },
    { inputs: [1, 1, 0], targets: [1] },
    { inputs: [1, 1, 1], targets: [1] },
    { inputs: [0, 0, 1], targets: [0] },
];

// Train the neural network
for (let i = 0; i < 100000; i++) {
    for (const data of trainingData) {
        nn.train(data.inputs, data.targets);
    }
}

// Test the neural network
console.log(nn.feedforward([1, 0.2, 0.2])); // Expected output: close to 0
console.log(nn.feedforward([0.4, 0, 0.9])); // Expected output: close to 1
console.log(nn.feedforward([1, 1, 0])); // Expected output: close to 1
console.log(nn.feedforward([1, 1, 1])); // Expected output: close to 1
