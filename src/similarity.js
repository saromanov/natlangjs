var tfidf = require("./tfidf")
	util = require('./utils')

var Similariry = function(){
	return {
		sim1: function(doc, words){
			doc.forEach(function(x){
				//console.log(tfidf.TFIDF(doc, x, words));

				var idf = Math.pow(tfidf().idf(words, new util().Tokenizer(doc)),2);
				console.log(idf);
			})
		}
	}
}
