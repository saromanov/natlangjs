//http://people.cs.umass.edu/~mccallum/papers/mccallum-conll2003.pdf
//http://www.inference.phy.cam.ac.uk/hmw26/papers/crf_intro.pdf
//http://www.seas.upenn.edu/~strctlrn/bib/PDF/crf.pdf


//words - sequence of words
function CRF(words, states, labels){
	this.words = words;
	this.states = states;
	this.labels = labels;

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
			result += lambda[i] * features[i](labels[j-1], labels[j], word, j));
		}
	}
	return Exp(result)/Exp(Norm(word, labels, states, features));
}

//Normalization factor
function Norm(word, labels, states, features, lambda){
	score = 0;
	for(var i = 0;i < states.length;++i){
		for(var j = 0;j < labels.length;++j){
			for(var k = 0;k < features.length;++k)
				score += lambda[k] * features[k](states[i][j-1], states[i][j], word, k));
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

function MaximumLogLikelihood(sequence, labels, theta, features){
	var result = 0;
	for(var i = 0;i < sequence.length;++i){
		result += Math.log(Prob(sequence[i], labels, features, theta));
	}
	return result;
}


//TODO
function Viterbi(states, prob, pos, labels){
	//todo: generate weights for model
	var weights = [];
	var pos = prob[pos];
	for(var i = 0;i < states.length;++i){
		var temp = [];
		for(var j = 0;j < labels.length;++j){
			temp[j] = states[i][j];
		}
		pos = temp;
	}
}

//Implement log-likelihood gradient

//Compute forward values
function Fowrward(){

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