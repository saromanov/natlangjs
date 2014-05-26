var utils = require('./utils')
var Tokenizer = utils().Tokenizer


module.exports = NGrams

function NGrams(listofwords, n)
{
	function NGramHelpful(accum, ngrams){
		if(ngrams.length == 0)
			return accum;
		if(ngrams.length <= n){
			accum.push(ngrams.slice(0,ngrams.length));
			return accum;
		}
		accum.push(ngrams.slice(0,n));
		return NGramHelpful(accum, ngrams.splice(1,ngrams.length));
	}
	return NGramHelpful([], listofwords);
}
