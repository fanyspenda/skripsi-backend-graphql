import { ApolloServer, gql } from "apollo-server-express";
import alumniSchema from "schemas/alumni";
import { model } from "mongoose";
const alumniModel = model("alumni_linkedin", alumniSchema);

export const typeDefs = gql`
	type alumniLinkedin {
		_id: ID
		name: String
		entry_year: String
		graduate_year: String
		work_at: String
		work_position: String
		email: String
		data_source: String
	}

	type Query {
		alumniLinkedins(page: Int!, limit: Int!): [alumniLinkedin]
	}
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
};
