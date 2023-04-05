import Post from "../../models/Post.js";
import { checkauth } from "../../utils/check_auth.js";
import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export default {
  Mutation: {
    createComment: async (_, { postId, body }, contextValue) => {
      const { username } = checkauth(contextValue);
      if (body.trim() === "") {
        throw new GraphQLError("Empty comment", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors: {
              body: "Comment body must not be empty",
            },
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else
        throw new GraphQLError("Post not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
    },
    async deleteComment(_, { postId, commentId }, contextValue) {
      const { username } = checkauth(contextValue);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id == commentId);
        if (post.comments[commentIndex].username == username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new GraphQLError("Action not allowed", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        }
      } else {
        throw new GraphQLError("Post not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
    },
    async likePost(_, { postId }, contextValue) {
      const { username } = checkauth(contextValue);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already liked , unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else
        throw new GraphQLError("Post not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
    },
  },
};
