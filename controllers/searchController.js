const { elasticClient } = require('./../indexer')
const indexer = require('./../indexer');
const config = require('config');
const url = require('url')

var newsIndex = config.elasticsearch.elasticsearchIndices.COMPANY.index;

const search = (index, track_total_hits, body) => {
    return elasticClient.search({ index, track_total_hits, body })
}

exports.getResults = async (req, res) => {
    console.log('Search Controller has been reached!!')
    const queryString = url.parse(req.url, true).query
    const query = queryString.query
    const newsCategory = queryString.category

    console.log(`Query: ${query}`)
    console.log(`Category: ${newsCategory}`)

    if (newsCategory) {
        const results = await search(newsIndex, track_total_hits = true, {
            size: 100,
            query: {
                match: {
                    category: newsCategory
                }
            }
        })

        console.log(results)

        res.status(200).json({
            status: 'success',
            data: results
        })

    } else {
        const results = await search(newsIndex, track_total_hits = true, {
            size: 100,
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: query,
                                fields: [
                                    'headline^2',
                                    'short_description',
                                    'authors',
                                    'category'
                                ],
                            }
                        },
                        // {
                        //     match: {
                        //         headline: {
                        //             query: query,
                        //             minimum_should_match: 2
                        //         }
                        //     }
                        // }

                    ],
                    must_not: [],
                    should: [
                        {
                            match: {
                                headline: {
                                    query: query,
                                    minimum_should_match: 2
                                }
                            }
                        },
                        { match_phrase: { headline: query } },
                        { match_phrase: { category: query } },
                        { match_phrase: { short_description: query } },
                        { match_phrase: { authors: query } }
                    ],
                    filter: []
                }
            }
        })
        //console.log(`Founded ${results.hits.total.value} items in ${results.took} ms`)
        console.log(results)

        res.status(200).json({
            status: 'success',
            data: results
        })
    }





}

// old one
/*
exports.getResults = async (req, res) => {
    console.log('Search Controller has been reached!!')

    const query = req.body.query

    const response = await elasticClient.search({
        index: 'people',
        type: 'people',
        body: {
            query: {
                match_all: {}
            }
        }
    })

    console.log(response.hits.hits)

    res.status(200).json({
        status: 'success',
        data: response.hits.hits
    })
}
*/
