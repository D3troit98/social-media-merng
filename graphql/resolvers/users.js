import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};
export default {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors,
          },
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors,
          },
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials";
        throw new GraphQLError("Wrong Credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors,
          },
        });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new GraphQLError("Error", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors,
          },
        });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new GraphQLError("Username already registered", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();
      const token = generateToken(result);
      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};
