var Load = require('../src/io')
exports.test_basic_load = function(data){
	var l = new Load().freqrnc2011()
	data.equal(l.data().length,52140)
	data.done()
}

exports.test_find_in_hash = function(data){
	var l = new Load().freqrnc2011().tohashtable()
	var result = l.get('голубь')
	data.equal(result[0], 'голубь')
	data.done()
}