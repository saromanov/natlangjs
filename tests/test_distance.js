var Distance = require('../src/distance')
exports.test_hamming_distance = function(data){
	var p1 = "Paradi"
	var p2 = "Walker"
	var d = Distance().HammingDistance(p1, p2)
	data.ok(d, 5)
	data.done()
}

exports.test_jaro_winkler = function(data){
	var s = 'DWAYNE'
	var s2 = 'DUANE'
	var result = Distance().Jaro_Winkler(4,0, s,s2,1,0.1)
	data.ok(result, 0.8400000000000001)
	data.done()
}