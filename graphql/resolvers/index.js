import postsResolvers from "./posts.js";

// A map of functions which return data for the schema.
export default {
  Query: {
    ...postsResolvers.Query,
  },
};
