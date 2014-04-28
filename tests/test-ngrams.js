var NGrams = require('../src/ngrams')
var utils = require('../src/utils')
var Tokenizer = utils().Tokenizer

exports.ngrams_test = function(data){
	var text = "Picasso demonstrated extraordinary artistic talent in his early years, painting in a realistic manner through his childhood and adolescence."
	var result = NGrams(Tokenizer(text), 5)
	data.ok(result, [[ 'Picasso','demonstrated','extraordinary','artistic','talent' ],
  [ 'in', 'his', 'early', 'years', 'painting' ],
  [ 'in', 'a', 'realistic', 'manner', 'through' ],
  [ 'his', 'childhood', 'and', 'adolescence.' ] ])
	data.done();

}