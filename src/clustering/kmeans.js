var distance = require('./distance')

module.exports = KMeans

function KMeans(iters, numclusters, centroids){
	var result = [];
	var result_centroids = []
	if(numclusters == undefined)
		this.numclusters = 3
	this.numclusters = numclusters
	this.iters = iters
	this.centroids = centroids
}

KMeans.prototype = {
	init_centroids: function(){

	},
	//Random selection centroids from data
	random_selection: function(data, num){
		return Array.apply(null, Array(num))
						 .map(function() { return Math.floor(Math.random()*data.length-1)})
						 .map(function(x){ return data[x]});
	},

	//Get mean from data as centroids
	//Only for 2-d data
	mean_centroids: function(data){
		var result = [];
		for(var k = 0;k < this.numclusters;++k){
			var dataX = 0
			var dataY = 0
			for(var i = k;i < data.length;i += this.numclusters){
				dataX += data[i][0];
				dataY += data[i][1];
			}
			var select = this.random_selection(data, 1)[0]
			var X = dataX/(data.length/this.numclusters) + select[0]
			var Y = dataY/(data.length/this.numclusters) + select[1]
			result.push([X,Y])
		}
		return result;
	},

	predict: function(value){

	},
	run: function(data){
		if(this.centroids == undefined)
			this.centroids = this.random_selection(data, this.numclusters);
		centroids = this.centroids
		first_distance = this.get_distance(data, this.centroids)
		console.log(first_distance)
		changed = false;
		num_iters = 0;
		while(num_iters < this.iters && changed == true){
			this.centroids = this.update(this.centroids)
			distance = this.get_distance(data, this.centroids)
			num_iters += 1;
		}
		return this.get_clusters_id(first_distance)

	},
	get_distance: function(data, centroids){
		mindistance = this.mindistance;
		return data.map(function(x){return mindistance(x, centroids)})
	},
	total_distance: function(dist){
		return dist.reduce(function(a, b) {return a + b;})
	},
	//Update centroids
	//TODO
	update: function(func, value){
		//return 1/value * data.reduce(function(x, y){ return x + y; },0);
		return func(value)
	},
	mindistance: function(data, centroids){
		min_d = 999999
		mincentr = []
		id = 0
		for(c in centroids){
			var dist = Math.abs((data[0] - centroids[c][0]) + (data[0] - centroids[c][0]));
			if(dist < min_d){
				min_d = dist
				mincentr = centroids[c]
				id = c
			}
		}
		return [min_d, id];
	},
	//Get clusters's id
	get_clusters_id: function(data){
		return data.map(function(x){return parseInt(x[1])+1});
	},
	c_distances: function(data){
		return data.map(function(x) {return x[0]});
	}

}


function test_kmeans()
{
	var X = [[ 0.72086751,  3.71347124],
       [-1.89468423,  7.96898545],
       [ 1.35678894,  4.36462484],
       [ 1.05374379,  4.49286859],
       [ 1.59141542,  4.90497725],
       [ 0.78260667,  4.15263595],
       [-1.95751686,  3.87291474],
       [-0.77354537,  7.87923564],
       [ 0.12313498,  5.27917503],
       [-1.43284669,  7.71577043],
       [-0.92819001,  7.02698199],
       [-1.74836345,  7.06307447],
       [-1.26789718,  7.25141327],
       [-0.98661744,  7.74968685],
       [-0.81984047,  7.50994722],
       [ 2.99684287,  0.22378413],
       [ 1.46870582,  1.86947425],
       [-0.33533163,  3.390122  ],
       [-1.86407034,  2.93379754],
       [ 2.62496786,  0.28025075],
       [ 2.11114739,  3.57660449],
       [-1.8219901 ,  7.61654999],
       [-1.91186205,  3.18750686],
       [ 2.28809874,  0.12954182],
       [ 0.5285368 ,  4.49723858],
       [-1.57613028,  2.58614312],
       [-0.565433  ,  3.65813966],
       [ 0.802314  ,  4.38196181],
       [ 2.79939362,  1.84560825],
       [ 2.64465731,  0.80770124],
       [ 1.7190373 ,  0.71788708],
       [-0.93564005,  7.03443119],
       [ 2.14398059,  0.69677319],
       [ 2.06051753,  1.79059891],
       [-1.21986433,  3.3789856 ],
       [ 1.13280393,  3.87673946],
       [-1.497272  ,  8.80022604],
       [ 1.85367905,  1.5088862 ],
       [-0.1666378 ,  8.50372399],
       [-1.89928142,  2.50466299],
       [ 1.04829186,  5.03092408],
       [-1.44356727,  3.23539798],
       [-1.57006498,  6.72375844],
       [-1.98331513,  3.47639041],
       [-1.87418794,  2.84306499],
       [-1.86097353,  8.2576415 ],
       [ 1.61986895,  0.60823883],
       [-1.84482705,  3.25609891],
       [ 0.72144399,  4.08475018],
       [ 0.5323772 ,  3.31338909],
       [ 0.3498724 ,  4.69253251],
       [ 1.89949126,  0.92574633],
       [-1.2386086 ,  2.81373288],
       [-1.74448079,  3.84251413],
       [-0.96358605,  2.37791651],
       [-1.26041884,  7.46644456],
       [-0.8623605 ,  8.24721209],
       [ 2.4198128 ,  0.96215512],
       [ 2.23345072,  1.25095024],
       [-0.65424088,  7.99393132],
       [-1.42525273,  7.14798437],
       [ 1.51989121,  1.42488952],
       [ 2.11872357,  1.09865834],
       [ 1.74265969,  5.03846671],
       [ 1.42002502,  1.38236201],
       [-0.69842598,  8.16309188],
       [-2.18485772,  2.68708996],
       [-1.32890066,  2.37135151],
       [ 2.15940501,  1.38598318],
       [ 1.19820169,  4.47062449],
       [-1.7653772 ,  8.17625727],
       [ 1.4726926 ,  1.3480769 ],
       [ 0.92466065,  4.50908658],
       [-1.47602203,  7.8441996 ],
       [ 0.99914934,  4.2101954 ],
       [ 1.40848818,  3.93270482],
       [-0.59312453,  3.37090459],
       [-1.6609057 ,  3.31911046],
       [ 2.25643834,  0.55525861],
       [ 1.24016835,  1.12905479],
       [ 1.64869438,  0.03452236],
       [-1.61803727,  8.60696731],
       [-1.37778493,  3.58107521],
       [ 0.16932115,  4.19741719],
       [ 1.73810647,  0.71629308],
       [-1.05327803,  2.84037721],
       [ 1.60161834,  0.92363636],
       [ 1.84845803,  0.52393625],
       [ 1.72330962,  4.2012082 ],
       [ 1.00952869,  4.45502328],
       [ 0.96217896,  4.51795326],
       [-1.33869125,  2.36818187],
       [ 0.4519936 ,  3.59377836],
       [-1.19075663,  3.12161318],
       [-2.27253281,  3.13757811],
       [-1.80044744,  7.86154256],
       [-1.64996061,  7.49068513],
       [-1.56102482,  3.77455362],
       [-0.78782636,  7.99482384],
       [-0.30022483,  4.63059663]]

     var km = new KMeans(20,3)
     km.run(X)
}



