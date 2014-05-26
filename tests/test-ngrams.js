var NGrams = require('../src/ngrams')
var utils = require('../src/utils')
var Tokenizer = utils().Tokenizer

exports.ngrams_test1 = function(data){
	var text = "a b c d e";
	var result = NGrams(Tokenizer(text),3);
	data.deepEqual(result, [ [ 'a', 'b', 'c' ], [ 'b', 'c', 'd' ], [ 'c', 'd', 'e' ] ]);
	data.done();
}

/*exports.ngrams_test = function(data){
	var text = "Picasso demonstrated extraordinary artistic talent in his early years, painting in a realistic manner through his childhood and adolescence."
	var result = NGrams(Tokenizer(text), 5)
	data.deepEqual(compare(result, [[ 'Picasso','demonstrated','extraordinary','artistic','talent' ],
  [ 'in', 'his', 'early', 'years', 'painting' ],
  [ 'in', 'a', 'realistic', 'manner', 'through' ],
  [ 'his', 'childhood', 'and', 'adolescence.' ] ]), true)
	data.done();

}*/