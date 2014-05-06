var KMedoids = require('../src/clustering/kmedoids')
var distance = require('../src/distance')
function test_kmedoids(){
	var data = [[2,6], [3,8], [4,7], [6,2], [6,4], [7,3], [8,5], [7,6]]
	var centroids = [[3,4], [7,4]]
	var km = new KMedoids(data, 2,10, centroids);
	km.init();
	console.log(km.compute(distance().Manhatten))
}

test_kmedoids()