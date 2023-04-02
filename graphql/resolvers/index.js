import postsResolvers from "./posts.js";
import usersResolvers from "./users.js";
// A map of functions which return data for the schema.
export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
