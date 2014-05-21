
//Experimental with fuzzy logic
//использование алгоритма FCM (fuzzy clustering)

//http://iiesl.utk.edu/projects/Web%20Mining%20%26%20KDD/References/reference/Web%20mining_%20a%20survey%20in%20the%20fuzzy%20framework.pdf
////https://sites.google.com/site/dataclusteringalgorithms/fuzzy-c-means-clustering-algorithm


var Distance = require('../distance')
function FuzzySet(dataset, numclusters, q) {
	//q - fixed param (1.5)

	this.dataset = dataset;
	this.numclusters = numclusters;
	this.matrix = InitMatrixData(dataset.length, this.numclusters);
	this.q = q;
	result = InitCenters(this.dataset, this.numclusters);
	this.centers = result[0];
	this.dataset = result[1];
	console.log(this.centers);
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

//
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
		var idx = Math.floor(Math.random(datapoints.length-1)*100);
		centers.push(datapoints[idx]);
		datapoints.splice(idx);
	}
	return [centers, datapoints];
}

function UpdateMembership(matrix, params, clusters, fuzzyidx, distance){
	if(clusters.length == 0)
		throw "Empty list of clusters";
	if(params.length == 0)
		throw "Empty list of dataset";
	if(distance == undefined)
		throw "Distance function is not defined";
	if(matrix.length == 0)
		throw "Matrix is not defined";

	for(var i = 0; i < matrix.length;++i){
		for(var j = 0;j < matrix.length;++j){
			var resuld_d = 0;
				//resuld_d += Math.pow(distance(ij, ik), (2/(fuzzyidx-1)));
				var upper = DistHelpful(params[j], clusters[i], distance, fuzzyidx);
				var sum_lower = 1;
				for(var k = 0;k < clusters.length;++k){
					sum_lower += DistHelpful(params[j], clusters[k], distance, fuzzyidx);
				}

			matrix[i][j] = upper/sum_lower;
		}
	}
	return matrix;
}

function DistHelpful(value, cluster, distance, fuzzyidx){
	return Math.pow(1/(distance(value, cluster)),(1/(fuzzyidx)-1)); 
}


function UpdatClusterCenters(matrix, points, fuzzyidx){
	var result = 0;
	for(var i = 0;i < points;++i){
		for(var j = 0;j < this.numclusters;++j){
			result += (Math.pow(matrix[i][j], fuzzyidx) * points[i])/Math.pow(matrix[i][j], fuzzyidx);
		}
	}
	return result;
}

function ComputeFCM(matrix, centers, points, threshold, iters, fuzzyidx, distancefunc){
	for(var i = 0;i < iters;++i){
		matrix = UpdateMembership(matrix, points, centers, fuzzyidx);
		centers = UpdatClusterCenters(matrix, points, fuzzyidx);
	}
}

//Probably add to optimiz module
function Minimize(matrix, data, cluster){
	for(var i = 0;i < matrix.length;+i){
		var vector = matrix[i];
		for(var j = 0;j < vector.length;++j){

		}
	}
}
