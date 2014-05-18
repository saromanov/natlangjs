var Load = require('./io')
	utils = require('./utils')

module.exports = TextAnalysis


//Tokenize By Part Of Speech
TextAnalysis.prototype = {
	TokenizeByPOS: function(){
		return tokenizeByPOS(this.documents, this.dictionary, 'rus')
	},
	//Get percent with tags from total number of words in documents
	WithTags: function(){

		return 1 - WithoutTags(this.dictionary)/this.countwords
	},

	//Return list of popular words
	byPopular: function(){
		return ByPopular(this.dictionary);
	},

	/*
	 Получить пары различных частей речи из текста (которые находятся рядом)
	 Например getPairsbyPOS('сущ', 'прилаг'),
	 На улице хорошая погода => [улице, хорошая])
	*/

	getPairsByPOS: function(pos1, pos2){
		tokens = this.TokenizeByPOS();
		return PairsByPos(tokens, pos1, pos2);
	}
}



function TextManager()
{
	return {
		lowercase: function(x){
			if(typeof x == 'string')
				return x.toLowerCase();
			else
				return x.map(TextManager().lowercase);
		},
		removeDuplicates: function(text){
			return text.filter(function(elem, pos){
				return text.indexOf(elem) == pos;
			})
		}
	}
}

//Get data without undefined
function getClearDictionary(dictionary){
	return dictionary
	 		.map(function(m){
				return m.filter(function(x){ return x != undefined});
			});
}

//Splitting and other preparation for document
function PrepareDocuments(documents){
	var tm = TextManager()
	var Tokenizer = utils().Tokenizer
	var result = []
	for(var i = 0;i < documents.length;++i){
		var doc = documents[i];
		result.push(tm.lowercase(Tokenizer(doc)))
	}
	return result;
}


//Tokenize documents by part of speech
function tokenizeByPOS(documents, dictionary, lang){
	var result = []
	if(lang == 'rus'){
		for(var d = 0;d < documents.length;++d){
			var doc = documents[d];
			var dic = dictionary[d];
			if(doc.length != dic.length)
				throw "Docment array and Dictionary array haven't same length."
			var tmp = []
			for(var i = 0;i < doc.length;++i){
				if(dic[i] != undefined)
					tmp.push([doc[i], dic[i][1]])
				else
					tmp.push([doc[i], undefined])
			}
			result.push(tmp);
		}
		return result;
	}
}

function DictionaryOfTags(documents, lang){
	if(lang == 'rus'){
		if(documents.length == 0)
			throw "List of documents is empty"
		var result = []
		var l = new Load().freqrnc2011().tohashtable();
		for(var doc in documents){
			var tmp = []
			var tmpDoc = documents[doc]
			for(var d = 0; d < tmpDoc.length;++d){
				tmp.push(l.get(tmpDoc[d]));
			}
			result.push(tmp)
		}

		return result;
	}

	//From http://corpus2.byu.edu/coca/files/100k_samples.txt
	if(lang == 'eng'){

	}
}

function WithoutTags(dictionary){
	return dictionary
		  .map(function(x){
		  		return x.filter(function(a){return a == undefined;}).length})
		  .reduce(function(a,b){ return a + b})
}

//Get total number of words in documents
function CountWords(documents){
	return documents
		  .map(function(a){return a.length})
		  .reduce(function(a, b){ return a + b;});
}

function TextAnalysis(documents, nlang){
	this.documents = documents
	this.nlang = nlang
	this.countwords = CountWords(documents);
	this.dictionary = DictionaryOfTags(documents, nlang)
	if(nlang == 'rus')
		this.dict_freq = new Load().freqrnc2011().tohashtable()
}

function PairsByPos(dictionary, pos1, pos2){
	var pairs = []
	var result = []
	for(var t in tokens){
		var data = tokens[t]
		var tmp = []
		for(var d = 0;d < data.length;++d){
			if (data[d][1] != undefined)
				tmp.push(data[d])
			}
		pairs.push(tmp);
		}
		
	for(var i = 0;i < pairs.length;++i){
		var data = pairs[i];
		var tmp = []
		for(var j = 0;j < data.length;++j){
			if(data[j][1] == pos1 && data[j+1][1] == pos2)
				tmp.push([data[j][0], data[j+1][0]])
		}
		result.push(tmp);
	}
	return result;
}

function ByPopular(dictionary){
	var cleardict = getClearDictionary(dictionary);
	var result = []
	for(var c in cleardict){
		result.push(cleardict[c].sort(function(a,b){ return parseFloat(a[2]) < parseFloat(b[2]);}))
	}
	return result;
}


