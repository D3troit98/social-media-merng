import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  status400ForVariableCoercionErrors: true,

});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: ({ req }) => ({ req }),
  })
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log(`🚀 Server ready at http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
