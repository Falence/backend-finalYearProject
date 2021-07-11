const indexer = require('./indexer.js');
const config = require('config');
const app = require('./app')

/*  IMPORT DATA TO ELASTICSEARCH THROUGH CLIENT
// Index and import data
var indexname = config.elasticsearch.elasticsearchIndices.COMPANY.index;
var indextype = config.elasticsearch.elasticsearchIndices.COMPANY.type;
var tableName = config.elasticsearch.elasticsearchIndices.COMPANY.collectionName;

//indexer.IndexMongodbData(indexname, indextype, tableName); //Inserting bulk data into Elasticsearch, Kibana from mongodb
//indexer.DeleteMappings(indexname);  //Deleting bulk data from Elasticsearch, Kibana from mongodb
*/


// Start server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})