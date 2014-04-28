//http://en.wikipedia.org/wiki/Document-term_matrix

//Buggy and untested version
function DocumentTermMatrix(text){
	var countDict = {};
	function GetAllWords(){
		if(text.length == 0)
			console.log("This list es empty");
		var dict = {}
		var words = [];
		var documents = [];
		text.forEach(function(x){
			var tokens = utils().Tokenizer(x) 
			words+=tokens;
			documents.push(tokens);
		});
	//console.log(words.split(','));
	return [documents, TextManager().removeDuplicates(words.split(','))];
	}

	function ConstructMatrix(documents, words){
		var doctextMatrix = [];
			for(var doc = 0; doc < documents.length;++doc){
				var tempMatrix = []
				words.forEach(function(word){
				if (documents[doc].indexOf(word) != -1){
					tempMatrix.push(1);
					if(word in countDict){
						countDict[word] += 1;
					}
					else
						countDict[word] = 1;
				}
				else{
					tempMatrix.push(0);
				}
			});
				doctextMatrix.push(tempMatrix);
		}
		return doctextMatrix;
	}
	var words= GetAllWords();
	var documents = words[0];
	var split_words = words[1];
	var doctextMatrix = ConstructMatrix(documents, split_words);
	return {
		getWords: function(){return words;},
		getDocuments: function(){return documents;},
		getMask: function(){return doctextMatrix;},
		getDocumentTextMatrixId: function(id){
			return [words.join(','), documents[id].join(','), doctextMatrix[id].join(',')]
		},
		//Получить термы, которые употребляются num кол-во раз
		//Оптимизировать!
		getFreqTerms: function(num){
			var data=[]
			Object.keys(countDict).forEach(function(x){
				if(countDict[x] == num)
					data.push(x);
			});

			return data;
		},
		//Статистика по терму
		getTermStat: function(term){
			var idx = split_words.indexOf(term);
			if (idx != -1)
			{
				var count = 0;
				doctextMatrix.forEach(function(doc){
					count += doc[idx];
				});
				console.log("THIS STAT: " + count);
				return count/documents.length;
			}
			return 0;
		}
	}
}