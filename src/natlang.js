(function() {
var util = require('util'),
		   fs = require('fs'),
		   utils = require('./utils')
		   matrix = require('matrices');
		   TFIDF = require('./tfidf')
		   NGrams = require('./ngrams')
		   Distance = require('./distance')

var Matrix = matrix.Matrix;


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

function readData(path){
	fs.readFile(path, function (err, data) {
  	if (err) throw err;
  	return 
});
}

//Tags
function Tagging(data){
	var obj = [];
	value = readData('data.json');
	tokens = Tokenizer(data);
	for(var item in value){
		next = value[item];
		for(verb in next)
		{
			for(var i in tokens){
				if (next[verb].indexOf(tokens[i]) != -1){
					obj.push([tokens[i], verb]);
				}
			}
		}
	}
	return obj;
}

function OneToAnyFunction(data, func) {
	var c = 0
	data.forEach(function(x){
		if(func(x))
			c += 1;
	});
	return c/data.length;
}


})();

