
module.exports = utils;
function utils(){
	return {
		zeros: function(n){
			return Array.apply(null, Array(n)).map(function () {return 0;});
		},
		Tokenizer: function(data){
			data = data.replace(/,/g,"");
			return data.split(' ');
		},
		removeDuplicates: function(text){
			return text.filter(function(elem, pos){
				return text.indexOf(elem) == pos;
			})
		}
	}
}

