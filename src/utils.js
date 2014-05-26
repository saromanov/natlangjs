
module.exports = utils;
function utils(){
	return {
		zeros: function(n){
			return Array.apply(null, Array(n)).map(function () {return 0;});
		},
		Tokenizer: function(data){
			data = data.replace(/,|\./g,"");
			return data.split(' ');
		},
		removeDuplicates: function(text){
			return text.filter(function(elem, pos){
				return text.indexOf(elem) == pos;
			})
		},
		wordToNums: function(words){
			/* 
			Get list of words for example: 
			words = ["I", "am", "the", "one", "who", "can", "fade", "the", "heat"]
			wordToNums(data) => [0,1,2,3,4,5,6,2,7]
			*/
			var freq={};
			var result = [];
			var inc = 0;
			for(w in words){
				if(words[w] in freq){
					result.push(freq[words[w]]);
				}
				else
				{
					freq[words[w]] = inc;
					result.push(inc);
					inc += 1;
				}
			}
			return result;

		}
	}
}


