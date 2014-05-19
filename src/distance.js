
module.exports = Distance

function Distance()
{
	return {
	HammingDistance: function(word1, word2){
		if(word1.length != word2.length)
			console.log("Length of this string not equal");
		var c = 0;
		for(var i = 0;i < word1.length;++i)
			if(word1[i] !=  word2[i]) c += 1;
		return c;
	},

	Jaro:function(m, t, str1, str2){
		var min = 0;
		var max = 0;
		var len1 = str1.length;
		var len2 = str2.length;
		if(m == 0)
			return 0
		if(len1 > len2){
			max = len1;
			min = len2;
		}
		if(str1.length < str2.length){
			max = len2;
			min = len1;
		}

		function score(weight){

		}

		var result = (m/len1 + m/len2 + (m - t)/m)/3;
		return (m/len1 + m/len2 + (m - t)/m)/3;
	 },	

	Jaro_Winkler: function(m, t, str1, str2, l, w){
		var jaro = this.Jaro(m,t,str1, str2);
		return jaro + (l * w * (1 - jaro));
	},
	Manhatten: function(x, y){
		if(x.length == y.length){
			var distance = 0
			for(var i in x)
				distance += Math.abs(x[i] - y[i])
			return distance
		}
	},
	Minkowski: function(x, y, p){
		if(x.length == y.length){
			var distance = 0
			console.log()
			for(i in x){
				distance += Math.pow(Math.abs(x[i] - y[i]),p)
			}
			return Math.pow(distance, 1/p)
		}
	},
	mse: function(data1, data2){
		return data1.map(function(x, i){ return Math.pow(data1[i] - data2[i],2);})
					.reduce(function(a,b){ return a + b;})/data1.length;
	}
 }
}


