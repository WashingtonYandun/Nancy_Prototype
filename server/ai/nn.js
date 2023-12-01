import { NeuralNetwork } from "./neuralNetwork.ai.js";

const initAi = async () => {
    // Example usage
    const nn = new NeuralNetwork(2, 2, 1);

    // TODO: Change training data to match expressions
    // TODO: Increase dataset
    const trainingData = [
        {
            inputs: [0.001, 0.0005, 0.0003, 0.8, 0.0002, 0.097],
            targets: [1],
        },
        {
            inputs: [0.001, 0.0002, 0.0001, 0.9, 0.0003, 0.004],
            targets: [1],
        },
        {
            inputs: [0.01, 0.001, 0.001, 0.6, 0.001, 0.287],
            targets: [1],
        },
        {
            inputs: [0.8, 0.1, 0.05, 0.001, 0.05, 0.001],
            targets: [0.5],
        },
        {
            inputs: [0.6, 0.2, 0.15, 0.001, 0.049, 0.001],
            targets: [0],
        },
        {
            inputs: [0.25, 0.2, 0.15, 0.15, 0.1, 0.05],
            targets: [0],
        },
    ];

    // Train the neural network
    for (let i = 0; i < 100000; i++) {
        for (const data of trainingData) {
            nn.train(data.inputs, data.targets);
        }
    }

    return nn;
};

export const nn = await initAi();

console.log(
    nn.feedforward([
        0.000028363088858895935,
        1.2925467363089638e-9,
        4.999028968555308e-12,
        4.7093841715195595e-8,
        1.3316699210008665e-7,
        0.000008941296982811764
    ])
);
