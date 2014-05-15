var TFIDF = require("../src/tfidf.js")

exports.test_tfidf1 = function(data){
	Documents = [["a"], ["a", "b", "E","d"], ["a", "b", "c"], ["e", "p"]]
	var t = TFIDF("a", ["a", "b", "c"], Documents)
	data.equal(t, 0.09589402415059362)
	data.done()
}

exports.test_tfidf2 = function(data){
	Documents = [["a", "b"], ["a", "b", "E","d"], ["a", "b", "c"], ["e", "p"]];
	var t = TFIDF("a", ["a", "b"], Documents);
	data.equal(t, 0.14384103622589042)
	data.done();
}

//TODO load documents from file