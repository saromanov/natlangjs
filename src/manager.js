//Text manager

module.exports = TextManager

var TextManager = function(){
	return {
		lowercase: function(x){
			if(typeof x == 'string')
				return x.toLowerCase();
			else
				return x.map(TextManager().lowercase);
		},
		//prepared data in format
		//[['one', 'two', 'three']]
		popularWords: function(data){
			prep = data.map(function(x){ return x[0].split(' ')});
			hash = new Object()
			prep.forEach(function(value){
				for(var i = 0;i < value.length;++i){
					if(value[i] in hash)
						hash[value[i]] += 1
					else
						hash[value[i]] = 0
				}
			})
			return sort
		},

		popularPairs: function(data){


		}
	}
}
