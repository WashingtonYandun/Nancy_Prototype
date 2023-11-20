import { NeuralNetwork } from "./neuralNetwork.ai.js";

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
