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
		var d_data = fs.readFileSync(path.resolve("..") + '/data/freqrnc2011.csv', 'utf-8').split('\n')
		var result = []
		for(var d in d_data){
			result.push(d_data[d].split('\t'))
		}

		toBinaryTree(result, 2)
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



