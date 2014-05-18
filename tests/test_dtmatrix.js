//Test Document-Term Matrix
var DocumentTermMatrix = require('../src/dtmatrix')
    TextAnalysis = require('../src/analysis');

 var docs2 = ["A point of view on the matrix is that each row represents a document. In the vectorial semantic model, which is normally the one used to compute a document-term matrix, the goal is to represent the topic of a document by the frequency of semantically significant terms.",
    "The terms are semantic units of the documents."];
 var text = new TextAnalysis(docs2).getPreparedDocuments();
 var dtm = new DocumentTermMatrix(text);

exports.testGetTermStat = function(data){
  /*console.log(dtm.getTermStat('document'));
  console.log(dtm.getTermStatByDoc('document'));
  console.log(dtm.getSumVector());
  console.log(dtm.getFreqTerms(3));*/

  //Not repetition
  data.equal(dtm.getTermCount('semantic'),2);
  data.equal(dtm.getTermCount('semantic'),2);

  data.done();
}
