import { Request } from "express";
import paginate from "express-paginate";
import { ApolloServer, gql, UserInputError } from "apollo-server-express";
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
		queryLinkedin(page: Int!, limit: Int!): queryLinkedin
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
		queryLinkedin: async (
			object: any,
			args: { page: number; limit: number }
		) => {
			const { page, limit } = args;
			if (page <= 0) {
				throw new UserInputError(
					"halaman tidak bisa kurang dari atau sama dengan 0"
				);
			}
			const [data, pageCount] = await Promise.all([
				alumniModel
					.find({})
					.skip(page * limit - limit)
					.limit(limit),
				alumniModel.countDocuments({}),
			]);

			let pages = [];
			for (let index = 0; index < 4; index++) {
				let newPage = 0;
				if (page < 4 - 1) {
					newPage = index + 1;
				} else if (page > Math.ceil(pageCount / limit) - 3) {
					newPage = Math.ceil(pageCount / limit) - (3 - index);
				} else {
					newPage = page - (1 - index);
				}
				pages.push({ page: newPage, skip: newPage * limit - limit });
			}
			return {
				alumniLinkedin: data,
				linkedinPage: {
					totalPage: Math.ceil(pageCount / limit),
					pages: pages,
				},
			};
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
