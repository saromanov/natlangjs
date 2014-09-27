var utils = require('./utils')
var _ = require('underscore')

//Basic implementation of gradient descent
var GradientDescent = function(data, theta, noise, iters){
	var values = [];
	for(var i = 0;i < iters;++i){
		var res1 = dotT(data, theta).map(function(x){ return x + });
		var pred = _.range(res1.length).map(function(x){ res1[x] + noise[x]});
		//Need implement
		values.push(Cost(data, preds, theta));
	}
}

var Cost = function(data, preds, theta){
	var length = preds.length;
	var dotTheta = dotT(data, theta);
	var sError = _.range(length).map(function(x) { return Math.pow(dotTheta[x] - preds[x],2);}
	return (1/(2 * length)) * sError.reduce(function(x, elem){ return x + elem});
}

var dotT = function(data, theta){
	return data.map(function(x){ return x * theta});
}