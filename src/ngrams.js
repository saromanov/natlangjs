var utils = require('./utils')
var Load = require('./io')
var Tokenizer = utils().Tokenizer


module.exports = NGrams
function NGrams(listofwords, n){
	var ngrams = [];
	for(var i = 0;i < listofwords.length-n+1; i += 1){
		ngrams.push(listofwords.slice(i, i+n));
	}
	return ngrams;
}


function WordCount(data, word){
	return data.filter(function(x){ return x == word;}).length;
}
function NGramCount(data, ngrams){
	return data.filter(function(x){ return x[0] == ngrams[0] && x[1] == ngrams[1]}).length;
}

function NGramsProbability(training, n){
	var values = training;
	var ngrams = NGrams(training, n);
	var number = n;
	return {
		probability: function(text){
			var test_tokens = Tokenizer(text);
			var test_ngrams = NGrams(test_tokens, this.number);
			var sumprod = 1;
			for(var i = 0;i < test_ngrams.length;++i){
				sumprod *= NGramCount(ngrams, test_ngrams[i])/ WordCount(training,test_ngrams[i][0]);
			}
			return sumprod;
		}
	}
}

/*var l = new Load().textData('../../datanatlang/train_ngrams')
var tokens2 = Tokenizer(l[0]);
var prob = new NGramsProbability(tokens2,2).probability("coalition government");
console.log(prob);*/

