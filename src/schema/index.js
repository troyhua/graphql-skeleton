const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
  }

  type Vote {
    id: ID!
    user: User!
    link: Link!
  }

  type Query {
    allLinks: [Link!]!
  }

  type User {
    id: ID!
    name: String!
    email: String
  }

  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
    createVote(linkId: ID!): Vote
  }

  type SigninPayload {
    token: String
    user: User
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});
