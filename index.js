var synaptic = require('synaptic');
var data = require('./Drukari_Data');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;



function Perceptron(input, hidden, output) {
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);


    inputLayer.set({
        squash: Neuron.squash.ReLU,
        bias: 1
    })
    hiddenLayer.set({
        squash: Neuron.squash.ReLU,
        bias: 1
    })
    outputLayer.set({
        squash: Neuron.squash.ReLU,
        bias: 1
    })

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Perceptron(22, 8, 2);
var myTrainer = new Trainer(myPerceptron);

// console.log(data);

myTrainer.train(encodeData(data.data), {
    rate: .01,
	iterations: 200,
	error: .005,
	shuffle: true,
	log: 1000,
	cost: function(targetValues, outputValues){
        console.log(targetValues);
        console.log(outputValues);
        var temp = Math.abs(targetValues - outputValues);
        temp = temp*temp;
        return temp;
    }
});



main();

function main() {
    console.log("Net Starting");

    var DataSet = data.data;


    for (var i = 0; i < DataSet.length; i++) {

        var encode = encodeData([DataSet[i]]);
        var output = myPerceptron.activate(encode[0].input);
        console.log(DataSet[i][0] + " C: " + DataSet[i][1] + " P: " + output);

    }
    console.log("bot closing...");
}

function encodeData(DataSet) {
    var encodedData = [];

    for (var i = 0; i < DataSet.length; i++) {

        // console.log(DataSet[i][2]);
        // console.log(DataSet[i][1]);
        encodedData.push({
            input: DataSet[i][2],
            output: DataSet[i][1]
        });
    }
    return encodedData;
    
}
