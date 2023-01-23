const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const bodyParser = require('body-parser');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const db = require('./util/database');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, HEAD, PUT');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.get('/', (req, res, next) => {
//     console.log('Hi');
//     res.json({status: 'ok'});
// });

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

// Set up GraphQL
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred!';
        const code = err.originalError.statusCode || 500;
        return {message: message, status: code, data: data};
    }
}));

// Error handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
    console.log('Server ready on port 3000');
});