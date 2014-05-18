//http://en.wikipedia.org/wiki/Document-term_matrix

var TextAnalysis = require('./analysis');
	UtilsData = require('./utils')

module.exports = DocumentTermMatrix;

//TODO Add ploting to results

function DocumentTermMatrix(text){
	var countDict = {};
	function GetAllWords(docs){
		var result_words = []
		if(docs.length == 0)
			throw "This list es empty";
		for(var doc in docs){
			var words = docs[doc];
			for(var word in words){
				result_words.push(words[word]);
			}
		}
		return result_words;

	}

	function ConstructMatrix(documents, words){
		var doctextMatrix = [];
			for(var doc = 0; doc < documents.length;++doc){
				var document1 = documents[doc];
				var tempMatrix = new UtilsData().zeros(words.length);
				for(var j = 0;j < document1.length;++j){
					//Get first position of word
					var firstPos = words.indexOf(document1[j]);
					//console.log(words[j] + " : " +  firstPos);
					var new_value = tempMatrix.indexOf()
					if(firstPos != -1){
						tempMatrix = ModifyList(tempMatrix, firstPos)
					}

				}
				doctextMatrix.push(tempMatrix);
		}
		return doctextMatrix;
	}
	var words= new UtilsData().removeDuplicates(GetAllWords(text));
	var doctextMatrix = ConstructMatrix(text, words);
	return {
		getWords: function(){return words;},
		getMask: function(){return doctextMatrix;},
		getDocumentTextMatrixId: function(id){
			return [words.join(','), documents[id].join(','), doctextMatrix[id].join(',')]
		},
		//Получить термы, которые употребляются >= num кол-во раз
		getFreqTerms: function(num){
			var result = []
			var sums = this.getSumVector();
			for(var s in sums){
				if(sums[s] >= num)
					result.push(words[s]);
			}
			return result;
		},

		//How many times term in documents
		getTermCount: function(term){
			var sum = this.getSumVector();
			var idx = words.indexOf(term);
			if(idx != -1)
				return sum[idx];
		},
		//Статистика по терму в отношении ко всем документам
		getTermStat: function(term){
			var idx = words.indexOf(term);
			if (idx != -1)
			{
				var count = 0;
				var allcount = 0;
				doctextMatrix.forEach(function(doc){
					allcount += doc.length
					count += doc[idx];
				});
				if(allcount == 0)
					throw "This document is empty";
				return count/allcount
			}
			return 0;
		},

		//Статистика по терму в отношении к каждому документу
		getTermStatByDoc: function(term){
			var idx = words.indexOf(term);
			if(idx != -1){
				var result = []
				doctextMatrix.forEach(function(doc){
					result.push(doc[idx]/doc.length);
				});
				return result;
			}
		},
		//Merge all vectors to one with sum from all
		getSumVector: function(){
			var result = new UtilsData().zeros(doctextMatrix[0].length);
			doctextMatrix.forEach(function(doc){
				for(d in doc){
					result[d] += doc[d];
				}
			});
			return result;
		}
	}
}

function ModifyList(array, idx){
	var result = []
	for(var i in array)
		if (i == idx){
			var value = array[i] + 1;
			result.push(value);
		}
		else
			result.push(array[i]);
	return result;
}
