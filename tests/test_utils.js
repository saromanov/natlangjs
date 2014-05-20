var utils = require('../src/utils')

exports.wordToNumsGroup = {
	test_basic:function(data){
	var words = ["I", "am", "the", "one", "who", "can", "fade", "the", "heat"];
	var result = new utils().wordToNums(words);
	data.deepEqual(result, [0,1,2,3,4,5,6,2,7]);
	data.done();
	},

	test_empty: function(data){
		var result = new utils().wordToNums([])
		data.deepEqual(result,[]);
		data.done();
	},

	test_repeat: function(data){
		var result = new utils().wordToNums(["bird", "bird", "bird", "bird", "bird"]);
		data.deepEqual(result, [0,0,0,0,0]);
		data.done();
	},
	

}