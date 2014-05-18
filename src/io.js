var fs = require('fs')
	//https://github.com/louischatriot/node-binary-search-tree
	Btree = require('binary-search-tree').BinarySearchTree
	//https://www.npmjs.org/package/hashtable
	HashTable = require('hashtable')
	path = require('path')

module.exports = Load


function Load(){

}

Load.prototype = {
	fromCSV: function(path, sep){
		return fs.readFileSync(path, 'utf-8').split(sep)
	},
	//Frequency dictionary for Russian language
	//http://dict.ruslang.ru/freq_faq.html
	freqrnc2011: function(){
		return convertData(LoadDataInner('/data/freqrnc2011.csv', 'utf-8', '\n', '\t'));

	},

	//Load Part Of Speech English Dictionary
	//http://icon.shef.ac.uk/Moby/mpos.html
	mpos: function(){
		var compfunction = function(data){
			if(data[1] != undefined)
				return [data[0], data[1].split("")];
			else
				return [data[0]];
		}
		return convertData(LoadDataInner('/data/mpos/mobyposi.i', 'ascii', '\r', 'W', compfunction));
	},

	//Load from txt or similar format plain text
	textData: function(patht){
		return fs.readFileSync(patht, 'utf-8').split('/n');
	}
}

function LoadDataInner(pathd, encode, splitter1, splitter2, func){
	var d_data = fs.readFileSync(path.resolve("..") + pathd, encode).split(splitter1)
	var result = []
	for(var d in d_data){
		if(func != undefined){
			result.push(func(d_data[d].split(splitter2)));
		}
		else
			result.push(d_data[d].split(splitter2));
	}
	return result;
}

function convertData(result){
	return {
			data: function(){
				return result;
			},
			tobtree: function(idx){
				return toBinaryTree(result, idx)
			},
			tohashtable: function(){
				return toHashTable(result)
			}
		}
}

//Represent CSV data in Binary Tree
//data - list of info
//idx - target column id
function toBinaryTree(data, idx){
	var bst = new Btree();
	for(var d in data){
		var param = parseFloat(data[d][idx])
		if(!isNaN(param))
			bst.insert(param, data[d])
	}
	return bst;
}

function toHashTable(data){
	var hash = new HashTable()
	for(var d in data){
		hash.put(data[d][0], data[d])
	}
	return hash;
}



