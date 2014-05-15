var Distance = require('../src/distance')
exports.test_hamming_distance = function(data){
	var p1 = "Paradi"
	var p2 = "Walker"
	var d = Distance().HammingDistance(p1, p2)
	data.equal(d, 5)
	data.done()
}

exports.test_jaro_winkler = function(data){
	var s = 'DWAYNE'
	var s2 = 'DUANE'
	var result = Distance().Jaro_Winkler(4,0, s,s2,1,0.1)
	data.equal(result, 0.8400000000000001)
	data.done()
}

exports.minkowski1 = function(data){
	var x = [8,3,4,-5]
	var y = [7,4,3,-1]
	var lambda = 0.5
	var result = Distance().Minkowski(x,y,lambda)
	data.equal(result, 25)
	data.done()
}

exports.minkowski2 = function(data){
	var x = [1,4,2]
	var y = [3,4,8]
	var lambda = 2
	var result = Distance().Minkowski(x,y,lambda)
	data.equal(result, 6.324555320336759)
	data.done()
}

exports.manhatten1 = function(data){
	var result = new Distance().Manhatten([1,7,5,1,2,5,4], [2,7,5,6,2,1,9])
	data.equal(result, 15)
	data.done()
}

exports.manhatten2 = function(data){
	var result = new Distance().Manhatten([0.7,0.8,0.4,0.9,0.5], [0.2,0.1,0.3,0.9,0.9])
	data.equal(result, 1.7000000000000002)
	data.done()
}