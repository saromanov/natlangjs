var distance = require('../distance')

module.exports = KMedoids

/*
centroids - define coordinates of centroids
randpoints - define randomly number of poinds in data as medoids
data - array of pair of points
iterations - number of swapping medoids and non-medoids
*/
function KMedoids(data, randpoints, iterations, centroids){
		this.iters = iterations
		this.centroids = centroids,
		this.nummedoids = randpoints
		this.data = data
}

KMedoids.prototype = {
	/*
		Init this model - i.e randomly choice medoids and remove it from data
	*/
	init: function(){
		if(this.centroids == undefined)
			this.medoids = this.choice_medoids(this.nummedoids)
		else
			this.medoids = this.centroids
		this.clusters = this.init_clusters(this.medoids)
	},

	init_clusters: function(clusters){
		var clst = {}
		for(var i in clusters){
			clst[clusters[i]] = [clusters[i]]
		}
		return clst
	},

	choice_medoids: function(num){
		var md = []
		for(var i = 0;i < num;++i){
			var idx = Math.floor(Math.random()*this.data.length)
			md.push(this.data[idx])
			this.data.splice(idx,1)
		}
		return md;
	},

	//Set old medoid to data set and select new medoid
	replace_medoid: function(){
		var value = Math.floor(Math.random()*this.data.length)
		var new_medoid = this.data[value]
		this.data.splice(value,1)
		var old_medoid_value = Math.floor(Math.random()*this.medoids.length)
		var old_medoid = this.medoids[old_medoid_value]
		this.data.push(old_medoid)
		this.medoids.splice(old_medoid_value,1)
		this.medoids.push(new_medoid)
	},

	/*
		Cost function is distance between medoid and non-medoid points
	*/
	compute: function(costfunc){
		data = this.data
		medoids = this.medoids
		var best_clusters = []
		var best = Infinity
		for(var k = 0;k < this.iters;++k){
			for(var i in data){
				var min_distance = Infinity
				var min_cluster=[]
				var cand_data = []
				for(var j in medoids){
					var dist = costfunc(data[i], medoids[j])
					if(dist < min_distance){
						min_distance = dist
						min_cluster = medoids[j]
						cand_data = data[i]
					}
				}
				this.clusters[min_cluster].push(cand_data)
			}
			var total = this.totalCost(this.clusters, costfunc)
			if(total < best){
				best = total
				best_clusters= this.clusters
			}
			this.replace_medoid()
			this.clusters = this.init_clusters(this.medoids)
		}
		return best_clusters
	},

	//Compute total cost
	//clusters is a dict with name of clusters
	totalCost: function(clusters, costfunc){
		var tc = 0
		for(var i in clusters){
			if(clusters[i].length > 0){
				var first = clusters[i][0]
				for(var j = 1;j < clusters[i].length;++j){
					var dist = costfunc(first, clusters[i][j])
					tc += dist
				}
			}

		}
		return tc
	}
}
