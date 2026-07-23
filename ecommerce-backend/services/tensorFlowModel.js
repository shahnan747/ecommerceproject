const tf = require("@tensorflow/tfjs-node");

const createModel = () => {

    const model = tf.sequential();

    model.add(
        tf.layers.dense({
            inputShape: [3],
            units: 8,
            activation: "relu"
        })
    );

    model.add(
        tf.layers.dense({
            units: 4,
            activation: "relu"
        })
    );

    model.add(
        tf.layers.dense({
            units: 1,
            activation: "sigmoid"
        })
    );

    model.compile({
        optimizer: "adam",
        loss: "binaryCrossentropy",
        metrics: ["accuracy"]
    });

    return model;
};

module.exports = createModel;