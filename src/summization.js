//Использовать Naive Bayes
require('underscore')

var Summary = function(){
	var algo = arguments.algo;
	if(algo == "nb"){
		//Использовать Naive Bayes
		var text = arguments.text;
	}
	if(algo == "hmm"){

	}
	if(algo == "nn"){

	}

	return NaiveSummary(arguments.text);
}

//Ranking-Based
//http://users.cis.fiu.edu/~lli003/Sum/ECIR/2005/1.pdf
var NaiveSummary = function(text){

}

var Ranking = function(words, sim){

}

var TitleKeyword = function(docs){
	
}