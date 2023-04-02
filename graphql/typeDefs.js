// The GraphQL schema
const typeDefs = `#graphql

type Post {
    id: ID!
    body:String!
    createdAt:String!
    username:String!
}
  type Query {
   getPosts : [Post]
  }
`;

export default typeDefs;
