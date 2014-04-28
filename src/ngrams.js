var utils = require('./utils')
var Tokenizer = utils().Tokenizer


module.exports = NGrams

function NGrams(listofwords, n)
{
	function NGramHelpful(accum, ngrams){
		if(ngrams.length<= n){
			accum.push(ngrams);
			return accum;
		}

		else if(ngrams.length - n <= n){
			accum.push(ngrams.slice(0,n));
			ngrams.splice(0,n);
			accum.push(ngrams);
			return accum;
		}
		accum.push(ngrams.slice(0,n));
		ngrams.splice(0,n);
		return NGramHelpful(accum, ngrams);
	}
	return NGramHelpful([], listofwords);
}