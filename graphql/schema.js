const {buildSchema} = require('graphql');

module.exports = buildSchema(`

    type Resp {
        response: String!
    }

    type Parameters {
        userJobTitlesInclude: [String!]
        userJobTitlesExclude: [String!]
    }

    type RootMutation {
        search(parameters: Parameters!): Resp!
        testMutation(key: String!): Resp!
    }

    type RootQuery {
        testQuery(key: String!): Resp!

    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);