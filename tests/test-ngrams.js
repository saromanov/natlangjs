var NGrams = require('../src/ngrams')
var utils = require('../src/utils')
var Tokenizer = utils().Tokenizer

function compare(arr1, arr2){
	if(arr1.length != arr2.length)
		return false;
	for(var i = 0;i < arr1.length;++i){
		if(arr1[i].length != arr2[i].length)
			return false
		for(var j = 0;j < arr1[i].length;++j)
			if(arr1[i][j] != arr2[i][j])
				return false
	}
	return true;
}
exports.ngrams_test = function(data){
	var text = "Picasso demonstrated extraordinary artistic talent in his early years, painting in a realistic manner through his childhood and adolescence."
	var result = NGrams(Tokenizer(text), 5)
	data.equal(compare(result, [[ 'Picasso','demonstrated','extraordinary','artistic','talent' ],
  [ 'in', 'his', 'early', 'years', 'painting' ],
  [ 'in', 'a', 'realistic', 'manner', 'through' ],
  [ 'his', 'childhood', 'and', 'adolescence.' ] ]), true)
	data.done();

}