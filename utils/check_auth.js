import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const checkauth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new GraphQLError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token");
  }
  throw new Error("Authorization header must be provided");
};
