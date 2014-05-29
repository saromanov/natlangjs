
//Experimental with fuzzy logic
//использование алгоритма FCM (fuzzy clustering)

//http://iiesl.utk.edu/projects/Web%20Mining%20%26%20KDD/References/reference/Web%20mining_%20a%20survey%20in%20the%20fuzzy%20framework.pdf
////https://sites.google.com/site/dataclusteringalgorithms/fuzzy-c-means-clustering-algorithm


var Distance = require('../distance')
	utils = require('../utils')
function FuzzySet(dataset, numclusters, q) {
	//q - fixed param (1.5)

	this.dataset = dataset;
	this.numclusters = numclusters;
	this.q = q;
	result = InitCenters(this.dataset, this.numclusters);
	this.centers = result[0];
	this.dataset = result[1];
}

FuzzySet.prototype = {

	//Init Matrix and centroids
	//User Matrix init
	initMatrix: function(func){
		
	},
	compute: function(threshold, iters, distancefunc){
		return ComputeFCM(this.matrix, this.centers, this.dataset, threshold, iters, this.q,
			distancefunc);
	}
}

//to remove
function InitMatrixData(values, numclusters){
	var result = []
	for(var i = 0;i < values;++i){
		var temp = []
		for(var j = 0;j < numclusters;++j)
		{
			temp.push(Math.random(100));
		}
		result.push(temp);
	}
	return result;

}

//Random initialize centers
function InitCenters(datapoints, numclusters){
	var centers = [];
	for(var i = 0;i < numclusters;++i){
		var idx = Math.floor(Math.random() * (datapoints.length-1));
		centers.push(datapoints[idx]);
		datapoints.splice(idx, 1);
	}
	return [centers, datapoints];
}

function UpdateMembership(params, clusters, fuzzyidx, distance){
	if(clusters.length == 0)
		throw "Empty list of clusters";
	if(params.length == 0)
		throw "Empty list of dataset";
	if(distance == undefined)
		throw "Distance function is not defined";
	var matrix = [];
	for(var i = 0; i < params.length;++i){
		var tempmatrix = [];
		for(var j = 0;j < clusters.length;++j){
				var upper = DistHelpful(params[i], clusters[j], distance, fuzzyidx);
				var sum_lower = 1;
				for(var k = 0;k < clusters.length;++k){
					sum_lower += DistHelpful(params[i], clusters[k], distance, fuzzyidx);
				}
			tempmatrix.push(1/(Math.pow((upper/sum_lower), (2/(fuzzyidx-1)))));
		}
		matrix.push(tempmatrix);
	}
	return matrix;
}

function DistHelpful(value, cluster, distance, fuzzyidx){
	return Math.pow(1/(distance(value, cluster)),(1/(fuzzyidx)-1)); 
}


function UpdateClusterCenters(matrix, points, numclusters, fuzzyidx){
	var clusters = [];
	for(var k = 0; k < numclusters;++k){
        var upper = 0;
        var lower = 0;
		for(var j = 0;j < points.length;++j){
		  upper += Math.pow(matrix[j][k], fuzzyidx) * points[j];
		  lower += Math.pow(matrix[j][k], fuzzyidx);
		   	//console.log(i, j, matrix[i][j], lower);
		}
	   clusters.push(upper/lower);
	 }
	return clusters;
}


function ComputeFCM(points,centers, threshold, iters, fuzzyidx, distancefunc){
	var matrix = [];
	for(var i = 0;i < iters;++i){
		matrix = UpdateMembership(points, centers, fuzzyidx, distancefunc);
		centers = UpdateClusterCenters(matrix, points, centers.length, fuzzyidx);
		minvalues = Minimize(matrix, points, centers);
	}
	return centers;
}

//Probably add to optimiz module
function Minimize(matrix, data, cluster){
	var result = 0;
	for(var i = 0;i < data.length;++i){
		var vector = matrix[i];
		for(var j = 0;j < cluster.length;++j){
			result += matrix[i][j] * Euclidean(data[i], cluster[j]);
		}
	}
	return result;
}

