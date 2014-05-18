var TextAnalysis = require('../src/analysis')

exports.test_getCountRusEngWords = function(data){
	//http://habrahabr.ru/post/223205/
	var s = 'Как известно, Linux Mint 17 — открытая ОС, базирующаяся на Ubuntu, и предназначенная не столько для профи, сколько для обычных пользователей, которым важна простота использования, логичный интерфейс, простота установки ПО, кодеков, драйверов и всего прочего, что может понадобиться'
	var txt = new TextAnalysis(s)
	var result = txt.getCountRusEngWords();
	data.equal(result['rus'], 33);
	data.equal(result['rustoall'], 0.8918918918918919)
	data.done();
}