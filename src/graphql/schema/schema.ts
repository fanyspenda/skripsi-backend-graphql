import { ApolloServer, gql } from "apollo-server-express";
import alumniSchema from "schemas/alumni";
import { model } from "mongoose";
import token from "lib/authHandler";
import { typeDef as alumniLinkedin } from "../linkedinQuery";
import { typeDefs as user } from "../userQuery";
const alumniModel = model("alumni_linkedin", alumniSchema);

const query = `
	${alumniLinkedin}
	${user}
	type Query {
		alumniLinkedins(page: Int!, limit: Int!): [alumniLinkedin]
	}

	type Mutation {
		login(email: String!, pass: String!): user
	}
`;

export let typeDefs = gql`
	${query}
`;

export const resolvers = {
	Query: {
		alumniLinkedins: async (
			object: any,
			args: { page: number; limit: number }
		) => {
			const { page, limit } = args;
			const data = await alumniModel
				.find({})
				.skip(page * limit)
				.limit(limit);
			return data;
		},
	},
	Mutation: {
		login: (
			object: any,
			args: { email: string; pass: string },
			context: { token: string }
		) => {
			return {
				name: "fany",
				level: 1,
				token: context.token,
			};
		},
	},
};
