//http://en.wikipedia.org/wiki/Naive_Bayes_classifier
//http://www.cs.columbia.edu/~mcollins/em.pdf

var fs = require('fs')
function NaiveBayes(dataset, labels){
	this.data = dataset;
	this.simlabels = labels;
	this.dataset = CountData(dataset);
	this.uniquelabels = GetUniqueLabels(labels)
	this.labels = CountLabels(labels, this.uniquelabels);
	this.countlabels = labels.length;
}

NaiveBayes.prototype = {
	//Value is a list
	predict: function(value){
		var maxprob = 0;
		var maxlabel = '';
		for(var l in this.uniquelabels){
				var result = 1;
				for(var v in value){
					if(value[v] in this.dataset){
					   var mle = CountParams(this.data, this.simlabels, this.uniquelabels[l], value[v]);
					   result *= (mle * this.dataset[value[v]] /this.labels[this.uniquelabels[l]]);
				   }
				}
				var result2 = this.labels[this.uniquelabels[l]]/this.countlabels;
				if(result > maxprob){
					maxprob = result;
					maxlabel = this.uniquelabels[l];
				}
			}
		return maxlabel;
	}
}

function CountData(dataset){
	var result = {}
	for(var d in dataset){
		var data = dataset[d];
		for(i in data){
			if(data[i] in result)
				result[data[i]] += 1;
			else
				result[data[i]] = 0;
		}
	}
	return result;
}

//Get how many different labels from labels set
function CountLabels(labels, unique){
	var result = {};
	for(var lab in unique){
		result[unique[lab]] = labels.filter(function(x){ return x == unique[lab]}).length;
	}
	return result;
}

//Get how many different labels from labels set
function GetUniqueLabels(labels){
	return labels.filter(function(elem, pos, self){
		return self.indexOf(elem) == pos && elem!= '';
	});
}

function CountParams(dataset, labels, labvalue, value)
{
	var result = 0;
	for(var d in dataset){
		if(labels[d] == labvalue && dataset[d].indexOf(value) != -1){
			result += 1;
		 }
		}
	return result/labels.length;
}
