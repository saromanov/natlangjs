//http://people.cs.umass.edu/~mccallum/papers/mccallum-conll2003.pdf
//http://www.inference.phy.cam.ac.uk/hmw26/papers/crf_intro.pdf
//http://www.seas.upenn.edu/~strctlrn/bib/PDF/crf.pdf
//http://homepages.inf.ed.ac.uk/csutton/publications/crftutv2.pdf


var utils = require('./utils')

//words - sequence of words
function CRF(words, states, labels){
	this.words = words;
	this.states = states;
	this.labels = labels;

}

CRF.prototype = {
	train: function(newdata){

	}
}


function MarkovChain(words, labels, probs){

}

function argmax(){
	console.log(arguments);
}


//Score function
//features - feature function

/* In general, probability of label sequence labels
given an observation sequence
*/
function Prob(word, labels, features, lambda){
	var result = 0;
	for(var i = 0;i < features.length;++i){
		for(var j = 0;j < labels.length;++j){
			result += lambda[i] * features[i](labels[j-1], labels[j], word, j);
		}
	}
	return Exp(result)/Exp(Norm(word, labels, states, features));
}

function GeneralCRF(words, labels, funcs, thetas){
	var result = 0;
	for(var j = 0;j < funcs.length;++j){
		var temp = 1;
		for(var i = 0;i < words.length;++i){
			temp += thetas[i] * funcs[i](words[i], labels[i]);
		}
		result *= temp;
	}
	return result/Norm(words, labels, thetas, funcs);
}

//Normalization factor
function Norm(word, labels, states, features, lambda){
	score = 0;
	for(var i = 0;i < states.length;++i){
		for(var j = 0;j < labels.length;++j){
			for(var k = 0;k < features.length;++k)
				score += lambda[k] * features[k](states[i][j-1], states[i][j], word, k);
		}
	}
	return score;
}


//Training set is (x,y)
function MaximumLikelihood(training, features, lambda){
	var result = 0;
	for(var i = 0;i < features.length;++i){
		var res1 = Math.log(1/Norm(training[i][0]));
		var check = 0;
		for(var j = 0;j < training.length;++j){
			check += lambda[j] * F(training[j][0], training[j][1]);
		}
		result += (check + res1);
	}
	return result;
}


//Compute log-likelihood objective function
function MaximumLogLikelihood(sequence, labels, theta, features){
	var result = 0;
	for(var i = 0;i < sequence.length;++i){
		result += Math.log(Prob(sequence[i], labels, features, theta));
	}
	return result;
}

function ViterbiInit(a,p,k){
	var result = {};
	for(var i = 0;i < count;++i){
		for(var i2 = 0;i2 < p; ++i2)
			for(var i3 = 0;i3 < k;++i3)
				result[[i,i2,i3]] = 1;
	}
	return result;
}

//Algorithms for inference (Viterbi, forward-backward)
//TODO
function Viterbi(states, prob, pos, labels){
	//todo: generate weights for model
	var weights = [];
	var pos = prob[pos];
	var maindata = ViterbiInit(states.length, prob.length, labels.length)
	var zeros = new util().zeros(states.length);
	for(var i = 0;i < states.length;++i){
		var temp = [];
		for(var j = 0;j < labels.length;++j){
			temp[j] = states[i][j];
		}
		pos = temp;
	}


}


//Computing marginal distributions
//http://www.cs.columbia.edu/~mcollins/fb.pdf
function ForwardBackward(words, labels, states, features){
	var forward = Forward(words, labels, states, features);
	var backward = Backward(words, labels, states, features);
}

//Implement log-likelihood gradient

//Compute forward values
function Forward(words, labels, states, init, features){
	var matrix = initValue(init, words.length, labels.length);
	for(var i = 0;i < words.length;++i){
		for(var j = 0; j < labels.length;++j){
			matrix[i][j] = features(words[i-1], labels[j-1], states[i-1][j-1]);
		}
	}
	return matrix;
}

function initValue(init, M, N){
	var matrix = [];
	matrix.push(Array.apply(null, Array(N)).map(function () {return init;}))
	for(var i = 1; i < M;++i)
		matrix.push(new utils().zeros(N));
	return matrix;
}

function Backward(words, labels, states, features){
	var matrix = initValue(words.length, labels.length);
	for(var i = M;i > 1;--i){
		 for(var j = 1;j > labels.length;++j){
		 	matrix[i][j] = features(words[i+1], labels[j+1], states[i+1][j+1])
		 }
	}
}

function Train()
{

}

function Exp(value){
	return Math.pow(Math.E, data)
}


//Gradient descent (to learn feature weights)
function Grad(iters, weights, alpha, values){
	for(var i = 0;i < iters;++i){
		var learnrate = alpha/(Math.sqrt(i) + 1);
		for(var j = 0;j < values.length;++j){

		}

	}

	return weights;
}


