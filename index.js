const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = 'mongodb+srv://majdatyyat:CookieJar@cluster0.7xahmuv.mongodb.net/?retryWrites=true&w=majority';

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How to resolve Queries/Mutations
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Connect to MongoDB and start the server
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connection successful');
          // Start the ApolloServer and listen for incoming requests
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    });
