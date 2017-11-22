const links = [
  {
    id: 1,
    url: 'http://graphql.org/',
    description: 'The Best Query Language'
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'Awesome GraphQL Client'
  },
];

module.exports = {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => { // 1
      return await Links.find({}).toArray(); // 2
    },
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}, user}) => {
      const newLink = Object.assign({postedById: user && user._id}, data)
      const response = await Links.insert(newLink); // 3
      return Object.assign({id: response.insertedIds[0]}, newLink); // 4
    },
    createUser: async (root, data, {mongo: {Users}}) => {
    // You need to convert the given arguments into the format for the
    // `User` type, grabbing email and password from the "authProvider".
      const newUser = {
        name: data.name,
        email: data.authProvider.email.email,
        password: data.authProvider.email.password,
      };
      const response = await Users.insert(newUser);
      return Object.assign({id: response.insertedIds[0]}, newUser);
    },
    signinUser: async (root, data, {mongo: {Users}}) => {
      const user = await Users.findOne({email: data.email.email});
      if (data.email.password === user.password) {
        return {token: `token-${user.email}`, user};
      }
    },
    createVote: async (root, data, {mongo: {Votes}, user}) => {
      const newVote = {
        userId: user && user._id,
        linkId: new ObjectID(data.linkId),
      };
      const response = await Votes.insert(newVote);
      return Object.assign({id: response.insertedIds[0]}, newVote);
    },
  },

  Link: {
    id: root => root._id || root.id, // 5
    postedBy: async ({postedById}, data, {mongo: {Users}}) => {
        return await Users.findOne({_id: postedById});
    },
  },
  User: {
    id: root => root._id || root.id, // 5
  },
};
