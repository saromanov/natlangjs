var Load = require('../src/io')
exports.test_basic_load_mpos = function(data){
	var l = new Load().mpos();
	data.equal(l.data().length,233383)
	data.done()
}