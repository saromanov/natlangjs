var utils = require('./utils')

module.exports = TFIDF

//Count words in this list
function Count(arr, word){
	return arr.filter(function(w){return w == word;}).length;
}




function TFIDF(word, doc, documents){

	return {
		tf: function(word, doc){
			return Count(doc, word)/doc.length
		},

		idf: function(word, documents){
			console.log(utils()
								.zeros(documents.length)
								.map(function(i, j){return Count(documents[j], word)})
								.reduce(function(i,j){return i + j},0))
			return Math.log(documents.length/utils()
								.zeros(documents.length)
								.map(function(i, j){return Count(documents[j], word)})
								.reduce(function(i,j){return i + j},0));
		},

		tfidf: function(documents, doc, word){
			tf(word, doc) * idf(word, documents);
		}
	}

}