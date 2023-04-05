import Post from "../../models/Post.js";
import { checkauth } from "../../utils/check_auth.js";
import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, contextValue) {
      const user = checkauth(contextValue);
      if (args.body.trim() === "") {
        throw new GraphQLError("Post body must not be empty", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      pubsub.publish("NEW_POST", {
        newPost,
      });

      return post;
    },
    async deletePost(_, { postId }, contextValue) {
      const user = checkauth(contextValue);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await Post.findByIdAndRemove(post._id);
          return "Post deleted succesfully";
        } else {
          throw new GraphQLError("Action not allowed", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator(["NEW_POST"]),
    },
  },
};
