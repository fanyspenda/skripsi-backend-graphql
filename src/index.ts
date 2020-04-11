import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "config/db";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "graphql/schema/schema";
const app = express();
const graphqlServer = new ApolloServer({ typeDefs, resolvers });

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

graphqlServer.applyMiddleware({ app });
app.get("/", (req: Request, res: Response) => {
	res.send("ini server graphQL");
});

const port = 4100;
app.listen(port, () => {
	console.log(
		"server graphQL berjalan di port: " + port + graphqlServer.graphqlPath
	);
});
